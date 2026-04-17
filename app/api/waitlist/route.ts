import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    let body;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase env vars");
      return NextResponse.json(
        { ok: false, error: "Waitlist unavailable." },
        { status: 503 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from("waitlist_signups")
      .insert([{ email }]);

    if (error) {
      if (
        error.code === "23505" ||
        error.message.toLowerCase().includes("duplicate")
      ) {
        return NextResponse.json({
          ok: true,
          message: "You're already on the list.",
        });
      }

      console.error(error);
      return NextResponse.json(
        { ok: false, error: "Database error." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "You're on the list.",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { ok: false, error: "Server error." },
      { status: 500 }
    );
  }
}
