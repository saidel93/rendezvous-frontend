import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { client, TRANSLATIONS_QUERY } from '@/lib/sanity'
import { buildDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: {
    default: 'Putas Madrid X – Encuentros y sexo en Madrid',
    template: '%s | Putas Madrid X',
  },
  description:
    'Miles de perfiles calientes en Madrid y toda España. Encuentra mujeres reales para sexo, encuentros discretos y diversión sin compromiso.',
  keywords: [
    'putas madrid',
    'sexo madrid',
    'mujeres calientes madrid',
    'sexo gratis madrid',
    'contactos sexo madrid',
    'encuentros madrid',
    'sexo españa',
  ],
  openGraph: {
    siteName: 'Putas Madrid X',
    locale: 'es_ES',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSlug = process.env.NEXT_PUBLIC_SITE_SLUG || 'putas-madrid-x'
  const locale = 'es'

  let dict: Record<string, string> = {}

  try {
    const rows = await client.fetch(TRANSLATIONS_QUERY, {
      siteSlug,
      locale,
    })

    dict = buildDictionary(Array.isArray(rows) ? rows : [])
  } catch (err) {
    console.error('❌ TRANSLATIONS FETCH ERROR:', err)
    dict = {}
  }

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Figtree:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
        <Navbar dict={dict} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}