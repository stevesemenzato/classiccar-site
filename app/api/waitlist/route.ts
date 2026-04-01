import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const email = String(body.email || '').trim().toLowerCase()

    if (!email || !email.includes('@')) {
      return Response.json({ ok: false, error: 'Invalid email' }, { status: 400 })
    }

    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase
      .from('waitlist_signups')
      .insert([{ email }])

    if (error) {
      if (error.message.toLowerCase().includes('duplicate')) {
        return Response.json({ ok: true, message: 'Already registered' })
      }
      return Response.json({ ok: false, error: error.message }, { status: 500 })
    }

    return Response.json({ ok: true, message: 'Thanks for joining' })
  } catch {
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 })
  }
}