import { NextResponse } from 'next/server'

// These URLs were injected by hackers and are permanently gone.
// 410 Gone signals to Google to remove them from the index faster than 404.
export async function GET() {
  return new NextResponse(null, { status: 410 })
}
