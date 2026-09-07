import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { agency } from '@/lib/agency'
import { familyPhoto } from '@/lib/family'
import { getProfiles } from '@/lib/profiles'

export function FamilyHub() {
  const { tola, milo } = getProfiles()
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <Link href="/" className="font-serif text-2xl tracking-[-0.06em]" aria-label="Lieske, strona główna">
            Lieske<span className="text-primary">.</span>
          </Link>
          <nav className="flex items-center gap-8 text-[11px] font-medium uppercase tracking-[0.22em]" aria-label="Profile">
            <Link href="/tola" className="transition-colors hover:text-primary">
              Tola
            </Link>
            <Link href="/milo" className="transition-colors hover:text-[oklch(0.45_0.09_250)]">
              Milo
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-6 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
        <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Family hub · Warsaw / Poland</p>
        <h1 className="max-w-4xl font-serif text-[clamp(3.4rem,10vw,9rem)] leading-[0.82] tracking-[-0.08em]">
          Tola <span className="text-primary">&amp;</span>
          <br />
          <span className="text-[oklch(0.45_0.09_250)]">Milo</span>
          <span className="text-muted-foreground">.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
          Dwa dedykowane profile castingowe. Jedna rodzina, wspólne kampanie, wyłączna reprezentacja Moon Kids.
        </p>
        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{agency.exclusivity}</p>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-6 px-6 pb-24 md:grid-cols-2 md:px-10 md:pb-32">
        <HubCard
          href="/tola"
          name={tola.name}
          line={tola.campaignLine ?? tola.ageLine}
          image={tola.hero.src}
          alt={tola.hero.alt}
          accent="tola"
        />
        <HubCard
          href="/milo"
          name={milo.name}
          line={milo.campaignLine ?? milo.ageLine}
          image={milo.hero.src}
          alt={milo.hero.alt}
          accent="milo"
        />
      </section>

      <section className="border-t border-border px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-primary">Work in pair</p>
          <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden bg-muted md:aspect-[16/9]">
                <Image
                  src={familyPhoto.src}
                  alt={familyPhoto.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 70vw"
                  className="object-cover grayscale-[8%]"
                />
              </div>
              <figcaption className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{familyPhoto.label}</figcaption>
            </figure>
            <p className="max-w-md text-base leading-7 text-muted-foreground md:text-lg">
              Wspólne projekty komercyjne i reklamy rodzeństwa. Dwa profile, jedna rodzina — Moon Kids.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-10 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} Lieske</span>
          <a href={`mailto:${agency.email}`} className="hover:text-foreground">
            {agency.email}
          </a>
          <span>{agency.city}</span>
        </div>
      </footer>
    </main>
  )
}

function HubCard({
  href,
  name,
  line,
  image,
  alt,
  accent,
}: {
  href: string
  name: string
  line: string
  image: string
  alt: string
  accent: 'tola' | 'milo'
}) {
  const nameClass = accent === 'milo' ? 'group-hover:text-[oklch(0.45_0.09_250)]' : 'group-hover:text-primary'

  return (
    <Link href={href} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover grayscale-[12%] transition duration-700 group-hover:scale-[1.03]"
          priority
        />
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h2 className={`font-serif text-5xl tracking-[-0.06em] transition-colors md:text-6xl ${nameClass}`}>
            {name}
            <span className={accent === 'milo' ? 'text-[oklch(0.45_0.09_250)]' : 'text-primary'}>.</span>
          </h2>
          <p className="mt-3 max-w-sm text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{line}</p>
        </div>
        <ArrowUpRight size={20} className={accent === 'milo' ? 'text-[oklch(0.45_0.09_250)]' : 'text-primary'} />
      </div>
    </Link>
  )
}
