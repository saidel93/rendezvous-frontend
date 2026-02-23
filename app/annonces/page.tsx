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

export const revalidate = 60

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { city?: string; cat?: string; q?: string }
}): Promise<Metadata> {
  let title = 'Toutes les annonces – Célibataires au Québec'
  let desc =
    'Parcourez des milliers de profils vérifiés de célibataires à travers tout le Québec.'

  if (searchParams.q) {
    title = `Recherche "${searchParams.q}" – Annonces Québec`
    desc = `Résultats pour "${searchParams.q}" parmi les célibataires du Québec.`
  }

  return {
    title,
    description: desc,
    openGraph: { title, description: desc },
  }
}

export default async function AnnoncesPage({
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
  } catch (e) {}

  let profiles = allProfiles

  if (searchParams.city)
    profiles = profiles.filter(
      (p) => p.ville?.slug.current === searchParams.city
    )

  if (searchParams.cat)
    profiles = profiles.filter(
      (p) => p.categorie?.slug.current === searchParams.cat
    )

  if (searchParams.q) {
    const q = searchParams.q.toLowerCase()
    profiles = profiles.filter(
      (p) =>
        p.nom.toLowerCase().includes(q) ||
        p.tagline?.toLowerCase().includes(q) ||
        p.ville?.nom.toLowerCase().includes(q)
    )
  }

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
            Toutes les annonces
          </h1>
          <p style={{ color: '#7c8590' }}>
            {profiles.length} profil
            {profiles.length > 1 ? 's' : ''} trouvé
            {profiles.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* MAIN GRID LAYOUT */}
      <div
        style={{
          maxWidth: 1500,
          margin: '0 auto',
          padding: '0 20px 60px',
          display: 'grid',
          gridTemplateColumns: '260px 1fr 260px',
          gap: 28,
        }}
      >
        {/* LEFT SIDEBAR - VILLES */}
        <aside style={{ position: 'sticky', top: 120 }}>
          <div
            style={{
              background: 'rgba(21,25,32,.8)',
              borderRadius: 14,
              padding: 16,
            }}
          >
            <h3 style={{ color: '#fb7185', fontSize: '.8rem' }}>
              🏙️ Villes
            </h3>

            {cities.map((c) => (
              <Link
                key={c._id}
                href={`/annonces?city=${c.slug.current}`}
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
        </aside>

        {/* CENTER PROFILES */}
        <div>
          {profiles.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 16,
              }}
            >
              {profiles.map((p) => (
                <ProfileCard key={p._id} p={p} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              Aucun profil trouvé.
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR - CATEGORIES */}
        <aside style={{ position: 'sticky', top: 120 }}>
          <div
            style={{
              background: 'rgba(21,25,32,.8)',
              borderRadius: 14,
              padding: 16,
            }}
          >
            <h3 style={{ color: '#fb7185', fontSize: '.8rem' }}>
              💝 Catégories
            </h3>

            {cats.map((c) => (
              <Link
                key={c._id}
                href={`/annonces?cat=${c.slug.current}`}
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
        </aside>
      </div>
    </div>
  )
}