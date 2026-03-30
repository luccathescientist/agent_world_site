import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const user = data.user;
      if (user) {
        const isNewUser = Date.now() - new Date(user.created_at).getTime() < 60_000;
        if (isNewUser) {
          const { notifyNewUser } = await import("@/lib/email");
          const name =
            (user.user_metadata?.name as string | undefined) ??
            (user.user_metadata?.user_name as string | undefined) ??
            user.email ??
            "unknown";
          await notifyNewUser(user.email ?? "unknown", name);
        }
      }
      return NextResponse.redirect(`${origin}${next}`);
    }
    console.error("[auth/callback] exchangeCodeForSession error:", error.message);
    return NextResponse.redirect(
      `${origin}/?error=auth&reason=${encodeURIComponent(error.message)}`
    );
  }

  console.error("[auth/callback] No code in request");
  return NextResponse.redirect(`${origin}/?error=auth&reason=no_code`);
}
