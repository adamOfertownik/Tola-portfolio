'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import type { Photo, PhotoCategory } from '@/lib/profiles'

const filters: { id: 'all' | PhotoCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'commercial', label: 'Commercial / Campaigns' },
  { id: 'polaroid', label: 'Polaroids & Tests' },
]

type GalleryProps = {
  photos: Photo[]
}

export function Gallery({ photos }: GalleryProps) {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all')
  const [active, setActive] = useState<number | null>(null)

  const visible = useMemo(
    () => (filter === 'all' ? photos : photos.filter((photo) => photo.category === filter)),
    [filter, photos],
  )

  const close = useCallback(() => setActive(null), [])
  const prev = useCallback(
    () => setActive((index) => (index === null ? index : (index + visible.length - 1) % visible.length)),
    [visible.length],
  )
  const next = useCallback(
    () => setActive((index) => (index === null ? index : (index + 1) % visible.length)),
    [visible.length],
  )

  useEffect(() => {
    setActive(null)
  }, [filter])

  useEffect(() => {
    if (active === null) return

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === 'ArrowRight') next()
    }

    let startX = 0
    const onTouchStart = (event: TouchEvent) => {
      startX = event.changedTouches[0]?.clientX ?? 0
    }
    const onTouchEnd = (event: TouchEvent) => {
      const endX = event.changedTouches[0]?.clientX ?? 0
      const delta = endX - startX
      if (Math.abs(delta) < 50) return
      if (delta > 0) prev()
      else next()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [active, close, next, prev])

  const current = active === null ? null : visible[active]

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filtr galerii">
        {filters.map((item) => {
          const selected = filter === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setFilter(item.id)}
              className={`border px-4 py-2 text-[10px] uppercase tracking-[0.18em] transition-colors ${
                selected
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {visible.map((photo, index) => (
          <figure key={`${photo.label}-${photo.src}`} className="mb-10 break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(index)}
              className="group block w-full cursor-pointer overflow-hidden bg-muted text-left"
              aria-label={`Powiększ zdjęcie: ${photo.label}`}
            >
              <span className="relative block aspect-[3/4]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale-[8%] transition duration-700 group-hover:scale-105"
                />
              </span>
            </button>
            <figcaption className="mt-3 flex flex-col gap-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="flex justify-between gap-4">
                <span>{photo.label}</span>
                <span>
                  {String(index + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
                </span>
              </span>
              {photo.credits ? <span className="normal-case tracking-normal text-[11px]">{photo.credits}</span> : null}
            </figcaption>
          </figure>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-foreground/92 p-4 text-background md:p-10"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-5 top-5 rounded-full p-2 text-background/80 hover:text-background"
            aria-label="Zamknij podgląd"
          >
            <X size={22} />
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              prev()
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-background/80 hover:text-background md:left-8"
            aria-label="Poprzednie zdjęcie"
          >
            <ChevronLeft size={32} />
          </button>
          <figure
            className="relative flex max-h-full w-full max-w-5xl flex-col items-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative max-h-[78vh] w-full">
              <Image
                src={current.src}
                alt={current.alt}
                width={1600}
                height={2000}
                className="mx-auto max-h-[78vh] w-auto object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <figcaption className="text-center text-[10px] uppercase tracking-[0.22em] text-background/70">
              {current.label}
              {current.credits ? ` · ${current.credits}` : ''}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              next()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-background/80 hover:text-background md:right-8"
            aria-label="Następne zdjęcie"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      ) : null}
    </>
  )
}
