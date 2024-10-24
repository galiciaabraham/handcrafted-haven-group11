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
    console.log(user)
    console.log(user.rows)
    console.log(user.rows[0])
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          // Compara la contraseña (temporalmente sin bcrypt)
          const passwordsMatch = password === user.user_password;
          if (passwordsMatch) {
            return { 
              user_id: user.user_id, // Asegúrate de que el `user_id` esté aquí
              email: user.user_email,
              name: user.user_name, // u otros campos que quieras pasar
            };
          }
        }
        return null;
      },
    }),
  ],
});
