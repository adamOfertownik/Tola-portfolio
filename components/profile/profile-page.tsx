'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDownRight, ArrowUpRight, Download, Menu, X } from 'lucide-react'
import { agency } from '@/lib/agency'
import type { Profile } from '@/lib/profiles'
import { ContactForm } from '@/components/profile/contact-form'
import { Gallery } from '@/components/profile/gallery'

type ProfilePageProps = {
  profile: Profile
}

export function ProfilePage({ profile }: ProfilePageProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const specs = [
    { label: 'Wiek', value: profile.measurements.age },
    { label: 'Wzrost', value: profile.measurements.height },
    { label: 'Ubrania', value: profile.measurements.clothing },
    { label: 'But', value: profile.measurements.shoe },
    { label: 'Oczy', value: profile.measurements.eyes },
    { label: 'Włosy', value: profile.measurements.hair },
  ]

  return (
    <main data-theme={profile.theme} className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <div className="flex items-baseline gap-4">
            <Link href="/" className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
              Lieske
            </Link>
            <a href="#top" className="font-serif text-2xl tracking-[-0.06em]" aria-label={`${profile.name}, strona główna profilu`}>
              {profile.name}
              <span className="text-primary">.</span>
            </a>
          </div>
          <nav className="hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.22em] md:flex" aria-label="Główna nawigacja">
            <a href="#portfolio" className="transition-colors hover:text-primary">
              Portfolio
            </a>
            <a href="#about" className="transition-colors hover:text-primary">
              {profile.navAbout}
            </a>
            <Link href={`/${profile.sibling.slug}`} className="transition-colors hover:text-primary">
              {profile.sibling.name}
            </Link>
            <a href="#contact" className="transition-colors hover:text-primary">
              Kontakt
            </a>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen ? (
          <nav className="flex flex-col gap-5 border-t border-border px-6 py-6 text-xs uppercase tracking-[0.22em] md:hidden">
            <a href="#portfolio" onClick={() => setMenuOpen(false)}>
              Portfolio
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)}>
              {profile.navAbout}
            </a>
            <Link href={`/${profile.sibling.slug}`} onClick={() => setMenuOpen(false)}>
              {profile.sibling.name}
            </Link>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Kontakt
            </a>
          </nav>
        ) : null}
      </header>

      <section id="top" className="mx-auto grid min-h-screen max-w-[1400px] items-end gap-12 px-6 pb-14 pt-36 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-20">
        <div className="flex flex-col justify-end">
          <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{profile.kicker}</p>
          {profile.campaignLine ? (
            <p className="mb-6 max-w-xl text-[11px] uppercase tracking-[0.2em] text-primary">{profile.campaignLine}</p>
          ) : null}
          <h1 className="max-w-3xl font-serif text-[clamp(5rem,14vw,13rem)] leading-[0.77] tracking-[-0.09em]">
            {profile.name}
            <span className="text-primary">.</span>
          </h1>
          <div className="mt-12 flex max-w-lg items-start justify-between gap-8 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            <p>
              {profile.ageLine}
              <br />
              {profile.personality}
            </p>
            <a href="#portfolio" className="group flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground">
              Zobacz portfolio <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px] md:mb-0">
          <div className="relative aspect-[4/5] overflow-hidden bg-muted">
            <Image
              src={profile.hero.src}
              alt={profile.hero.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 520px"
              className="object-cover grayscale-[12%] transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>
          <span className="absolute -bottom-7 -left-5 font-serif text-7xl italic text-primary/80 md:-left-12 md:text-8xl">{profile.greeting}</span>
          <p className="absolute -right-7 top-8 rotate-90 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">{agency.exclusivity}</p>
        </div>
      </section>

      <section aria-labelledby="specs-heading" className="border-t border-border bg-card px-6 py-12 md:px-10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p id="specs-heading" className="mb-6 text-[10px] uppercase tracking-[0.28em] text-primary">
              Casting specs
            </p>
            <div className="flex items-baseline gap-6">
              <span className="font-serif text-7xl tracking-[-0.08em] md:text-8xl">{profile.measurements.heightCm}</span>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                cm
                <br />
                height
              </span>
            </div>
          </div>
          <dl className="grid flex-1 grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:max-w-3xl">
            {specs.map((spec) => (
              <div key={spec.label}>
                <dt className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{spec.label}</dt>
                <dd className="text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
          <Link
            href={`/${profile.slug}/karta`}
            className="inline-flex shrink-0 items-center gap-2 border border-foreground px-5 py-3 text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-foreground hover:text-background"
          >
            <Download size={14} />
            Pobierz kartę castingową
          </Link>
        </div>
      </section>

      <section id="portfolio" className="border-t border-border bg-secondary/45 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 flex items-end justify-between gap-6 md:mb-16">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-primary">Selected work</p>
              <h2 className="font-serif text-5xl tracking-[-0.06em] md:text-8xl">Portfolio</h2>
            </div>
            <p className="max-w-[180px] text-right text-xs leading-5 text-muted-foreground">
              Commercial campaigns
              <br />
              &amp; natural polaroids
            </p>
          </div>
          <Gallery photos={profile.photos} />
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-36">
        <div>
          <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-primary">{profile.about.eyebrow}</p>
          <h2 className="max-w-sm font-serif text-5xl leading-[0.95] tracking-[-0.06em] md:text-7xl">
            {profile.about.title}
            <br />
            <em>{profile.about.titleEm}</em>
          </h2>
        </div>
        <div className="max-w-xl md:pt-14">
          <p className="text-xl leading-8 md:text-2xl">{profile.about.body}</p>
          <div className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-5 text-xs">
            <div>
              <p className="mb-3 uppercase tracking-[0.2em] text-muted-foreground">{profile.about.highlightLabel}</p>
              <p className="font-medium">{profile.about.highlight}</p>
            </div>
            <div>
              <p className="mb-3 uppercase tracking-[0.2em] text-muted-foreground">Representation</p>
              <p className="font-medium">
                Moon Kids
                <br />
                Commercial exclusive
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border px-6 py-16 md:px-10 md:py-20" aria-labelledby="siblings-heading">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p id="siblings-heading" className="mb-4 text-[10px] uppercase tracking-[0.28em] text-primary">
              Siblings / Work in Pair
            </p>
            <p className="text-lg leading-8 text-muted-foreground md:text-xl">{profile.sibling.banner}</p>
          </div>
          <Link
            href={`/${profile.sibling.slug}`}
            className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em]"
          >
            {profile.sibling.cta}
            <ArrowUpRight size={16} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      <footer id="contact" className="bg-foreground px-6 py-20 text-background md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col justify-between gap-16 md:flex-row">
            <div>
              <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-primary">Bookings &amp; enquiries</p>
              <h2 className="max-w-2xl font-serif text-6xl leading-[0.9] tracking-[-0.07em] md:text-9xl">
                Let&apos;s
                <br />
                <em>work together.</em>
              </h2>
              <p className="mt-8 max-w-sm text-sm text-background/60">{agency.exclusivity}</p>
            </div>
            <div className="flex flex-col gap-5 text-sm md:pt-12">
              <p className="text-background/60">Booker · Moon Kids</p>
              <a className="group flex items-center gap-3 text-xl" href={`mailto:${agency.email}`}>
                {agency.email}
                <ArrowUpRight size={18} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a className="text-xl text-background/90 hover:text-primary" href={agency.phoneHref}>
                {agency.phoneDisplay}
              </a>
              <a
                href="#contact-form"
                className="mt-2 w-fit bg-primary px-5 py-3 text-[10px] uppercase tracking-[0.2em] text-primary-foreground"
              >
                {profile.bookLabel}
              </a>
            </div>
          </div>
          <div id="contact-form">
            <ContactForm profile={profile} />
          </div>
          <div className="mt-24 flex justify-between border-t border-background/20 pt-5 text-[10px] uppercase tracking-[0.2em] text-background/50">
            <span>© {new Date().getFullYear()} {profile.name} Lieske</span>
            <span>{agency.city}</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
