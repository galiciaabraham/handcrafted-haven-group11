import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnProfilePage = nextUrl.pathname.startsWith('/profile');

      if (isOnProfilePage) {
        return isLoggedIn;
      }

      return true; // Enable other routes access
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      console.log("session: " + session)
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      console.log("token: " + token)
      return token;
    },
  },
  providers: [],
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
