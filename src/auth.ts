import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Demo account — replace with database lookup when Prisma is added
const DEMO_EMAIL = "demo@example.com";
const DEMO_PASSWORD = "demo1234";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize(credentials) {
        if (
          credentials.email === DEMO_EMAIL &&
          credentials.password === DEMO_PASSWORD
        ) {
          return {
            id: "demo",
            email: DEMO_EMAIL,
            name: "Demo User",
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
});
