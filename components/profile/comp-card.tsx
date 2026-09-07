import Image from 'next/image'
import Link from 'next/link'
import { agency } from '@/lib/agency'
import type { Profile } from '@/lib/profiles'
import { PrintButton } from '@/components/profile/print-button'

type CompCardProps = {
  profile: Profile
}

export function CompCard({ profile }: CompCardProps) {
  const shots = profile.photos.slice(0, 4)
  const specs = [
    ['Wiek', profile.measurements.age],
    ['Wzrost', profile.measurements.height],
    ['Ubrania', profile.measurements.clothing],
    ['But', profile.measurements.shoe],
    ['Oczy', profile.measurements.eyes],
    ['Włosy', profile.measurements.hair],
  ]

  return (
    <main data-theme={profile.theme} className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 print:hidden">
        <Link href={`/${profile.slug}`} className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
          ← Wróć do profilu {profile.name}
        </Link>
        <PrintButton />
      </div>

      <article className="mx-auto mt-10 max-w-5xl border border-border bg-card p-8 print:mt-0 print:border-0 print:p-0 md:p-12">
        <header className="flex flex-col justify-between gap-6 border-b border-border pb-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.28em] text-primary">Comp card</p>
            <h1 className="font-serif text-6xl tracking-[-0.07em] md:text-7xl">
              {profile.name}
              <span className="text-primary">.</span>
            </h1>
            <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{agency.exclusivity}</p>
          </div>
          <div className="text-sm leading-6 text-muted-foreground">
            <p>{agency.name}</p>
            <p>{agency.email}</p>
            <p>{agency.phoneDisplay}</p>
          </div>
        </header>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {shots.map((photo) => (
            <div key={photo.src} className="relative aspect-[3/4] overflow-hidden bg-muted">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
            </div>
          ))}
        </div>

        <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-3">
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt className="mb-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</dt>
              <dd className="text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </main>
  )
}
