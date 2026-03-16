import type { Metadata } from 'next'
import Link from 'next/link'
import { client, ALL_CITIES_QUERY, SETTINGS_QUERY } from '@/lib/sanity'
import type { Ville } from '@/lib/types'

export const dynamic = 'force-dynamic'

/* ───────────────────────────────────────────── */
/* 🔥 Dynamic SEO from Sanity                   */
/* ───────────────────────────────────────────── */

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await client.fetch(SETTINGS_QUERY)

    const title =
      settings?.regionsSeoTitle ??
      'Régions – Rencontres par ville au Québec'

    const description =
      settings?.regionsSeoDescription ??
      'Explorez les rencontres par ville au Québec.'

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
    }
  } catch {
    return {
      title: 'Régions – RendezVous Québec',
      description: 'Découvrez les profils par ville.',
    }
  }
}

/* ───────────────────────────────────────────── */
/* PAGE                                         */
/* ───────────────────────────────────────────── */

export default async function RegionsPage() {
  let cities: Ville[] = []

  try {
    const result = await client.fetch(ALL_CITIES_QUERY)
    cities = result || []
  } catch (e) {
    console.error('Sanity cities fetch error:', e)
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* HEADER */}
      <div
        style={{
          padding: '60px 0 40px',
          borderBottom: '1px solid rgba(255,255,255,.06)',
          marginBottom: 40,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#3e444d', fontSize: '.8rem' }}>
            Accueil › <span style={{ color: '#fb7185' }}>Régions</span>
          </span>

          <h1
            style={{
              fontSize: 'clamp(1.8rem,4vw,2.6rem)',
              color: 'white',
              marginTop: 10,
              marginBottom: 8,
            }}
          >
            📍 Régions du Québec
          </h1>

          <p style={{ color: '#7c8590' }}>
            Trouvez des profils près de chez vous.
          </p>
        </div>
      </div>

      {/* CITIES GRID */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px 80px' }}>
        {cities.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fill, minmax(240px, 1fr))',
              gap: 20,
            }}
          >
            {cities.map((city) => (
              <Link
                key={city._id}
                href={`/regions/${city.slug.current}`}
                style={{
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: 16,
                  padding: 24,
                  textDecoration: 'none',
                  display: 'block',
                }}
              >
                <div
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'white',
                    marginBottom: 6,
                  }}
                >
                  📍 {city.nom}
                </div>

                <div
                  style={{
                    fontSize: '.8rem',
                    color: '#7c8590',
                  }}
                >
                  {city.profileCount || 0} profils disponibles
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '80px 0',
              color: '#7c8590',
            }}
          >
            Aucune ville trouvée.
            <br />
            Vérifiez que vos villes sont publiées dans Sanity.
          </div>
        )}
      </div>
    </div>
  )
}