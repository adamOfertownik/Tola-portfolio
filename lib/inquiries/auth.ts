import { createHmac, timingSafeEqual } from 'node:crypto'

const COOKIE_NAME = 'lieske_inquiries'

function secret() {
  return process.env.INQUIRIES_ADMIN_PASSWORD?.trim() || (process.env.NODE_ENV === 'production' ? '' : 'lieske')
}

export function inquiriesPasswordConfigured() {
  return Boolean(secret())
}

export function inquiriesCookieName() {
  return COOKIE_NAME
}

export function signInquiriesSession() {
  const value = secret()
  if (!value) return ''
  return createHmac('sha256', value).update('lieske-inquiries-session').digest('hex')
}

export function isValidInquiriesPassword(password: string) {
  const expected = secret()
  if (!expected) return false
  const a = Buffer.from(password)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

export function isValidInquiriesSession(token: string | undefined) {
  const expected = signInquiriesSession()
  if (!expected || !token) return false
  const a = Buffer.from(token)
  const b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}
