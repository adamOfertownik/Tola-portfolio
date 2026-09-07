import Image from 'next/image'
import Link from 'next/link'
import { agency } from '@/lib/agency'
import type { Profile } from '@/lib/profiles'
import { PrintButton } from '@/components/profile/print-button'

type CompCardProps = {
  profile: Profile
}

export function CompCard({ profile }: CompCardProps) {
  const shots = [profile.hero, ...profile.photos.filter((photo) => photo.src !== profile.hero.src)].slice(0, 4)
  const specs = [
    ['Wiek', profile.measurements.age],
    ['Wzrost', profile.measurements.height],
    ['Ubrania', profile.measurements.clothing],
    ['But', profile.measurements.shoe],
    ['Oczy', profile.measurements.eyes],
    ['Włosy', profile.measurements.hair],
  ]

  return (
    <main data-theme={profile.theme} className="min-h-screen bg-background px-6 py-10 text-foreground print:h-auto print:min-h-0 print:bg-white print:p-0 md:px-10">
      <div className="mx-auto flex max-w-[210mm] items-center justify-between gap-4 print:hidden">
        <Link href={`/${profile.slug}`} className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
          ← Wróć do profilu {profile.name}
        </Link>
        <PrintButton />
      </div>
      <p className="mx-auto mt-3 max-w-[210mm] text-[10px] uppercase tracking-[0.16em] text-muted-foreground print:hidden">
        Druk: A4, jedna strona. W oknie druku wyłącz nagłówki i stopki przeglądarki.
      </p>

      <article className="comp-card mx-auto mt-8 w-full max-w-[210mm] border border-border bg-card px-6 py-7 print:mt-0 print:border-0 print:px-0 print:py-0 md:px-8 md:py-8">
        <header className="comp-card-header flex items-end justify-between gap-6 border-b border-border pb-4">
          <h1 className="font-serif text-[clamp(3.4rem,11vw,5.2rem)] leading-[0.77] tracking-[-0.09em]">
            {profile.name}
            <span className="text-primary">.</span>
          </h1>
          <div className="hidden shrink-0 pb-1 text-right text-[10px] uppercase leading-4 tracking-[0.16em] text-muted-foreground sm:block print:block">
            <p>{agency.exclusivity}</p>
            <p className="mt-1 normal-case tracking-normal">{agency.email}</p>
            <p>{agency.phoneDisplay}</p>
          </div>
        </header>

        <div className="comp-card-photos mt-4 grid grid-cols-2 gap-2">
          {shots.map((photo) => (
            <div key={photo.src} className="relative aspect-[4/5] overflow-hidden bg-muted print:aspect-auto">
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="(max-width: 800px) 50vw, 105mm" />
            </div>
          ))}
        </div>

        <dl className="comp-card-specs mt-4 grid grid-cols-3 gap-x-4 gap-y-3 border-t border-border pt-4 sm:grid-cols-6">
          {specs.map(([label, value]) => (
            <div key={label} className="min-w-0 break-inside-avoid">
              <dt className="mb-1 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</dt>
              <dd className="text-[12px] font-medium leading-tight">{value}</dd>
            </div>
          ))}
        </dl>
      </article>
    </main>
  )
}
