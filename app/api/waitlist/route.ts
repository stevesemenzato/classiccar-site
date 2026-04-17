import { createClient } from "@supabase/supabase-js";

/* ------------------------------------------------------------------ */
/*  POST /api/waitlist                                                */
/*  Accepts { email } → inserts into Supabase `waitlist_signups`      */
/*  Returns { ok, message } or { ok, error }                          */
/* ------------------------------------------------------------------ */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  try {
    /* ---- Parse body ---- */
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return Response.json(
        { ok: false, error: "Invalid request body." },
        { status: 400 }
      );
    }

    const email = String(body.email || "")
      .trim()
      .toLowerCase();

    /* ---- Validate email ---- */
    if (!email || !EMAIL_RE.test(email)) {
      return Response.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    /* ---- Check env vars ---- */
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("[waitlist] Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return Response.json(
        { ok: false, error: "Waitlist is temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    /* ---- Insert into Supabase ---- */
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error } = await supabase
      .from("waitlist_signups")
      .insert([{ email }]);

    if (error) {
      /* Duplicate email — treat as success so user gets a positive signal */
      if (
        error.code === "23505" ||
        error.message.toLowerCase().includes("duplicate")
      ) {
        return Response.json({
          ok: true,
          message: "You're already on the list — we'll be in touch.",
        });
      }

      console.error("[waitlist] Supabase insert error:", error.message);
      return Response.json(
        { ok: false, error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      message: "Thanks — you're on the CCR early-access list.",
    });
  } catch (err) {
    console.error("[waitlist] Unexpected error:", err);
    return Response.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
