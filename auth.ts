import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import SocialPulseClient from "./store/client/ApiClient";
import { LoginCredentials } from "./store/client/interface/body/LoginCredentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const client = new SocialPulseClient();
          const response = await client.getToken(credentials as LoginCredentials);

          if (!response?.data?.token) {
            throw new Error("Invalid token response");
          }

          return {
            name: credentials.email as string,
            email: credentials.email as string,
            emailVerified: false,
            token: response.data.token,
          };
        } catch {
          throw new Error("Authentication failed");
        }
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
        };
        session.accessToken = (token.data as AuthUser).token;
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
