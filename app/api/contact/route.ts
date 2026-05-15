import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.sendMail({
      from: `"advh.no kontaktskjema" <${process.env.EMAIL_USER}>`,
      to: 'kah@advh.no',
      replyTo: email,
      subject: `Ny henvendelse fra ${name}`,
      html: `
        <h2>Ny henvendelse fra advh.no</h2>
        <p><strong>Navn:</strong> ${name}</p>
        <p><strong>E-post:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || '–'}</p>
        <hr/>
        <p><strong>Melding:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    })
  } catch (err) {
    console.error('Email send error:', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
