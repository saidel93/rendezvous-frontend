import type { Metadata } from 'next'
import { client, ALL_CATEGORIES_QUERY, ALL_PROFILES_QUERY } from '@/lib/sanity'
import Link from 'next/link'
import type { Categorie, Profile } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: "Tags et centres d'intérêt – Rencontres Québec",
  description: "Trouvez des célibataires selon leurs centres d'intérêt : voyage, yoga, cuisine, musique, sport et plus encore. Tous les profils organisés par catégories.",
  openGraph: { title: "Tags et centres d'intérêt – Rencontres Québec", description: "Trouvez des célibataires selon leurs centres d'intérêt au Québec." },
}

export default async function TagsPage() {
  let cats: Categorie[] = []
  let profiles: Profile[] = []
  try {
    ;[cats, profiles] = await Promise.all([client.fetch(ALL_CATEGORIES_QUERY), client.fetch(ALL_PROFILES_QUERY)])
  } catch (e) {}

  const grouped = cats.map(c => ({ cat: c, list: profiles.filter(p => p.categorie?.slug.current === c.slug.current).slice(0, 5) }))

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '40px 0 28px', background: 'linear-gradient(135deg,rgba(225,29,72,.06),transparent)', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#3e444d', fontSize: '.78rem' }}>Accueil › <span style={{ color: '#fb7185' }}>Tags</span></span>
          <h1 style={{ fontSize: '2.2rem', color: 'white', marginTop: 8, marginBottom: 6 }}>Tags : rencontres selon vos préférences</h1>
          <p style={{ color: '#7c8590', fontSize: '.9rem' }}>Trouvez une personne qui offre exactement ce que vous cherchez.</p>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: 20 }}>
          {grouped.map(({ cat, list }) => (
            <div key={cat._id} style={{ background: 'rgba(21,25,32,.8)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 24 }}>
              <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', color: 'white', marginBottom: 16 }}>{cat.emoji} {cat.nom}</h2>
              <ul style={{ listStyle: 'none', marginBottom: 18 }}>
                {list.filter(p => p?.slug?.current).map(p => (
                  <li key={p._id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ color: '#7c8590', fontSize: '.8rem' }}>☐</span>
                    <Link href={`/profil/${p.slug.current}`} style={{ color: '#fb7185', textDecoration: 'none', fontSize: '.85rem', fontWeight: 500 }}>{p.tagline}</Link>
                  </li>
                ))}
                {list.length === 0 && <li style={{ color: '#3e444d', fontSize: '.82rem' }}>Aucun profil dans cette catégorie.</li>}
              </ul>
              <Link href={`/categories/${cat.slug.current}`} style={{ display: 'inline-block', padding: '9px 18px', borderRadius: 8, background: 'linear-gradient(135deg,#e11d48,#9f1239)', color: 'white', fontSize: '.78rem', fontWeight: 700, textDecoration: 'none' }}>
                Voir tous les profils →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
