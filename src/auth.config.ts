import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfilePage = nextUrl.pathname.startsWith('/profile');
      //const isOnDashboard = nextUrl.pathname.startsWith('/profile');

      if (isOnProfilePage) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } 
      // else if (isLoggedIn) {
      //   return Response.redirect(new URL('/profile', nextUrl));
      // }

      return true;
    },
    session({ session, token, user }) {
      return session // The return type will match the one returned in `useSession()`
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
