import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User } from '@/app/utilities/definitions';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE user_email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = password === user.user_password;
          if (passwordsMatch) {
            console.log(user)
            return user;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        const user = token.user as User;
        session.user.id = user.user_id; // "token.id" is the user_id
        session.user.name = user.user_name;
        session.user.email = user.user_email;
        //session.user.image = user.user_profile_picture
      }
      return session;
    },

    async redirect({ url, baseUrl}) {
      return baseUrl;
    },
    
  },
});