import type { Metadata } from 'next'
import {
  client, PROFILE_BY_SLUG_QUERY, ALL_PROFILES_QUERY, SETTINGS_QUERY,
  getPhotoSrc, getGalleryUrls, getAffiliateUrl, getProfileMetaTitle, getProfileMetaDesc,
} from '@/lib/sanity'
import Link from 'next/link'
import type { Profile, SiteSettings } from '@/lib/types'
import { notFound } from 'next/navigation'
import ProfileCard from '@/components/ProfileCard'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const p: Profile = await client.fetch(PROFILE_BY_SLUG_QUERY, { slug: params.slug })
    if (!p) return { title: 'Profil introuvable' }
    const title = getProfileMetaTitle(p)
    const desc  = getProfileMetaDesc(p)
    const image = getPhotoSrc(p)
    return {
      title,
      description: desc,
      openGraph: {
        title,
        description: desc,
        images: [{ url: image, width: 400, height: 500, alt: `${p.nom}, ${p.age} ans` }],
        type: 'profile',
      },
      twitter: { card: 'summary_large_image', title, description: desc, images: [image] },
    }
  } catch (e) {
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
  } catch (e) {}

  if (!p) notFound()

  const mainPhoto = getPhotoSrc(p, 600, 750)
  const gallery   = getGalleryUrls(p)
  const affLink   = getAffiliateUrl(p, settings)

  const sameCityAll = related.filter(
    (x: Profile) => x._id !== p!._id && x.ville?._id === p!.ville?._id
  )
  const sameCity = sameCityAll.slice(0, 4)

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 20px' }}>

        {/* Breadcrumb */}
        <div style={{ color: '#3e444d', fontSize: '.78rem', marginBottom: 24, display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/" style={{ color: '#7c8590', textDecoration: 'none' }}>Accueil</Link> ›
          <Link href="/annonces" style={{ color: '#7c8590', textDecoration: 'none' }}>Annonces</Link> ›
          {p.ville && <><Link href={`/regions/${p.ville.slug.current}`} style={{ color: '#7c8590', textDecoration: 'none' }}>{p.ville.nom}</Link> ›</>}
          <span style={{ color: '#fb7185' }}>{p.nom}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)', gap: 40, alignItems: 'start', marginBottom: 60 }}>

          {/* ── Gallery ───────────────────────────────────────────────────── */}
          <div>
            <div style={{ borderRadius: 18, overflow: 'hidden', aspectRatio: '3/4', position: 'relative', marginBottom: 10 }}>
              <img src={mainPhoto} alt={`${p.nom}, ${p.age} ans`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {p.vedette && (
                <div style={{ position: 'absolute', top: 14, left: 14 }}>
                  <span style={{ fontSize: '.72rem', padding: '4px 10px', borderRadius: 20, background: 'rgba(201,145,58,.25)', border: '1px solid rgba(201,145,58,.5)', color: '#e8b96a', fontWeight: 600 }}>★ Vedette</span>
                </div>
              )}
            </div>
            {gallery.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(gallery.length - 1, 4)}, 1fr)`, gap: 7 }}>
                {gallery.slice(1, 5).map((src, i) => (
                  <div key={i} style={{ aspectRatio: '1', borderRadius: 10, overflow: 'hidden' }}>
                    <img src={src} alt={`${p!.nom} photo ${i + 2}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── Info ──────────────────────────────────────────────────────── */}
          <div>
            {/* H1 = SEO title (custom or auto-generated) */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
              <h1 style={{ fontSize: '2rem', color: 'white', lineHeight: 1.2, fontFamily: "'Playfair Display',serif" }}>
                {pageTitle}
              </h1>
              {p.online && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', borderRadius: 50, padding: '5px 12px', fontSize: '.75rem', color: '#86efac', fontWeight: 600, flexShrink: 0, marginTop: 6 }}>
                  <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%' }} /> En ligne
                </div>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#7c8590', marginBottom: 14, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white' }}>{p.age} ans</span>
              <span>·</span>
              {p.ville && <Link href={`/regions/${p.ville.slug.current}`} style={{ color: '#93c5fd', textDecoration: 'none' }}>📍 {p.ville.nom}</Link>}
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {p.categorie && (
                <Link href={`/categories/${p.categorie.slug.current}`} style={{ background: 'rgba(201,145,58,.1)', border: '1px solid rgba(201,145,58,.25)', color: '#e8b96a', fontSize: '.78rem', padding: '5px 12px', borderRadius: 50, fontWeight: 600, textDecoration: 'none' }}>
                  {p.categorie.emoji} {p.categorie.nom}
                </Link>
              )}
              {p.ville && (
                <Link href={`/regions/${p.ville.slug.current}`} style={{ background: 'rgba(59,130,246,.08)', border: '1px solid rgba(59,130,246,.2)', color: '#93c5fd', fontSize: '.78rem', padding: '5px 12px', borderRadius: 50, fontWeight: 600, textDecoration: 'none' }}>
                  🏙️ {p.ville.nom}
                </Link>
              )}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 18 }}>
              {p.verifie?.photo     && <span style={{ fontSize: '.72rem', padding: '4px 10px', borderRadius: 20, background: 'rgba(201,145,58,.2)', border: '1px solid rgba(201,145,58,.4)', color: '#e8b96a', fontWeight: 600 }}>✓ Photo vérifiée</span>}
              {p.verifie?.premium   && <span style={{ fontSize: '.72rem', padding: '4px 10px', borderRadius: 20, background: 'rgba(168,85,247,.15)', border: '1px solid rgba(168,85,247,.35)', color: '#d8b4fe', fontWeight: 600 }}>★ Premium</span>}
              {p.verifie?.email     && <span style={{ fontSize: '.72rem', padding: '4px 10px', borderRadius: 20, background: 'rgba(59,130,246,.12)', border: '1px solid rgba(59,130,246,.35)', color: '#93c5fd', fontWeight: 600 }}>✉ Courriel</span>}
              {p.verifie?.telephone && <span style={{ fontSize: '.72rem', padding: '4px 10px', borderRadius: 20, background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.35)', color: '#86efac', fontWeight: 600 }}>📱 Téléphone</span>}
            </div>

            <blockquote style={{ borderLeft: '3px solid #e11d48', paddingLeft: 14, marginBottom: 18 }}>
              <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(255,255,255,.75)' }}>"{p.tagline}"</p>
            </blockquote>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 18 }}>
              <div style={{ background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <span style={{ color: '#3e444d', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, display: 'block' }}>Membre depuis</span>
                <span style={{ color: 'white', fontSize: '.88rem', fontWeight: 600 }}>{p.membreDepuis || '—'}</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
                <span style={{ color: '#3e444d', fontSize: '.68rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4, display: 'block' }}>Dernière activité</span>
                <span style={{ color: '#86efac', fontSize: '.88rem', fontWeight: 600 }}>Il y a {p.derniereActivite || '—'}</span>
              </div>
            </div>

            {p.bio && (
              <p style={{ color: '#7c8590', fontSize: '.86rem', lineHeight: 1.8, marginBottom: 18, whiteSpace: 'pre-wrap' }}>{p.bio}</p>
            )}

            {p.tags && p.tags.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 24 }}>
                {p.tags.map((t: string) => (
                  <span key={t} style={{ background: 'rgba(225,29,72,.08)', border: '1px solid rgba(225,29,72,.2)', color: '#fda4af', fontSize: '.78rem', padding: '5px 13px', borderRadius: 50 }}>{t}</span>
                ))}
              </div>
            )}

            {/* CTA — always uses resolved affiliate URL */}
            <div style={{ background: 'rgba(255,255,255,.035)', border: '1px solid rgba(225,29,72,.2)', borderRadius: 18, padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 14, fontSize: '.83rem', color: '#86efac', fontWeight: 500 }}>
                <span style={{ width: 8, height: 8, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
                {p.nom} est active et pourrait répondre bientôt
              </div>
              <a
                href={affLink}
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{ display: 'block', width: '100%', padding: 16, borderRadius: 12, background: 'linear-gradient(135deg,#e11d48,#9f1239)', boxShadow: '0 6px 24px rgba(225,29,72,.4)', color: '#fff', fontSize: '.95rem', fontWeight: 700, textAlign: 'center', textDecoration: 'none' }}
              >
                🔒 Continuer sur la plateforme sécurisée
              </a>
              <p style={{ textAlign: 'center', marginTop: 9, color: '#3e444d', fontSize: '.73rem' }}>
                Vous serez redirigé·e vers une plateforme partenaire vérifiée
              </p>
            </div>
          </div>
        </div>

        {/* Related profiles */}
        {sameCity.length > 0 && (
          <div>
            <span style={{ color: '#fb7185', fontSize: '.72rem', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Dans la même ville</span>
            <h3 style={{ fontFamily: "'Playfair Display',serif", color: 'white', fontSize: '1.4rem', marginBottom: 20 }}>Profils similaires</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 14 }}>
              {sameCity.map((r: Profile) => <ProfileCard key={r._id} p={r} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
