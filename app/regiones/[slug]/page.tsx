import type { Metadata } from 'next'
import {
  client,
  PROFILES_BY_CITY_QUERY,
  ALL_CATEGORIES_QUERY,
  CITY_BY_SLUG_QUERY,
} from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import Link from 'next/link'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const dynamic = 'force-dynamic'

/* ───────────────────────────────────────────── */
/* 🔥 Dynamic SEO                               */
/* ───────────────────────────────────────────── */

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { cat?: string }
}): Promise<Metadata> {
  try {
    const city: Ville | null = await client.fetch(
      CITY_BY_SLUG_QUERY,
      { slug: params.slug }
    )

    if (!city) return { title: 'Région' }

    let title =
      city.seoTitle ??
      `Rencontres à ${city.nom} – Célibataires ${city.nom}`

    let description =
      city.seoDescription ??
      `Rencontrez des célibataires à ${city.nom}. Profils vérifiés au Québec.`

    if (searchParams?.cat) {
      const cats: Categorie[] =
        await client.fetch(ALL_CATEGORIES_QUERY)

      const cat = cats.find(
        (c) => c.slug.current === searchParams.cat
      )

      if (cat) {
        title = `${cat.nom} à ${city.nom} ${cat.emoji ?? ''}`
        description = `Profils ${cat.nom} à ${city.nom}. Rencontres locales authentiques.`
      }
    }

    return {
      title,
      description,
      openGraph: { title, description },
    }
  } catch {
    return { title: 'Région' }
  }
}

/* ───────────────────────────────────────────── */
/* 🔥 PAGE                                      */
/* ───────────────────────────────────────────── */

export default async function RegionPage({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { cat?: string }
}) {
  let profiles: Profile[] = []
  let cats: Categorie[] = []
  let city: Ville | null = null

  try {
    ;[profiles, cats, city] = await Promise.all([
      client.fetch(PROFILES_BY_CITY_QUERY, {
        citySlug: params.slug,
      }),
      client.fetch(ALL_CATEGORIES_QUERY),
      client.fetch(CITY_BY_SLUG_QUERY, {
        slug: params.slug,
      }),
    ])
  } catch (e) {
    console.error(e)
  }

  if (!city) return null

  const filtered = searchParams?.cat
    ? profiles.filter(
        (p) =>
          p.categorie?.slug?.current ===
          searchParams.cat
      )
    : profiles

  const S: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,.04)',
    color: '#7c8590',
    fontSize: '.83rem',
    textDecoration: 'none',
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* HEADER */}
      <div
        style={{
          padding: '40px 0 28px',
          background:
            'linear-gradient(135deg,rgba(225,29,72,.06),transparent)',
          borderBottom:
            '1px solid rgba(255,255,255,.06)',
          marginBottom: 32,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <span style={{ color: '#3e444d', fontSize: '.78rem' }}>
            Accueil ›{' '}
            <Link
              href="/regions"
              style={{
                color: '#7c8590',
                textDecoration: 'none',
              }}
            >
              Régions
            </Link>{' '}
            ›{' '}
            <span style={{ color: '#fb7185' }}>
              {city.nom}
            </span>
          </span>

          <h1
            style={{
              fontSize: '2.2rem',
              color: 'white',
              marginTop: 8,
              marginBottom: 6,
            }}
          >
            Célibataires à {city.nom}
          </h1>

          <p
            style={{
              color: '#7c8590',
              fontSize: '.9rem',
            }}
          >
            {profiles.length} profil
            {profiles.length !== 1 ? 's' : ''} dans cette région
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 20px 60px',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 24,
        }}
      >
        {/* SIDEBAR */}
        <aside style={{ position: 'sticky', top: 120 }}>
          <div
            style={{
              background: 'rgba(21,25,32,.8)',
              border: '1px solid rgba(255,255,255,.07)',
              borderRadius: 14,
              padding: 16,
              marginBottom: 12,
            }}
          >
            <span
              style={{
                color: '#7c8590',
                fontSize: '.68rem',
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: 'uppercase',
                marginBottom: 10,
                display: 'block',
              }}
            >
              Filtrer par catégorie
            </span>

            <Link
              href={`/regions/${params.slug}`}
              style={{
                ...S,
                color: !searchParams?.cat
                  ? '#fb7185'
                  : '#7c8590',
              }}
            >
              <span>Toutes</span>
              <span>{profiles.length}</span>
            </Link>

            {cats.map((c) => {
              const count = profiles.filter(
                (p) =>
                  p.categorie?.slug?.current ===
                  c.slug.current
              ).length

              if (!count) return null

              return (
                <Link
                  key={c._id}
                  href={`/regions/${params.slug}?cat=${c.slug.current}`}
                  style={{
                    ...S,
                    color:
                      searchParams?.cat ===
                      c.slug.current
                        ? '#fb7185'
                        : '#7c8590',
                  }}
                >
                  <span>
                    {c.emoji} {c.nom}
                  </span>
                  <span>{count}</span>
                </Link>
              )
            })}
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div>
          {/* 🔥 TOP SEO CONTENT */}
          {city.topContent && (
            <div
              style={{
                marginBottom: 40,
                fontSize: '1rem',
                lineHeight: 1.8,
                color: '#cbd5e1',
                whiteSpace: 'pre-wrap',
              }}
            >
              {city.topContent}
            </div>
          )}

          <p
            style={{
              color: 'white',
              fontWeight: 600,
              marginBottom: 20,
            }}
          >
            {filtered.length} profil
            {filtered.length !== 1 ? 's' : ''} trouvé
            {filtered.length !== 1 ? 's' : ''}
          </p>

          {filtered.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  'repeat(auto-fill,minmax(260px,1fr))',
                gap: 18,
              }}
            >
              {filtered.map((p) => (
                <ProfileCard key={p._id} p={p} />
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
              Aucun profil pour cette combinaison.
            </div>
          )}

          {/* 🔥 BOTTOM SEO CONTENT */}
          {city.bottomContent && (
            <div
              style={{
                marginTop: 60,
                paddingTop: 40,
                borderTop:
                  '1px solid rgba(255,255,255,.08)',
                fontSize: '1rem',
                lineHeight: 1.9,
                color: '#cbd5e1',
                whiteSpace: 'pre-wrap',
              }}
            >
              <h2
                style={{
                  color: 'white',
                  marginBottom: 16,
                }}
              >
                Rencontres à {city.nom}
              </h2>
              {city.bottomContent}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}