export type PhotoCategory = 'commercial' | 'polaroid'

export type Photo = {
  src: string
  alt: string
  label: string
  category: PhotoCategory
  credits?: string
}

export type Profile = {
  slug: 'tola' | 'milo'
  theme: 'tola' | 'milo'
  name: string
  greeting: string
  kicker: string
  campaignLine?: string
  ageLine: string
  personality: string
  hero: { src: string; alt: string }
  about: {
    eyebrow: string
    title: string
    titleEm: string
    body: string
    highlightLabel: string
    highlight: string
  }
  measurements: {
    age: string
    height: string
    heightCm: string
    clothing: string
    shoe: string
    eyes: string
    hair: string
  }
  photos: Photo[]
  sibling: {
    slug: 'tola' | 'milo'
    name: string
    banner: string
    cta: string
  }
  bookLabel: string
  navAbout: string
  metaTitle: string
  metaDescription: string
}

const SMYK_CREDITS = 'Client: SMYK | Production: Ilmatic | Agency: Moon Kids'

export const tola: Profile = {
  slug: 'tola',
  theme: 'tola',
  name: 'Tola',
  greeting: 'hello',
  kicker: 'Model portfolio · 3 CITY . WARSAW',
  campaignLine: 'Cover Girl XMASS AW26 Campaign for SMYK',
  ageLine: '2 lata / 4 miesiące',
  personality: 'naturalna energia, charakter, radość',
  hero: {
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80',
    alt: 'Tola — zdjęcie główne portfolio',
  },
  about: {
    eyebrow: 'About Tola',
    title: 'Mała osoba.',
    titleEm: 'Duża obecność.',
    body: 'Tola ma w sobie naturalność, która przyciąga uwagę. Jest otwarta, uważna i swobodna przed obiektywem — dokładnie taka, jakiej szukają marki dziecięce.',
    highlightLabel: 'Recent highlight',
    highlight: 'Okładka świątecznego katalogu Smyk',
  },
  measurements: {
    age: '2 lata 4 miesiące',
    height: '92 cm',
    heightCm: '92',
    clothing: '92 / 98',
    shoe: '23',
    eyes: 'Niebieskie / jasne',
    hair: 'Ciemny blond',
  },
  photos: [
    {
      src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=80',
      alt: 'Tola — kampania XMASS AW26 dla SMYK',
      label: 'Campaign 01 · SMYK',
      category: 'commercial',
      credits: SMYK_CREDITS,
    },
    {
      src: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=1400&q=80',
      alt: 'Tola — polaroid testowy, światło 5500 K',
      label: 'Polaroid 01',
      category: 'polaroid',
    },
    {
      src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1400&q=80',
      alt: 'Tola na tle materiałów kampanii SMYK — kadr in-situ',
      label: 'In-Situ · SMYK',
      category: 'commercial',
      credits: SMYK_CREDITS,
    },
    {
      src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=80',
      alt: 'Tola — portret testowy',
      label: 'Portrait 01',
      category: 'polaroid',
    },
    {
      src: 'https://images.unsplash.com/photo-1503919005314-30d93d07d823?auto=format&fit=crop&w=1400&q=80',
      alt: 'Tola — zdjęcie lifestyle',
      label: 'Lifestyle 01',
      category: 'polaroid',
    },
  ],
  sibling: {
    slug: 'milo',
    name: 'Milo',
    banner:
      'Tola ma 5-letniego brata Milo. Biorą udział we wspólnych projektach komercyjnych i reklamach rodzeństwa.',
    cta: 'Zobacz profil Milo',
  },
  bookLabel: 'Book Tola / Commercial Inquiries',
  navAbout: 'O Toli',
  metaTitle: 'Tola Lieske — Model Portfolio',
  metaDescription:
    'Portfolio Toli Lieske, dziecięcej modelki reprezentowanej wyłącznie przez Moon Kids. Cover Girl XMASS AW26 Campaign for SMYK.',
}

export const milo: Profile = {
  slug: 'milo',
  theme: 'milo',
  name: 'Milo',
  greeting: 'hey',
  kicker: 'Model portfolio · 3 CITY . WARSAW',
  campaignLine: 'Commercial & sibling campaigns',
  ageLine: '5 lat',
  personality: 'luz, charakter, energia przed kamerą',
  hero: {
    src: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1400&q=80',
    alt: 'Milo — zdjęcie główne portfolio',
  },
  about: {
    eyebrow: 'About Milo',
    title: 'Mały chłopak.',
    titleEm: 'Duża obecność.',
    body: 'Milo ma naturalny luz i pewność przed obiektywem. Jest odważny, radosny i łatwo wchodzi w relację — dokładnie taki, jakiego szukają marki dziecięce i projekty rodzeństwa.',
    highlightLabel: 'Work in pair',
    highlight: 'Wspólne kampanie komercyjne z siostrą Tolą',
  },
  measurements: {
    age: '5 lat',
    height: '112 cm',
    heightCm: '112',
    clothing: '110 / 116',
    shoe: '28',
    eyes: 'Niebieskie',
    hair: 'Jasny blond',
  },
  photos: [
    {
      src: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=1400&q=80',
      alt: 'Milo — portret komercyjny',
      label: 'Campaign 01',
      category: 'commercial',
    },
    {
      src: 'https://images.unsplash.com/photo-1602030028438-4cf153cbae9e?auto=format&fit=crop&w=1400&q=80',
      alt: 'Milo — polaroid testowy, światło 5500 K',
      label: 'Polaroid 01',
      category: 'polaroid',
    },
    {
      src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1400&q=80',
      alt: 'Milo — energia na planie',
      label: 'Campaign 02',
      category: 'commercial',
    },
    {
      src: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?auto=format&fit=crop&w=1400&q=80',
      alt: 'Milo — zdjęcie lifestyle',
      label: 'Lifestyle 01',
      category: 'polaroid',
    },
    {
      src: 'https://images.unsplash.com/photo-1502781252888-9143ba7f074e?auto=format&fit=crop&w=1400&q=80',
      alt: 'Milo — portret testowy',
      label: 'Portrait 01',
      category: 'polaroid',
    },
    {
      src: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=1400&q=80',
      alt: 'Milo — kadr komercyjny',
      label: 'Campaign 03',
      category: 'commercial',
    },
  ],
  sibling: {
    slug: 'tola',
    name: 'Tola',
    banner:
      'Milo ma młodszą siostrę Tolę. Biorą udział we wspólnych projektach komercyjnych i reklamach rodzeństwa.',
    cta: 'Zobacz profil Toli',
  },
  bookLabel: 'Book Milo / Commercial Inquiries',
  navAbout: 'O Milo',
  metaTitle: 'Milo Lieske — Model Portfolio',
  metaDescription:
    'Portfolio Milo Lieske, dziecięcego modela reprezentowanego wyłącznie przez Moon Kids. Kampanie komercyjne i projekty rodzeństwa z Tolą.',
}

export const profiles = { tola, milo } as const
