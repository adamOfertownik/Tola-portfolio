'use client'

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center border border-foreground px-5 py-3 text-[10px] uppercase tracking-[0.2em] print:hidden hover:bg-foreground hover:text-background"
    >
      Pobierz PDF
    </button>
  )
}
