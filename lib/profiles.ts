import { birthDates, calculateAge, formatAge, formatAgeLine } from '@/lib/age'

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

type ProfileConfig = Omit<Profile, 'ageLine' | 'measurements' | 'sibling'> & {
  measurements: Omit<Profile['measurements'], 'age'>
  sibling: Omit<Profile['sibling'], 'banner'> & {
    banner: string | ((siblingAge: string) => string)
  }
}

const tolaConfig: ProfileConfig = {
  slug: 'tola',
  theme: 'tola',
  name: 'Tola',
  greeting: 'hello',
  kicker: 'Model portfolio · Warsaw / Poland',
  campaignLine: 'Commercial campaigns · Warsaw',
  personality: 'naturalna energia, charakter, radość',
  hero: {
    src: '/photos/tola/hero-set.jpg',
    alt: 'Tola na planie — rozpuszczone włosy',
  },
  about: {
    eyebrow: 'About Tola',
    title: 'Mała osoba.',
    titleEm: 'Duża obecność.',
    body: 'Tola ma w sobie naturalność, która przyciąga uwagę. Jest otwarta, uważna i swobodna przed obiektywem — dokładnie taka, jakiej szukają marki dziecięce.',
    highlightLabel: 'Work',
    highlight: 'Kampanie komercyjne i testy agencyjne',
  },
  measurements: {
    height: '92 cm',
    heightCm: '92',
    clothing: '92 / 98',
    shoe: '23',
    eyes: 'Niebieskie / jasne',
    hair: 'Ciemny blond',
  },
  photos: [
    {
      src: '/photos/tola/hero-set.jpg',
      alt: 'Tola na planie — rozpuszczone włosy',
      label: 'On set 01',
      category: 'commercial',
    },
    {
      src: '/photos/tola/ice-cream.jpg',
      alt: 'Tola z lodem — park',
      label: 'Lifestyle 01',
      category: 'polaroid',
    },
  ],
  sibling: {
    slug: 'milo',
    name: 'Milo',
    banner: (siblingAge) =>
      `Tola ma młodszego brata Milo (${siblingAge}). Biorą udział we wspólnych projektach komercyjnych i reklamach rodzeństwa.`,
    cta: 'Zobacz profil Milo',
  },
  bookLabel: 'Book Tola / Commercial Inquiries',
  navAbout: 'O Toli',
  metaTitle: 'Tola Lieske — Model Portfolio',
  metaDescription:
    'Portfolio Toli Lieske, dziecięcej modelki reprezentowanej wyłącznie przez Moon Kids. Sesje komercyjne w Warszawie.',
}

const miloConfig: ProfileConfig = {
  slug: 'milo',
  theme: 'milo',
  name: 'Milo',
  greeting: 'hey',
  kicker: 'Model portfolio · Warsaw / Poland',
  campaignLine: 'Commercial & sibling campaigns · Warsaw',
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
    banner: (siblingAge) =>
      `Milo ma starszą siostrę Tolę (${siblingAge}). Biorą udział we wspólnych projektach komercyjnych i reklamach rodzeństwa.`,
    cta: 'Zobacz profil Toli',
  },
  bookLabel: 'Book Milo / Commercial Inquiries',
  navAbout: 'O Milo',
  metaTitle: 'Milo Lieske — Model Portfolio',
  metaDescription:
    'Portfolio Milo Lieske, dziecięcego modela reprezentowanego wyłącznie przez Moon Kids. Kampanie komercyjne i projekty rodzeństwa z Tolą.',
}

const profileConfigs = {
  tola: tolaConfig,
  milo: miloConfig,
} as const

function buildProfile(slug: keyof typeof profileConfigs, asOf = new Date(), siblingAge?: string): Profile {
  const config = profileConfigs[slug]
  const age = calculateAge(birthDates[slug], asOf)
  const resolvedSiblingAge = siblingAge ?? formatAge(calculateAge(birthDates[config.sibling.slug], asOf))
  const banner =
    typeof config.sibling.banner === 'function' ? config.sibling.banner(resolvedSiblingAge) : config.sibling.banner

  return {
    ...config,
    ageLine: formatAgeLine(age),
    measurements: {
      ...config.measurements,
      age: formatAge(age),
    },
    sibling: {
      slug: config.sibling.slug,
      name: config.sibling.name,
      banner,
      cta: config.sibling.cta,
    },
  }
}

export function getProfile(slug: keyof typeof profileConfigs, asOf = new Date()): Profile {
  const siblingSlug = profileConfigs[slug].sibling.slug
  const siblingAge = formatAge(calculateAge(birthDates[siblingSlug], asOf))
  return buildProfile(slug, asOf, siblingAge)
}

export function getProfiles(asOf = new Date()) {
  return {
    tola: getProfile('tola', asOf),
    milo: getProfile('milo', asOf),
  }
}
