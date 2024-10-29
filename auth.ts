import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import SocialPulseClient from "./store/client/SocialPulseClient";
import { PostLogin } from "./store/client/interface/body/PostLogin";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const client = new SocialPulseClient();
        return client.postLogin(credentials as PostLogin).then((response) => {
          const user: AuthUser = {
            name: credentials.email as string,
            email: credentials.email as string,
            emailVerified: false,
            token: response?.data.token as string,
          };

          return user;
        });
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl);
    },
    async jwt({ token, user, account }) {
      if (user && account) {
        return { ...token, data: user };
      }

      return token;
    },
    async session({ session, token }) {
      if (session?.user && typeof token.data === "object" && token.data !== null) {
        session.user = {
          ...session.user,
          token: (token.data as AuthUser).token,
        };
      }
      return session;
    },
  },
});

export interface AuthUser extends User {
  emailVerified: boolean;
  token: string;
}

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}
