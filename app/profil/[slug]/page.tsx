import type { Metadata } from 'next'
import {
  client,
  PROFILE_BY_SLUG_QUERY,
  ALL_PROFILES_QUERY,
  SETTINGS_QUERY,
  getPhotoSrc,
  getGalleryUrls,
  getAffiliateUrl,
  getProfileMetaTitle,
  getProfileMetaDesc,
} from '@/lib/sanity'
import type { Profile, SiteSettings } from '@/lib/types'
import { notFound } from 'next/navigation'
import ProfileCard from '@/components/ProfileCard'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const p: Profile = await client.fetch(PROFILE_BY_SLUG_QUERY, { slug: params.slug })
    if (!p) return { title: 'Profil introuvable' }

    const title = getProfileMetaTitle(p)
    const desc = getProfileMetaDesc(p)
    const image = getPhotoSrc(p)

    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        images: [{ url: image, width: 400, height: 500 }],
        type: 'profile',
      },
    }
  } catch {
    return { title: 'Profil' }
  }
}

export default async function ProfilePage({ params }: { params: { slug: string } }) {
  let p: Profile | null = null
  let related: Profile[] = []
  let settings: SiteSettings | null = null

  try {
    ;[p, related, settings] = await Promise.all([
      client.fetch(PROFILE_BY_SLUG_QUERY, { slug: params.slug }),
      client.fetch(ALL_PROFILES_QUERY),
      client.fetch(SETTINGS_QUERY),
    ])
  } catch {}

  if (!p) notFound()

  const mainPhoto = getPhotoSrc(p, 800, 1000)
  const gallery = getGalleryUrls(p)
  const affLink = getAffiliateUrl(p, settings)

  const sameCity = related
    .filter((x: Profile) => x._id !== p!._id && x.ville?._id === p!.ville?._id)
    .slice(0, 4)

  const responsiveStyle = `
    @media (min-width: 1024px) {
      .profile-grid {
        grid-template-columns: 420px 1fr;
        gap: 60px;
      }

      .image-column {
        max-width: 420px;
      }
    }
  `

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <style>{responsiveStyle}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>

        {/* MAIN GRID */}
        <div
          className="profile-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 30,
            alignItems: 'start',
            marginBottom: 60,
          }}
        >

          {/* IMAGE COLUMN */}
          <div className="image-column" style={{ width: '100%' }}>
            <div
              style={{
                borderRadius: 18,
                overflow: 'hidden',
                aspectRatio: '4/5',
                marginBottom: 16,
              }}
            >
              <img
                src={mainPhoto}
                alt={`${p.nom}, ${p.age} ans`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>

            {gallery.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8 }}>
                {gallery.slice(1, 5).map((src, i) => (
                  <div key={i} style={{ aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
                    <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INFO COLUMN */}
          <div>

            <h1
              style={{
                fontSize: 'clamp(1.7rem, 6vw, 2.6rem)',
                color: 'white',
                lineHeight: 1.2,
                fontFamily: "'Playfair Display', serif",
                marginBottom: 12,
              }}
            >
              {p.heroTitle || p.tagline || `${p.nom}, ${p.age} ans`}
            </h1>

            <div
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: '#f1f5f9',
                marginBottom: 20,
              }}
            >
              {p.age} ans {p.ville && <>· 📍 {p.ville.nom}</>}
            </div>

            <blockquote
              style={{
                borderLeft: '4px solid #e11d48',
                paddingLeft: 18,
                marginBottom: 26,
              }}
            >
              <p
                style={{
                  fontSize: 'clamp(1rem, 4vw, 1.25rem)',
                  color: 'rgba(255,255,255,.85)',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                "{p.tagline}"
              </p>
            </blockquote>

            {p.bio && (
              <p
                style={{
                  fontSize: '1rem',
                  lineHeight: 1.8,
                  color: '#cbd5e1',
                  marginBottom: 30,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {p.bio}
              </p>
            )}

            <div
              style={{
                background: 'rgba(255,255,255,.04)',
                border: '1px solid rgba(225,29,72,.25)',
                borderRadius: 20,
                padding: 24,
              }}
            >
              <a
                href={affLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{
                  display: 'block',
                  width: '100%',
                  padding: 18,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg,#e11d48,#9f1239)',
                  boxShadow: '0 10px 30px rgba(225,29,72,.4)',
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  textDecoration: 'none',
                }}
              >
                🔒 Continuer sur la plateforme sécurisée
              </a>
            </div>

          </div>
        </div>

        {/* RELATED */}
        {sameCity.length > 0 && (
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                color: 'white',
                fontSize: '1.5rem',
                marginBottom: 20,
              }}
            >
              Profils similaires
            </h3>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill,minmax(180px,1fr))',
                gap: 16,
              }}
            >
              {sameCity.map((r: Profile) => (
                <ProfileCard key={r._id} p={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}