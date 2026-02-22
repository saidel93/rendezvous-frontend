import Link from 'next/link'
import { getPhotoSrc } from '@/lib/sanity'
import type { Profile } from '@/lib/types'

export default function ProfileCard({ p }: { p: Profile }) {
  if (!p?.slug?.current) return null

  const photo = getPhotoSrc(p)
  return (
    <Link href={`/profil/${p.slug.current}`} style={{ textDecoration: 'none', display: 'block', borderRadius: 10, overflow: 'hidden', background: 'rgba(21,25,32,.85)', border: '1px solid rgba(255,255,255,.07)', transition: 'transform .2s,box-shadow .2s', position: 'relative' }}>

      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
        <img
          src={photo}
          alt={`${p.nom || 'Profil'}, ${p.age || ''} ans`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,15,20,1) 0%, rgba(12,15,20,.35) 50%, transparent 100%)' }} />

        {/* Top badges */}
        <div style={{ position: 'absolute', top: 6, left: 6, right: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {p.online && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 3, background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.35)', borderRadius: 50, padding: '2px 6px', fontSize: '.6rem', color: '#86efac', fontWeight: 600 }}>
              <span style={{ width: 5, height: 5, background: '#22c55e', borderRadius: '50%' }} /> En ligne
            </span>
          )}
          {p.vedette && (
            <span style={{ marginLeft: 'auto', background: 'rgba(201,145,58,.2)', border: '1px solid rgba(201,145,58,.4)', borderRadius: 50, padding: '2px 6px', fontSize: '.6rem', color: '#e8b96a', fontWeight: 600 }}>★</span>
          )}
        </div>

        {/* Bottom info on photo */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 8px 7px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 1 }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '.95rem', fontWeight: 700, color: 'white' }}>{p.nom}</span>
            <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '.75rem' }}>{p.age}</span>
          </div>
          {p.ville && (
            <div style={{ fontSize: '.63rem', color: 'rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', gap: 2 }}>
              📍 {p.ville.nom}
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div style={{ padding: '6px 8px 8px' }}>
        <p style={{ color: '#7c8590', fontSize: '.68rem', lineHeight: 1.4, marginBottom: 5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {p.tagline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {p.categorie && (
            <span style={{ fontSize: '.58rem', background: 'rgba(225,29,72,.08)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '2px 6px' }}>
              {p.categorie.emoji} {p.categorie.nom}
            </span>
          )}
          {p.verifie?.photo && (
            <span style={{ fontSize: '.58rem', background: 'rgba(201,145,58,.1)', border: '1px solid rgba(201,145,58,.3)', color: '#e8b96a', borderRadius: 50, padding: '2px 6px' }}>✓</span>
          )}
        </div>
      </div>

    </Link>
  )
}