export type BirthDate = {
  year: number
  month: number
  day: number
}

export type AgeParts = {
  years: number
  months: number
}

export const birthDates = {
  tola: { year: 2024, month: 4, day: 22 },
  milo: { year: 2026, month: 1, day: 16 },
} as const satisfies Record<string, BirthDate>

export function calculateAge(birthDate: BirthDate, asOf = new Date()): AgeParts {
  let years = asOf.getFullYear() - birthDate.year
  let months = asOf.getMonth() + 1 - birthDate.month
  let days = asOf.getDate() - birthDate.day

  if (days < 0) months -= 1
  if (months < 0) {
    years -= 1
    months += 12
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
  }
}

function formatYears(years: number): string {
  if (years === 1) return '1 rok'
  if (years >= 2 && years <= 4) return `${years} lata`
  return `${years} lat`
}

function formatMonths(months: number): string {
  if (months === 1) return '1 miesiąc'

  const mod10 = months % 10
  const mod100 = months % 100

  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return `${months} miesiące`
  }

  return `${months} miesięcy`
}

export function formatAge(age: AgeParts): string {
  if (age.years === 0) return formatMonths(age.months)
  if (age.months === 0) return formatYears(age.years)
  return `${formatYears(age.years)} ${formatMonths(age.months)}`
}

export function formatAgeLine(age: AgeParts): string {
  if (age.years === 0) return formatMonths(age.months)
  if (age.months === 0) return formatYears(age.years)
  return `${formatYears(age.years)} / ${formatMonths(age.months)}`
}
