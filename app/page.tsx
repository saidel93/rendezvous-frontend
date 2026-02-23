import type { Metadata } from 'next'
import Link from 'next/link'
import {
  client,
  FEATURED_QUERY,
  ALL_CITIES_QUERY,
  ALL_CATEGORIES_QUERY,
  ALL_PROFILES_QUERY,
} from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const dynamic = 'force-dynamic' // 🔥 disable cache

export const metadata: Metadata = {
  title: 'RendezVous Québec – Rencontres authentiques au Québec',
  description:
    'Des milliers de profils vérifiés à travers le Québec.',
}

/* 🔥 Random shuffle function */
function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export default async function HomePage() {
  let featured: Profile[] = []
  let cities: Ville[] = []
  let cats: Categorie[] = []

  try {
    ;[featured, cities, cats] = await Promise.all([
      client.fetch(FEATURED_QUERY),
      client.fetch(ALL_CITIES_QUERY),
      client.fetch(ALL_CATEGORIES_QUERY),
    ])

    // If no featured → fallback to all profiles
    if (!featured || featured.length === 0) {
      const allProfiles: Profile[] = await client.fetch(
        ALL_PROFILES_QUERY
      )
      featured = allProfiles
    }

    // 🔥 RANDOMIZE every time
    featured = shuffle(featured).slice(0, 8)
  } catch (e) {
    console.error(e)
  }

  return (
    <div>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 70% 55% at 10% 15%, rgba(225,29,72,.1) 0%, transparent 55%)',
        }}
      />

      {/* HERO */}
      <section
        style={{
          padding: '30px 0 10px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 20px',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2rem,5vw,2.8rem)',
              fontWeight: 700,
              marginBottom: 10,
              color: 'white',
              lineHeight: 1.2,
            }}
          >
            Trouvez votre <br />
            <span
              style={{
                background:
                  'linear-gradient(135deg,#fb7185,#e11d48,#c9913a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontStyle: 'italic',
              }}
            >
              Âme Sœur au Québec
            </span>
          </h1>

          <p
            style={{
              maxWidth: 500,
              margin: '0 auto 16px',
              color: '#7c8590',
            }}
          >
            Des milliers de profils vérifiés.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
              marginBottom: 20,
            }}
          >
            <Link
              href="/annonces"
              style={{
                background:
                  'linear-gradient(135deg,#e11d48,#9f1239)',
                color: '#fff',
                fontWeight: 700,
                padding: '10px 22px',
                borderRadius: 14,
                textDecoration: 'none',
              }}
            >
              ❤ Parcourir
            </Link>

            <Link
              href="/regions"
              style={{
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.1)',
                color: 'white',
                padding: '10px 22px',
                borderRadius: 14,
                textDecoration: 'none',
              }}
            >
              📍 Régions
            </Link>
          </div>
        </div>
      </section>

      {/* RANDOM PROFILES */}
      <section
        style={{
          padding: '10px 0 50px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <h2
            style={{
              fontSize: '1.4rem',
              color: 'white',
              marginBottom: 16,
              fontWeight: 700,
            }}
          >
            ⭐ Profils au hasard
          </h2>

          {featured.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(230px,1fr))',
                gap: 14,
              }}
            >
              {featured.map((p) => (
                <ProfileCard key={p._id} p={p} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                padding: '30px 0',
                color: '#7c8590',
              }}
            >
              Aucun profil disponible.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}