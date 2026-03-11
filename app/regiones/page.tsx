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

    return {
      title:
        settings?.regionsSeoTitle ??
        'Regiones – Encuentros por ciudad en España',

      description:
        settings?.regionsSeoDescription ??
        'Explora encuentros y perfiles disponibles por ciudad en España.',

      openGraph: {
        title:
          settings?.regionsSeoTitle ??
          'Regiones – Encuentros por ciudad en España',

        description:
          settings?.regionsSeoDescription ??
          'Explora encuentros y perfiles disponibles por ciudad en España.',
      },
    }
  } catch {
    return {
      title: 'Regiones – Putas Madrid X',
      description: 'Descubre perfiles por ciudad.',
    }
  }
}

export default async function RegionesPage() {
  let cities: Ville[] = []

  try {
    cities = await client.fetch(ALL_CITIES_QUERY)
  } catch (e) {
    console.error(e)
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Header */}
      <div
        style={{
          padding: '60px 0 40px',
          borderBottom: '1px solid rgba(255,255,255,.06)',
          marginBottom: 40,
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#3e444d', fontSize: '.8rem' }}>
            Inicio › <span style={{ color: '#fb7185' }}>Regiones</span>
          </span>

          <h1
            style={{
              fontSize: 'clamp(1.8rem,4vw,2.6rem)',
              color: 'white',
              marginTop: 10,
              marginBottom: 8,
            }}
          >
            📍 Regiones de España
          </h1>

          <p style={{ color: '#7c8590' }}>
            Encuentra perfiles cerca de ti.
          </p>
        </div>
      </div>

      {/* Cities Grid */}
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
                href={`/regiones/${city.slug.current}`}
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
                  {city.profileCount || 0} perfiles disponibles
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
            No se encontraron ciudades.
            <br />
            Verifica que tus ciudades estén publicadas en Sanity.
          </div>
        )}
      </div>
    </div>
  )
}