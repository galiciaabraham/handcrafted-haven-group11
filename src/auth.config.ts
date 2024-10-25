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

    // async jwt({ token, user }) {
    //   if (user) {
    //     token.id = user.id;
    //   }
    //   return token;
    // },

    // async session({ session, token }) {
    //   if (token) {
    //     session.user.id = token.id;
    //   }
    //   return session;
    // },


  },
  providers: [],
  // session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;


// declare module "next-auth" {
//   interface Session {
//     accessToken?: string
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string
//   }
// }