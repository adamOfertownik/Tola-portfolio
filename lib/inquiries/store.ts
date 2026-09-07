import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { neon } from '@neondatabase/serverless'
import type { Inquiry } from '@/lib/inquiries/types'

const localFile = path.join(process.cwd(), 'data', 'inquiries.json')

function databaseUrl() {
  return process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim() || ''
}

function rowToInquiry(row: Record<string, unknown>): Inquiry {
  return {
    id: String(row.id),
    createdAt: new Date(String(row.created_at)).toISOString(),
    model: row.model as Inquiry['model'],
    name: String(row.name),
    company: String(row.company ?? ''),
    email: String(row.email),
    phone: String(row.phone ?? ''),
    project: row.project as Inquiry['project'],
    projectLabel: String(row.project_label),
    message: String(row.message ?? ''),
  }
}

async function readLocal(): Promise<Inquiry[]> {
  try {
    const raw = await readFile(localFile, 'utf8')
    const parsed = JSON.parse(raw) as Inquiry[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

async function getSql(url: string) {
  const sql = neon(url)
  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL,
      model TEXT NOT NULL,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      project TEXT NOT NULL,
      project_label TEXT NOT NULL,
      message TEXT
    )
  `
  return sql
}

export async function saveInquiry(inquiry: Inquiry) {
  const url = databaseUrl()
  if (url) {
    const sql = await getSql(url)
    await sql`
      INSERT INTO inquiries (
        id, created_at, model, name, company, email, phone, project, project_label, message
      ) VALUES (
        ${inquiry.id},
        ${inquiry.createdAt},
        ${inquiry.model},
        ${inquiry.name},
        ${inquiry.company},
        ${inquiry.email},
        ${inquiry.phone},
        ${inquiry.project},
        ${inquiry.projectLabel},
        ${inquiry.message}
      )
    `
    return
  }

  const existing = await readLocal()
  existing.unshift(inquiry)
  await mkdir(path.dirname(localFile), { recursive: true })
  await writeFile(localFile, JSON.stringify(existing, null, 2))
}

export async function listInquiries(): Promise<Inquiry[]> {
  const url = databaseUrl()
  if (url) {
    const sql = await getSql(url)
    const rows = (await sql`
      SELECT id, created_at, model, name, company, email, phone, project, project_label, message
      FROM inquiries
      ORDER BY created_at DESC
    `) as Record<string, unknown>[]
    return rows.map(rowToInquiry)
  }

  const items = await readLocal()
  return items.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
