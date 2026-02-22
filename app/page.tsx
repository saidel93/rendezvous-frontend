import type { Metadata } from 'next'
import Link from 'next/link'
import { client, FEATURED_QUERY, ALL_CITIES_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'RendezVous Québec – Rencontres authentiques au Québec',
  description: 'Des milliers de profils vérifiés à travers le Québec. Trouvez votre partenaire idéal à Montréal, Québec, Laval et partout au Québec. Rencontres sérieuses, aventures et plus.',
  openGraph: {
    title: 'RendezVous Québec – Rencontres authentiques au Québec',
    description: 'Des milliers de profils vérifiés à travers le Québec. Trouvez votre partenaire idéal.',
  },
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
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 55% at 10% 15%, rgba(225,29,72,.1) 0%,transparent 55%)' }} />

      {/* Hero */}
      <section style={{ minHeight: 'calc(100vh - 108px)', display: 'flex', alignItems: 'center', padding: '60px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', width: '100%', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(225,29,72,.08)', border: '1px solid rgba(225,29,72,.2)', borderRadius: 50, padding: '7px 16px', fontSize: '.82rem', color: '#7c8590', marginBottom: 28 }}>
            <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
            <strong style={{ color: '#86efac' }}>{Math.floor(Math.random() * 71) + 50}</strong> membres en ligne dans votre région
          </div>
          <h1 className="hero-title" style={{ marginBottom: 20 }}>
            Trouvez votre<br />
            <span style={{ background: 'linear-gradient(135deg,#fb7185,#e11d48,#c9913a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>Âme Sœur au Québec</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: 500, margin: '0 auto 36px' }}>Des milliers de profils vérifiés à travers le Québec. De vraies personnes, de vraies connexions.</p>
          <div className="hero-buttons">
            <Link href="/annonces" style={{ background: 'linear-gradient(135deg,#e11d48,#9f1239)', boxShadow: '0 4px 20px rgba(225,29,72,.4)', color: '#fff', fontWeight: 700, padding: '14px 32px', borderRadius: 14, fontSize: '.95rem', textDecoration: 'none' }}>❤ Parcourir les profils</Link>
            <Link href="/regions" style={{ background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)', color: 'white', padding: '14px 32px', borderRadius: 14, fontSize: '.95rem', fontWeight: 600, textDecoration: 'none' }}>📍 Par région</Link>
          </div>
          <div className="hero-stats">
          {[['1 200+', 'Membres actifs'], ['9', 'Villes'], ['6', 'Catégories']].map(([n, l]) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '2rem', fontWeight: 700, display: 'block', background: 'linear-gradient(135deg,#fb7185,#e11d48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</span>
                <span style={{ color: '#3e444d', fontSize: '.78rem' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.06)' }} />

      {/* Featured */}
      <section style={{ padding: '70px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
            <div>
              <span style={{ color: '#fb7185', fontSize: '.72rem', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Sélection du jour</span>
              <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', color: 'white' }}>Profils en vedette</h2>
            </div>
            <Link href="/annonces" style={{ color: '#fb7185', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>Voir tous →</Link>
          </div>
          {featured.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(265px,1fr))', gap: 18 }}>
              {featured.map(p => <ProfileCard key={p._id} p={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#7c8590' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>💝</div>
              <p>Ajoutez des profils dans Sanity Studio et activez "Vedette" pour les voir ici.</p>
            </div>
          )}
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.06)' }} />

      {/* Cities */}
      <section style={{ padding: '70px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#fb7185', fontSize: '.72rem', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Rencontres locales</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', color: 'white', marginBottom: 24 }}>Célibataires par ville</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
            {cities.map(c => (
              <Link key={c._id} href={`/regions/${c.slug.current}`} style={{ background: 'rgba(255,255,255,.035)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 50, padding: '9px 18px', color: '#7c8590', fontSize: '.83rem', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 7 }}>
                📍 {c.nom} <span style={{ fontSize: '.7rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{c.profileCount || 0}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,.06)' }} />

      {/* Categories */}
      <section style={{ padding: '70px 0', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#fb7185', fontSize: '.72rem', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Que cherchez-vous ?</span>
          <h2 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.4rem)', color: 'white', marginBottom: 24 }}>Explorer par catégorie</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: 12 }}>
            {cats.map(c => (
              <Link key={c._id} href={`/categories/${c.slug.current}`} style={{ background: 'rgba(225,29,72,.07)', border: '1px solid rgba(225,29,72,.14)', borderRadius: 16, padding: '20px', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                <div style={{ fontSize: '2rem', marginBottom: 8 }}>{c.emoji}</div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1rem', fontWeight: 700, marginBottom: 3, color: 'white' }}>{c.nom}</div>
                <div style={{ color: '#7c8590', fontSize: '.75rem' }}>{c.profileCount || 0} profils</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
