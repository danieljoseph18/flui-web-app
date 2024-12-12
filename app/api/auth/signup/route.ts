import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // Check if user exists in auth
    const {
      data: { users },
    } = await supabase.auth.admin.listUsers();
    const existingAuthUser = users?.find((u) => u.email === email);

    if (existingAuthUser) {
      // If user exists in auth but not in our database, sync them
      const { data: dbUser } = await supabase
        .from("users")
        .select()
        .eq("email", email)
        .single();

      if (!dbUser) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            id: existingAuthUser.id,
            email: existingAuthUser.email,
            name: name || existingAuthUser.user_metadata?.name,
            auth_provider: "credentials",
            created_at: new Date().toISOString(),
          },
        ]);

        if (insertError) {
          console.error("Error creating user record:", insertError);
          return NextResponse.json(
            { error: "database_error", message: "Error creating user record" },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        {
          status: "existing_user",
          message: "This email is already registered. Please sign in instead.",
        },
        { status: 409 }
      );
    }

    // Create new auth user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });

    if (authError) {
      if (authError.message.includes("weak_password")) {
        return NextResponse.json(
          {
            error: "weak_password",
            message:
              "Password is too weak. It must be at least 6 characters long and contain a mix of characters.",
            details: authError.message,
          },
          { status: 422 }
        );
      }

      return NextResponse.json(
        {
          error: authError.name,
          message: authError.message,
          details: authError.message,
        },
        { status: 400 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "signup_failed", message: "Failed to create user" },
        { status: 400 }
      );
    }

    // Create the user record
    const { error: insertError } = await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
        name: name,
        auth_provider: "credentials",
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Error creating user record:", insertError);
      // Clean up the auth user if we fail to create the user record
      await supabase.auth.admin.deleteUser(user.id);
      return NextResponse.json(
        { error: "database_error", message: "Error creating user record" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "confirmation_required",
      message:
        "Please check your email to confirm your account before signing in.",
    });
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error: "server_error",
        message: "An unexpected error occurred",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
