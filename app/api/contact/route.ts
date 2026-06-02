import { NextRequest, NextResponse } from 'next/server'

// --- Rate limiting (in-memory, per IP) ---
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5        // max requests
const RATE_WINDOW = 10 * 60 * 1000  // 10 minutes in ms

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

// --- Input sanitization ---
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'For mange forespørsler. Prøv igjen om litt.' },
      { status: 429 }
    )
  }

  const { name, email, phone, message, website } = await req.json()

  // Honeypot check — bots fill this field, humans don't
  if (website) {
    return NextResponse.json({ ok: true }) // Fool the bot
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  // Sanitize inputs
  const safeName    = escapeHtml(String(name).slice(0, 200))
  const safeEmail   = escapeHtml(String(email).slice(0, 200))
  const safePhone   = escapeHtml(String(phone ?? '').slice(0, 50))
  const safeMessage = escapeHtml(String(message).slice(0, 5000))

  const apiKey = process.env.MAILERSEND_API_KEY
  if (!apiKey) {
    console.error('MAILERSEND_API_KEY is not set')
    return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
  }

  try {
    const res = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { email: 'noreply@advokat-hamar.no', name: 'Kontaktskjema' },
        to: [{ email: 'post@advokat-hamar.no' }],
        reply_to: { email: safeEmail, name: safeName },
        subject: `Ny henvendelse fra ${safeName}`,
        html: `
          <h2>Ny henvendelse fra advokat-hamar.no</h2>
          <p><strong>Navn:</strong> ${safeName}</p>
          <p><strong>E-post:</strong> ${safeEmail}</p>
          <p><strong>Telefon:</strong> ${safePhone || '–'}</p>
          <hr/>
          <p><strong>Melding:</strong></p>
          <p>${safeMessage.replace(/\n/g, '<br/>')}</p>
        `,
      }),
    })

    if (!res.ok) {
      const error = await res.text()
      console.error('MailerSend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
