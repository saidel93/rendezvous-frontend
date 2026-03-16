import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import { client, TRANSLATIONS_QUERY } from '@/lib/sanity'
import { buildDictionary } from '@/lib/i18n'

export const metadata: Metadata = {
  title: {
    default: 'RendezVous Québec – Rencontres authentiques au Québec',
    template: '%s | RendezVous Québec',
  },
  description:
    'Des milliers de profils vérifiés à travers le Québec. Trouvez votre partenaire idéal à Montréal, Québec, Laval et partout au Québec.',
  keywords: [
    'rencontres québec',
    'célibataires québec',
    'site de rencontre québec',
    'rencontres montréal',
  ],
  openGraph: {
    siteName: 'RendezVous Québec',
    locale: 'fr_CA',
    type: 'website',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSlug = process.env.NEXT_PUBLIC_SITE_SLUG || 'quebec-x'
  const locale = 'fr'

  let dict: Record<string, string> = {}

  try {
    const rows = await client.fetch(TRANSLATIONS_QUERY, {
      siteSlug,
      locale,
    })

    // rows must be an array
    dict = buildDictionary(Array.isArray(rows) ? rows : [])
  } catch (err) {
    console.error('❌ TRANSLATIONS FETCH ERROR:', err)
    dict = {}
  }

  return (
    <html lang="fr-CA">
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
        <Footer dict={dict} />
      </body>
    </html>
  )
}