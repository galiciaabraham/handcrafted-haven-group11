import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import type { User, UserProfile } from '@/app/utilities/definitions';
import bcrypt from 'bcrypt';


async function getUser(email: string): Promise<User | undefined> {
  try {
    const userData = await sql<UserProfile>`SELECT * FROM users WHERE user_email=${email}`;
    
    const user:User = {
      id:userData.rows[0].user_id,
      name:userData.rows[0].user_name,
      email:userData.rows[0].user_email,
      password:userData.rows[0].user_password,

    }
    return user;
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
      
          const passwordsMatch = password === user.password;
          if (passwordsMatch) {
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
      const userId :any = token.sub 
      if (session?.user) {
        session.user.id = userId
      }
      return session;
    },

    async redirect({ url, baseUrl}) {
      return baseUrl;
    },

  },
});