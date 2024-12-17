import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { createClient } from "@supabase/supabase-js";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      name?: string | null;
      image?: string | null;
    };
  }
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

const syncUserWithDatabase = async (user: any) => {
  // Check if user exists in our database
  const { data: existingUser, error: selectError } = await supabase
    .from("users")
    .select()
    .eq("email", user.email)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    console.error("Error checking user:", selectError);
    return;
  }

  // If user doesn't exist in our database, create them
  if (!existingUser) {
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        auth_provider: "credentials",
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Error creating user record:", insertError);
    }
  }
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          // Add a check for reset token
          const resetToken = credentials.password.startsWith("RESET_")
            ? credentials.password
            : null;

          if (resetToken) {
            // Handle password reset flow
            const {
              data: { user },
              error,
            } = await supabase.auth.verifyOtp({
              email: credentials.email,
              token: resetToken.replace("RESET_", ""),
              type: "recovery",
            });

            if (error) throw error;
            if (!user) return null;

            await syncUserWithDatabase(user);
            return {
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name,
            };
          }

          // Normal login flow
          const {
            data: { user },
            error,
          } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) throw error;
          if (!user) return null;

          await syncUserWithDatabase(user);
          return {
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name,
          };
        } catch (error: any) {
          console.error("Authentication error:", error);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user /* account */ }) {
      try {
        await syncUserWithDatabase(user);
        return true;
      } catch (error) {
        console.error("Error syncing with database:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
};
