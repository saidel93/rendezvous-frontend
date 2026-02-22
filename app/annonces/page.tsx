import type { Metadata } from 'next'
import { client, ALL_PROFILES_QUERY, ALL_CITIES_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import Link from 'next/link'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const revalidate = 60

export async function generateMetadata({ searchParams }: { searchParams: { city?: string; cat?: string; q?: string } }): Promise<Metadata> {
  let title = 'Toutes les annonces – Célibataires au Québec'
  let desc = 'Parcourez des milliers de profils vérifiés de célibataires à travers tout le Québec. Filtrez par ville ou catégorie pour trouver la personne idéale.'
  if (searchParams.q) {
    title = `Recherche "${searchParams.q}" – Annonces Québec`
    desc = `Résultats de recherche pour "${searchParams.q}" parmi les célibataires du Québec.`
  }
  return { title, description: desc, openGraph: { title, description: desc } }
}

export default async function AnnoncesPage({ searchParams }: { searchParams: { city?: string; cat?: string; q?: string } }) {
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
  if (searchParams.city) profiles = profiles.filter(p => p.ville?.slug.current === searchParams.city)
  if (searchParams.cat)  profiles = profiles.filter(p => p.categorie?.slug.current === searchParams.cat)
  if (searchParams.q) {
    const q = searchParams.q.toLowerCase()
    profiles = profiles.filter(p => p.nom.toLowerCase().includes(q) || p.tagline?.toLowerCase().includes(q) || p.ville?.nom.toLowerCase().includes(q))
  }

  const S: React.CSSProperties = { color: '#7c8590', textDecoration: 'none', fontSize: '.83rem' }
  const SA: React.CSSProperties = { ...S, color: '#fb7185' }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '40px 0 28px', background: 'linear-gradient(135deg,rgba(225,29,72,.06),transparent)', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 32 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#3e444d', fontSize: '.78rem' }}>Accueil › <span style={{ color: '#fb7185' }}>Annonces</span></span>
          <h1 style={{ fontSize: '2.2rem', color: 'white', marginTop: 8, marginBottom: 6 }}>Toutes les annonces</h1>
          <p style={{ color: '#7c8590', fontSize: '.9rem' }}>{profiles.length} profil{profiles.length > 1 ? 's' : ''} vérifiés à travers le Québec</p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: 24, alignItems: 'start' }}>
        <aside style={{ position: 'sticky', top: 120 }}>
          <form method="get" style={{ marginBottom: 14 }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7c8590' }}>🔍</span>
              <input name="q" defaultValue={searchParams.q} placeholder="Rechercher..."
                style={{ width: '100%', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 12, padding: '9px 12px 9px 34px', color: 'white', fontFamily: "'Figtree',sans-serif", fontSize: '.83rem', outline: 'none' }} />
            </div>
          </form>

          <div style={{ background: 'rgba(21,25,32,.8)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <span style={{ color: '#7c8590', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>🏙️ Villes</span>
            <Link href="/annonces" style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)', ...(searchParams.city ? S : SA) }}>
              <span>Toutes</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{allProfiles.length}</span>
            </Link>
            {cities.map(c => (
              <Link key={c._id} href={`/annonces?city=${c.slug.current}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)', ...(searchParams.city === c.slug.current ? SA : S) }}>
                <span>📍 {c.nom}</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{c.profileCount || 0}</span>
              </Link>
            ))}
          </div>

          <div style={{ background: 'rgba(21,25,32,.8)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 16 }}>
            <span style={{ color: '#7c8590', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>💝 Catégories</span>
            <Link href="/annonces" style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)', ...(searchParams.cat ? S : SA) }}>
              <span>Toutes</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{allProfiles.length}</span>
            </Link>
            {cats.map(c => (
              <Link key={c._id} href={`/annonces?cat=${c.slug.current}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,.04)', ...(searchParams.cat === c.slug.current ? SA : S) }}>
                <span>{c.emoji} {c.nom}</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{c.profileCount || 0}</span>
              </Link>
            ))}
          </div>
        </aside>

        <div>
          <p style={{ color: 'white', fontWeight: 600, marginBottom: 20 }}>{profiles.length} profil{profiles.length > 1 ? 's' : ''} trouvé{profiles.length > 1 ? 's' : ''}</p>
          {profiles.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18 }}>
              {profiles.map(p => <ProfileCard key={p._id} p={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#7c8590' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
              <p>Aucun profil trouvé. Importez des profils via Sanity Studio.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
