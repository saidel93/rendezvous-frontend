import type { Metadata } from 'next'
import { client, ALL_CITIES_QUERY } from '@/lib/sanity'
import Link from 'next/link'
import type { Ville } from '@/lib/types'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Rencontres par région au Québec',
  description: 'Trouvez des célibataires près de chez vous. Explorez les profils de rencontres par région : Montréal, Québec, Laval, Gatineau, Sherbrooke et partout au Québec.',
  openGraph: { title: 'Rencontres par région au Québec', description: 'Trouvez des célibataires près de chez vous à travers tout le Québec.' },
}

export default async function RegionsPage() {
  let cities: Ville[] = []
  try { cities = await client.fetch(ALL_CITIES_QUERY) } catch (e) {}
  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ padding: '40px 0 28px', background: 'linear-gradient(135deg,rgba(225,29,72,.06),transparent)', borderBottom: '1px solid rgba(255,255,255,.06)', marginBottom: 40 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
          <span style={{ color: '#3e444d', fontSize: '.78rem' }}>Accueil › <span style={{ color: '#fb7185' }}>Régions</span></span>
          <h1 style={{ fontSize: '2.2rem', color: 'white', marginTop: 8, marginBottom: 6 }}>Rencontres par région</h1>
          <p style={{ color: '#7c8590', fontSize: '.9rem' }}>Trouvez des célibataires près de chez vous</p>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: 16 }}>
          {cities.map(c => (
            <Link key={c._id} href={`/regions/${c.slug.current}`} style={{ background: 'rgba(21,25,32,.85)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: 24, textAlign: 'center', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>📍</div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: 4 }}>{c.nom}</div>
              <div style={{ color: '#7c8590', fontSize: '.78rem', marginBottom: 10 }}>{c.region}</div>
              <span style={{ fontSize: '.72rem', background: 'rgba(225,29,72,.1)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '3px 10px', fontWeight: 700 }}>{c.profileCount || 0} profils</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
