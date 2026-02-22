import type { Metadata } from 'next'
import { client, PROFILES_BY_CITY_QUERY, ALL_CITIES_QUERY, ALL_CATEGORIES_QUERY, CITY_BY_SLUG_QUERY } from '@/lib/sanity'
import ProfileCard from '@/components/ProfileCard'
import Link from 'next/link'
import type { Profile, Ville, Categorie } from '@/lib/types'

export const revalidate = 60

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const city: Ville = await client.fetch(CITY_BY_SLUG_QUERY, { slug: params.slug })
    if (!city) return { title: 'Région' }
    const title = `Rencontres à ${city.nom} – Célibataires ${city.nom}, Québec`
    const desc = `Trouvez des célibataires vérifiés à ${city.nom}. Profils authentiques pour des rencontres sérieuses ou légères dans la région de ${city.nom}, ${city.region}. Inscrivez-vous gratuitement.`
    return { title, description: desc, openGraph: { title, description: desc } }
  } catch (e) { return { title: 'Région' } }
}

export default async function RegionPage({ params, searchParams }: { params: { slug: string }; searchParams: { cat?: string } }) {
  let profiles: Profile[] = []
  let cities: Ville[] = []
  let cats: Categorie[] = []
  try {
    ;[profiles, cities, cats] = await Promise.all([
      client.fetch(PROFILES_BY_CITY_QUERY, { citySlug: params.slug }),
      client.fetch(ALL_CITIES_QUERY),
      client.fetch(ALL_CATEGORIES_QUERY),
    ])
  } catch (e) {}

  const city = cities.find(c => c.slug.current === params.slug)
  const filtered = searchParams.cat ? profiles.filter(p => p.categorie?.slug.current === searchParams.cat) : profiles
  const S: React.CSSProperties = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,.04)', color: '#7c8590', fontSize: '.83rem', textDecoration: 'none' }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '40px 0 28px', background: 'linear-gradient(135deg,rgba(225,29,72,.06),transparent)', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 32 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#3e444d', fontSize: '.78rem' }}>Accueil › <Link href="/regions" style={{ color: '#7c8590', textDecoration: 'none' }}>Régions</Link> › <span style={{ color: '#fb7185' }}>{city?.nom || params.slug}</span></span>
          <h1 style={{ fontSize: '2.2rem', color: 'white', marginTop: 8, marginBottom: 6 }}>Célibataires à {city?.nom || params.slug}</h1>
          <p style={{ color: '#7c8590', fontSize: '.9rem' }}>{profiles.length} profil{profiles.length !== 1 ? 's' : ''} dans cette région</p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px', display: 'grid', gridTemplateColumns: '220px 1fr', gap: 24 }}>
        <aside style={{ position: 'sticky', top: 120 }}>
          <div style={{ background: 'rgba(21,25,32,.8)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 16, marginBottom: 12 }}>
            <span style={{ color: '#7c8590', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>Filtrer par catégorie</span>
            <Link href={`/regions/${params.slug}`} style={{ ...S, color: !searchParams.cat ? '#fb7185' : '#7c8590' }}>
              <span>Toutes</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{profiles.length}</span>
            </Link>
            {cats.map(c => {
              const count = profiles.filter(p => p.categorie?.slug.current === c.slug.current).length
              return (
                <Link key={c._id} href={`/regions/${params.slug}?cat=${c.slug.current}`} style={{ ...S, color: searchParams.cat === c.slug.current ? '#fb7185' : '#7c8590' }}>
                  <span>{c.emoji} {c.nom}</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{count}</span>
                </Link>
              )
            })}
          </div>
          <div style={{ background: 'rgba(21,25,32,.8)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 14, padding: 16 }}>
            <span style={{ color: '#7c8590', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10, display: 'block' }}>Autres villes</span>
            {cities.filter(c => c.slug.current !== params.slug).map(c => (
              <Link key={c._id} href={`/regions/${c.slug.current}`} style={S}>
                <span>📍 {c.nom}</span><span style={{ fontSize: '.68rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{c.profileCount || 0}</span>
              </Link>
            ))}
          </div>
        </aside>
        <div>
          <p style={{ color: 'white', fontWeight: 600, marginBottom: 20 }}>{filtered.length} profil{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}</p>
          {filtered.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 18 }}>
              {filtered.map(p => <ProfileCard key={p._id} p={p} />)}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#7c8590' }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
              <p>Aucun profil pour cette combinaison.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
