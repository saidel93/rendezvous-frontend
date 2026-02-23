import type { Metadata } from 'next'
import Link from 'next/link'
import {
  client,
  FEATURED_QUERY,
  ALL_CITIES_QUERY,
  ALL_CATEGORIES_QUERY,
} from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title:
    'RendezVous Québec – Rencontres authentiques au Québec',
  description:
    'Des milliers de profils vérifiés à travers le Québec. Trouvez votre partenaire idéal à Montréal, Québec, Laval et partout au Québec.',
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
  } catch (e) {}

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
          padding: '40px 0 0',
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
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(225,29,72,.08)',
              border: '1px solid rgba(225,29,72,.2)',
              borderRadius: 50,
              padding: '6px 14px',
              fontSize: '.82rem',
              color: '#7c8590',
              marginBottom: 14,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                background: '#22c55e',
                borderRadius: '50%',
              }}
            />
            <strong style={{ color: '#86efac' }}>
              {Math.floor(Math.random() * 71) + 50}
            </strong>{' '}
            membres en ligne
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem,5vw,3rem)',
              fontWeight: 700,
              marginBottom: 12,
              color: 'white',
              lineHeight: 1.15,
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
              margin: '0 auto 18px',
              color: '#7c8590',
            }}
          >
            Des milliers de profils vérifiés. De vraies connexions.
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
                boxShadow:
                  '0 4px 20px rgba(225,29,72,.4)',
                color: '#fff',
                fontWeight: 700,
                padding: '12px 26px',
                borderRadius: 14,
                textDecoration: 'none',
              }}
            >
              ❤ Parcourir les profils
            </Link>

            <Link
              href="/regions"
              style={{
                background: 'rgba(255,255,255,.05)',
                border: '1px solid rgba(255,255,255,.1)',
                color: 'white',
                padding: '12px 26px',
                borderRadius: 14,
                textDecoration: 'none',
              }}
            >
              📍 Par région
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section
        style={{
          padding: '10px 0 60px',
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 18,
            }}
          >
            <h2
              style={{
                fontSize: '1.6rem',
                color: 'white',
                fontWeight: 700,
              }}
            >
              ⭐ Profils Vedettes
            </h2>

            <Link
              href="/annonces"
              style={{
                color: '#fb7185',
                textDecoration: 'none',
                fontSize: '.85rem',
                fontWeight: 600,
              }}
            >
              Voir tout →
            </Link>
          </div>

          {featured.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(240px,1fr))',
                gap: 16,
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
                padding: '40px 0',
                color: '#7c8590',
              }}
            >
              Aucun profil vedette pour le moment.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}