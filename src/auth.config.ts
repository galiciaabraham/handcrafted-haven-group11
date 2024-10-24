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

      async session({ session, token, user }) {
        // Aquí añades el `user_id` a la sesión
        if (session?.user) {
          session.user.id = token.id; // o `user.id` dependiendo de donde esté disponible
        }
        return session;
      },
      async jwt({ token, user }) {
        // Añade el `user_id` al token si el usuario está autenticado
        if (user) {
          token.id = user.user_id; // o el campo que corresponda a `user_id`
        }
        return token;
      },
    
    
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
