'use client'

import { useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Menu, X } from 'lucide-react'

const photos = [
  { src: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1200&q=85', alt: 'Tola — naturalne ujęcie w ciepłym świetle', label: 'Polaroid 01', className: 'aspect-[4/5]' },
  { src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=85', alt: 'Tola — kampania modowa', label: 'Campaign 01', className: 'aspect-[3/4] md:mt-24' },
  { src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85', alt: 'Tola — portret', label: 'Portrait 01', className: 'aspect-[4/5]' },
  { src: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1200&q=85', alt: 'Tola — lifestyle', label: 'Lifestyle 01', className: 'aspect-[3/4] md:mt-24' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
          <a href="#top" className="font-serif text-2xl tracking-[-0.06em]" aria-label="Tola, strona główna">Tola<span className="text-primary">.</span></a>
          <nav className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.22em] md:flex" aria-label="Główna nawigacja">
            <a href="#portfolio" className="transition-colors hover:text-primary">Portfolio</a>
            <a href="#about" className="transition-colors hover:text-primary">O Toli</a>
            <a href="#contact" className="transition-colors hover:text-primary">Kontakt</a>
          </nav>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <nav className="flex flex-col gap-5 border-t border-border px-6 py-6 text-xs uppercase tracking-[0.22em] md:hidden"><a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a><a href="#about" onClick={() => setMenuOpen(false)}>O Toli</a><a href="#contact" onClick={() => setMenuOpen(false)}>Kontakt</a></nav>}
      </header>

      <section id="top" className="mx-auto grid min-h-screen max-w-[1400px] items-end gap-12 px-6 pb-14 pt-36 md:grid-cols-[1.1fr_0.9fr] md:px-10 md:pb-20">
        <div className="flex flex-col justify-end">
          <p className="mb-7 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Model portfolio · Warsaw / Poland</p>
          <h1 className="max-w-3xl font-serif text-[clamp(5rem,14vw,13rem)] leading-[0.77] tracking-[-0.09em]">Tola<span className="text-primary">.</span></h1>
          <div className="mt-12 flex max-w-md items-start justify-between gap-8 border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            <p>2 lata <span className="text-primary">/</span> 4 miesiące<br />naturalna energia, charakter, radość</p>
            <a href="#portfolio" className="group flex shrink-0 items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground">Zobacz portfolio <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:translate-y-1" /></a>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[520px] md:mb-0">
          <div className="aspect-[4/5] overflow-hidden bg-muted"><img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=85" alt="Tola — zdjęcie główne portfolio" className="h-full w-full object-cover grayscale-[12%] transition-transform duration-700 hover:scale-[1.02]" /></div>
          <span className="absolute -bottom-7 -left-5 font-serif text-7xl italic text-primary/80 md:-left-12 md:text-8xl">hello</span>
          <p className="absolute -right-7 top-8 rotate-90 text-[9px] uppercase tracking-[0.3em] text-muted-foreground">Represented exclusively by Moon Kids</p>
        </div>
      </section>

      <section id="portfolio" className="border-t border-border bg-secondary/45 px-6 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 flex items-end justify-between gap-6 md:mb-24"><div><p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-primary">Selected work</p><h2 className="font-serif text-5xl tracking-[-0.06em] md:text-8xl">Portfolio</h2></div><p className="max-w-[180px] text-right text-xs leading-5 text-muted-foreground">Commercial campaigns<br />& natural polaroids</p></div>
          <div className="grid gap-x-6 gap-y-16 md:grid-cols-2 md:gap-y-28">{photos.map((photo) => <figure key={photo.label} className={photo.className}><div className="h-full overflow-hidden bg-muted"><img src={photo.src} alt={photo.alt} className="h-full w-full object-cover grayscale-[8%] transition duration-700 hover:scale-105" /></div><figcaption className="mt-3 flex justify-between text-[10px] uppercase tracking-[0.2em] text-muted-foreground"><span>{photo.label}</span><span>01 / 04</span></figcaption></figure>)}</div>
        </div>
      </section>

      <section id="about" className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 md:grid-cols-[0.8fr_1.2fr] md:px-10 md:py-36">
        <div><p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-primary">About Tola</p><h2 className="max-w-sm font-serif text-5xl leading-[0.95] tracking-[-0.06em] md:text-7xl">Mała osoba.<br /><em>Duża obecność.</em></h2></div>
        <div className="max-w-xl md:pt-14"><p className="text-xl leading-8 md:text-2xl">Tola ma w sobie naturalność, która przyciąga uwagę. Jest otwarta, uważna i swobodna przed obiektywem — dokładnie taka, jakiej szukają marki dziecięce.</p><div className="mt-14 grid grid-cols-2 gap-8 border-t border-border pt-5 text-xs"><div><p className="mb-3 uppercase tracking-[0.2em] text-muted-foreground">Recent highlight</p><p className="font-medium">Okładka świątecznego katalogu Smyk</p></div><div><p className="mb-3 uppercase tracking-[0.2em] text-muted-foreground">Representation</p><p className="font-medium">Moon Kids<br />Commercial exclusive</p></div></div></div>
      </section>

      <section className="bg-primary px-6 py-20 text-primary-foreground md:px-10 md:py-28"><div className="mx-auto flex max-w-[1400px] flex-col justify-between gap-10 md:flex-row md:items-end"><div><p className="mb-6 text-[10px] uppercase tracking-[0.28em] opacity-70">Current measurements</p><div className="flex items-baseline gap-8"><span className="font-serif text-8xl tracking-[-0.08em] md:text-[10rem]">92</span><span className="text-xs uppercase tracking-[0.18em] opacity-80">cm<br />height</span></div></div><p className="max-w-xs text-sm leading-6 opacity-80">Aktualne dane i pełne portfolio dostępne u bookera.</p></div></section>

      <footer id="contact" className="bg-foreground px-6 py-20 text-background md:px-10 md:py-28"><div className="mx-auto max-w-[1400px]"><div className="flex flex-col justify-between gap-16 md:flex-row"><div><p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-primary">Bookings & enquiries</p><h2 className="max-w-2xl font-serif text-6xl leading-[0.9] tracking-[-0.07em] md:text-9xl">Let&apos;s<br /><em>work together.</em></h2></div><div className="flex flex-col gap-5 text-sm md:pt-12"><p className="text-background/60">Booker · Moon Kids</p><a className="group flex items-center gap-3 text-xl" href="mailto:booking@moonkids.pl">booking@moonkids.pl <ArrowUpRight size={18} className="text-primary transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a><p className="text-background/60">Represented exclusively by Moon Kids</p></div></div><div className="mt-24 flex justify-between border-t border-background/20 pt-5 text-[10px] uppercase tracking-[0.2em] text-background/50"><span>© 2025 Tola</span><span>Warsaw, Poland</span></div></div></footer>
    </main>
  )
}
