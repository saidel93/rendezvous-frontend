import type { Metadata } from 'next'
import {
  client,
  ALL_PROFILES_QUERY,
  ALL_CITIES_QUERY,
  ALL_CATEGORIES_QUERY,
} from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import Link from 'next/link'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const dynamic = 'force-dynamic'

/* Shuffle function */
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { city?: string; cat?: string; q?: string }
}): Promise<Metadata> {
  let title = 'Todos los anuncios – Contactos en Madrid'
  let desc =
    'Explora miles de perfiles disponibles en Madrid y toda España.'

  if (searchParams.q) {
    title = `Buscar "${searchParams.q}" – Anuncios Madrid`
    desc = `Resultados para "${searchParams.q}" entre perfiles disponibles en Madrid.`
  }

  return { title, description: desc }
}

export default async function AnunciosPage({
  searchParams,
}: {
  searchParams: { city?: string; cat?: string; q?: string }
}) {
  let allProfiles: Profile[] = []
  let cities: Ville[] = []
  let cats: Categorie[] = []

  try {
    ;[allProfiles, cities, cats] = await Promise.all([
      client.fetch(ALL_PROFILES_QUERY),
      client.fetch(ALL_CITIES_QUERY),
      client.fetch(ALL_CATEGORIES_QUERY),
    ])
  } catch (e) {
    console.error(e)
  }

  let profiles = allProfiles || []

  // Filters
  if (searchParams.city) {
    profiles = profiles.filter(
      (p) => p.ville?.slug?.current === searchParams.city
    )
  }

  if (searchParams.cat) {
    profiles = profiles.filter(
      (p) => p.categorie?.slug?.current === searchParams.cat
    )
  }

  if (searchParams.q) {
    const q = searchParams.q.toLowerCase()
    profiles = profiles.filter(
      (p) =>
        p.nom?.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.ville?.nom?.toLowerCase().includes(q)
    )
  }

  // Randomize
  profiles = shuffle(profiles)

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* HEADER */}
      <div
        style={{
          padding: '40px 0 28px',
          borderBottom: '1px solid rgba(255,255,255,.06)',
          marginBottom: 32,
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '2rem', color: 'white' }}>
            Todos los anuncios
          </h1>

          <p style={{ color: '#7c8590' }}>
            {profiles.length} perfil{profiles.length > 1 ? 'es' : ''} encontrado
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1400,
          margin: '0 auto',
          padding: '0 20px 60px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 28,
            flexDirection: 'column',
          }}
        >
          {/* PROFILES */}
          <div style={{ flex: 1 }}>
            {profiles.length > 0 ? (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(auto-fill,minmax(220px,1fr))',
                  gap: 16,
                }}
              >
                {profiles.map((p) => (
                  <ProfileCard key={p._id} p={p} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0' }}>
                No se encontraron perfiles.
              </div>
            )}
          </div>

          {/* DESKTOP SIDEBARS */}
          <div className="desktop-sidebars">
            <div
              style={{
                display: 'flex',
                gap: 28,
              }}
            >
              {/* LEFT */}
              <div style={{ width: 250 }}>
                <div
                  style={{
                    background: 'rgba(21,25,32,.8)',
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <h3 style={{ color: '#fb7185', fontSize: '.8rem' }}>
                    🏙️ Ciudades
                  </h3>

                  {cities.map((c) => (
                    <Link
                      key={c._id}
                      href={`/anuncios?city=${c.slug.current}`}
                      style={{
                        display: 'block',
                        padding: '6px 0',
                        fontSize: '.85rem',
                        color:
                          searchParams.city === c.slug.current
                            ? '#fb7185'
                            : '#9ba3af',
                        textDecoration: 'none',
                      }}
                    >
                      📍 {c.nom}
                    </Link>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div style={{ width: 250 }}>
                <div
                  style={{
                    background: 'rgba(21,25,32,.8)',
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <h3 style={{ color: '#fb7185', fontSize: '.8rem' }}>
                    💝 Categorías
                  </h3>

                  {cats.map((c) => (
                    <Link
                      key={c._id}
                      href={`/anuncios?cat=${c.slug.current}`}
                      style={{
                        display: 'block',
                        padding: '6px 0',
                        fontSize: '.85rem',
                        color:
                          searchParams.cat === c.slug.current
                            ? '#fb7185'
                            : '#9ba3af',
                        textDecoration: 'none',
                      }}
                    >
                      {c.emoji} {c.nom}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RESPONSIVE STYLE */}
      <style>
        {`
          @media (max-width: 1200px) {
            .desktop-sidebars {
              display: none;
            }
          }
        `}
      </style>
    </div>
  )
}