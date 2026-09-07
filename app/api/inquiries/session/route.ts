import { NextResponse } from 'next/server'
import { inquiriesCookieName, isValidInquiriesPassword, signInquiriesSession } from '@/lib/inquiries/auth'

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string }
  const password = String(body.password ?? '')
  if (!isValidInquiriesPassword(password)) {
    return NextResponse.json({ ok: false, error: 'Nieprawidłowe hasło.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(inquiriesCookieName(), signInquiriesSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(inquiriesCookieName(), '', { httpOnly: true, path: '/', maxAge: 0 })
  return response
}
