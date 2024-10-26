'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { insertNewUser } from './data';
import { compare, hash } from 'bcrypt';
import { redirect } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);

    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }


  export async function registerUSer(
    prevState: string | undefined,
    formData: any,
  ) {
    try {
      
      await insertNewUser(formData);
      redirect("/")  
      

    } catch (error) {
      console.log("Register error", error)
    }
  }


export async function hashPassword(password: string) {
  
  const hashedPassword = await hash(password, 9);
  return hashedPassword;
}

export async function isPasswordValid(
  password: string,
  hashedPassword: string
) {
  const isValid = await compare(password, hashedPassword);
  return isValid;
}
