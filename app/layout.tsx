import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'RendezVous Québec – Rencontres authentiques au Québec',
    template: '%s | RendezVous Québec',
  },
  description: 'Des milliers de profils vérifiés à travers le Québec. Trouvez votre partenaire idéal à Montréal, Québec, Laval et partout au Québec.',
  keywords: ['rencontres québec', 'célibataires québec', 'site de rencontre québec', 'rencontres montréal'],
  openGraph: {
    siteName: 'RendezVous Québec',
    locale: 'fr_CA',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
