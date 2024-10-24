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
          console.log(`This is the entered password,"${password}"`);
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = (password === user.user_password) ? true : false;
          //const passwordsMatch = await bcrypt.compare(password, user.password);
          if (!passwordsMatch) {console.log('The passord did not match, here is your user', user)};
          if (passwordsMatch) {console.log('The password matched, here is your user', user)};
          if (passwordsMatch) return user;
        }
        //console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
