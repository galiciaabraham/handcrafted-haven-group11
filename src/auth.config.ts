import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // async authorized({ auth, request: { nextUrl } }) {
    //   const isLoggedIn = !!auth?.user;
      
    //   const isOnLoginPage = nextUrl.pathname.startsWith('/login');
      

    //   if (isLoggedIn && isOnLoginPage) {
        
    //       return Response.redirect(new URL('/', nextUrl));
    //     }
      
      

    //   return true; // Enable other routes access
    // },
  },
  providers: [],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;