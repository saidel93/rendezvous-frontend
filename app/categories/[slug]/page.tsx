import type { Metadata } from 'next'
import { client, PROFILES_BY_CAT_QUERY, ALL_CITIES_QUERY, ALL_CATEGORIES_QUERY, CAT_BY_SLUG_QUERY } from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import Link from 'next/link'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const revalidate = 60

export async function generateMetadata({ params, searchParams }: { params: { slug: string }; searchParams: { city?: string } }): Promise<Metadata> {
  try {
    const cat: Categorie = await client.fetch(CAT_BY_SLUG_QUERY, { slug: params.slug })
    if (!cat) return { title: 'Catégorie' }
    let title = cat.seoTitle || `${cat.nom} au Québec – Rencontres ${cat.emoji}`
    let desc = cat.seoDescription || cat.description || `Trouvez des célibataires pour des rencontres "${cat.nom}" au Québec. Profils vérifiés.`
    if (searchParams.city) {
      const cities: Ville[] = await client.fetch(ALL_CITIES_QUERY)
      const city = cities.find(c => c.slug.current === searchParams.city)
      if (city) { title = `${cat.nom} à ${city.nom} ${cat.emoji}`; desc = `Profils "${cat.nom}" à ${city.nom}. Rencontres authentiques dans votre ville.` }
    }
    return { title, description: desc, openGraph: { title, description: desc } }
  } catch (e) { return { title: 'Catégorie' } }
}

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }; searchParams: { city?: string } }) {
  let profiles: Profile[] = []
  let cities: Ville[] = []
  let cats: Categorie[] = []
  try {
    ;[profiles, cities, cats] = await Promise.all([
      client.fetch(PROFILES_BY_CAT_QUERY, { catSlug: params.slug }),
      client.fetch(ALL_CITIES_QUERY),
      client.fetch(ALL_CATEGORIES_QUERY),
    ])
  } catch (e) {}

  const cat = cats.find(c => c.slug.current === params.slug)
  const filtered = searchParams.city ? profiles.filter(p => p.ville?.slug.current === searchParams.city) : profiles
  const pill = (active: boolean): React.CSSProperties => ({ padding: '8px 16px', borderRadius: 50, background: active ? 'rgba(225,29,72,.15)' : 'rgba(255,255,255,.04)', border: active ? '1px solid rgba(225,29,72,.35)' : '1px solid rgba(255,255,255,.07)', color: active ? '#fb7185' : '#7c8590', fontSize: '.83rem', fontWeight: 600, textDecoration: 'none' })

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '40px 0 28px', background: 'linear-gradient(135deg,rgba(225,29,72,.06),transparent)', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 32 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#3e444d', fontSize: '.78rem' }}>Accueil › <Link href="/categories" style={{ color: '#7c8590', textDecoration: 'none' }}>Catégories</Link> › <span style={{ color: '#fb7185' }}>{cat?.nom}</span></span>
          <h1 style={{ fontSize: '2.2rem', color: 'white', marginTop: 8, marginBottom: 6 }}>{cat?.emoji} {cat?.nom || params.slug}</h1>
          {cat?.description && <p style={{ color: '#7c8590', fontSize: '.9rem' }}>{cat.description}</p>}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px' }}>
        <div style={{ background: 'rgba(21,25,32,.8)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: '20px 24px', marginBottom: 28 }}>
          <div style={{ color: '#7c8590', fontSize: '.72rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Choisissez votre ville</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Link href={`/categories/${params.slug}`} style={pill(!searchParams.city)}>Toutes ({profiles.length})</Link>
            {cities.map(c => {
              const count = profiles.filter(p => p.ville?.slug.current === c.slug.current).length
              if (!count) return null
              return <Link key={c._id} href={`/categories/${params.slug}?city=${c.slug.current}`} style={pill(searchParams.city === c.slug.current)}>📍 {c.nom} ({count})</Link>
            })}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 24, alignItems: 'start' }}>
          <div>
            <p style={{ color: 'white', fontWeight: 600, marginBottom: 20 }}>{filtered.length} profil{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}</p>
            {filtered.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18 }}>
                {filtered.map(p => <ProfileCard key={p._id} p={p} />)}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '80px 0', color: '#7c8590' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div><p>Aucun profil pour cette combinaison.</p>
              </div>
            )}
          </div>
          <aside style={{ position: 'sticky', top: 120 }}>
            <div style={{ background: 'rgba(21,25,32,.8)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 16 }}>
              <span style={{ color: '#7c8590', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>Autres catégories</span>
              {cats.filter(c => c.slug.current !== params.slug).map(c => (
                <Link key={c._id} href={`/categories/${c.slug.current}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.04)', color: '#7c8590', fontSize: '.83rem', textDecoration: 'none' }}>
                  <span>{c.emoji} {c.nom}</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{c.profileCount || 0}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
