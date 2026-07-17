import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        const adminEmail = process.env.ADMIN_EMAIL || "admin@nakshtara.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "AdminPass123!";

        if (email.toLowerCase() === adminEmail.toLowerCase() && password === adminPassword) {
          return {
            id: "admin",
            name: "Admin Maison",
            email: adminEmail,
            role: "admin",
          };
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  }
});
