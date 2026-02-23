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

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  try {
    const p: Profile = await client.fetch(PROFILE_BY_SLUG_QUERY, {
      slug: params.slug,
    })

    if (!p) return { title: 'Profil introuvable' }

    const title = getProfileMetaTitle(p)
    const description = getProfileMetaDesc(p)
    const image = getPhotoSrc(p)

    const ogAlt = `${p.nom}, ${p.age} ans`
    const ogUrl = `/profil/${params.slug}`

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: 'profile',
        url: ogUrl,
        images: [
          {
            url: image,
            width: 400,
            height: 500,
            alt: ogAlt,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [
          {
            url: image,
            alt: ogAlt,
          },
        ],
      },
    }
  } catch {
    return { title: 'Profil', description: 'Profil' }
  }
}

export default async function ProfilePage({
  params,
}: {
  params: { slug: string }
}) {
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

  const mainPhoto = getPhotoSrc(p, 900, 1120)
  const gallery = getGalleryUrls(p)
  const affLink = getAffiliateUrl(p, settings)

  const sameCity = related
    .filter((x) => x._id !== p!._id && x.ville?._id === p!.ville?._id)
    .slice(0, 4)

  const css = `
    .wrap{max-width:1200px;margin:0 auto;padding:40px 20px;}
    .grid{display:grid;grid-template-columns:1fr;gap:28px;align-items:start;margin-bottom:60px;}
    .imgCol{width:100%;}
    .heroImg{border-radius:18px;overflow:hidden;aspect-ratio:4/5;margin-bottom:16px;}
    .heroImg img{width:100%;height:100%;object-fit:cover;display:block;}
    .thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;}
    .thumb{aspect-ratio:1;border-radius:10px;overflow:hidden;}
    .thumb img{width:100%;height:100%;object-fit:cover;display:block;}

    .title{font-size:clamp(1.7rem,6vw,2.6rem);color:#fff;line-height:1.2;font-family:'Playfair Display',serif;margin:0 0 12px;}
    .sub{font-size:1.1rem;font-weight:600;color:#f1f5f9;margin:0 0 20px;}
    .quote{border-left:4px solid #e11d48;padding-left:18px;margin:0 0 26px;}
    .quote p{font-size:clamp(1rem,4vw,1.25rem);color:rgba(255,255,255,.85);line-height:1.6;font-style:italic;margin:0;}
    .bio{font-size:1rem;line-height:1.8;color:#cbd5e1;margin:0 0 30px;white-space:pre-wrap;}

    .ctaBox{background:rgba(255,255,255,.04);border:1px solid rgba(225,29,72,.25);border-radius:20px;padding:24px;}
    .ctaBtn{display:block;width:100%;padding:18px;border-radius:14px;background:linear-gradient(135deg,#e11d48,#9f1239);box-shadow:0 10px 30px rgba(225,29,72,.4);color:#fff;font-size:1.1rem;font-weight:700;text-align:center;text-decoration:none;}

    .relatedTitle{font-family:'Playfair Display',serif;color:#fff;font-size:1.5rem;margin:0 0 18px;}
    .relatedGrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:16px;}

    /* ✅ Desktop only: image left / content right + keep image NOT huge */
    @media (min-width:1024px){
      .grid{grid-template-columns:420px 1fr;gap:60px;}
      .imgCol{max-width:420px;}
      .heroImg{aspect-ratio:4/5;}
    }
  `

  const imgAlt = `${p.nom}, ${p.age} ans`
  const h1Text = p.heroTitle || p.tagline || `${p.nom}, ${p.age} ans`

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <style>{css}</style>

      <div className="wrap">
        {/* MAIN GRID */}
        <div className="grid">
          {/* IMAGE COLUMN */}
          <div className="imgCol">
            <div className="heroImg">
              <img src={mainPhoto} alt={imgAlt} />
            </div>

            {gallery.length > 1 && (
              <div className="thumbs">
                {gallery.slice(1, 5).map((src, i) => (
                  <div key={i} className="thumb">
                    <img src={src} alt="" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* INFO COLUMN */}
          <div>
            <h1 className="title">{h1Text}</h1>

            <div className="sub">
              {p.age} ans {p.ville?.nom ? <>· 📍 {p.ville.nom}</> : null}
            </div>

            {p.tagline ? (
              <blockquote className="quote">
                <p>"{p.tagline}"</p>
              </blockquote>
            ) : null}

            {p.bio ? <p className="bio">{p.bio}</p> : null}

            <div className="ctaBox">
              <a
                href={affLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="ctaBtn"
              >
                🔒 Continuer sur la plateforme sécurisée
              </a>
            </div>
          </div>
        </div>

        {/* RELATED */}
        {sameCity.length > 0 && (
          <div>
            <h3 className="relatedTitle">Profils similaires</h3>
            <div className="relatedGrid">
              {sameCity.map((r) => (
                <ProfileCard key={r._id} p={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}