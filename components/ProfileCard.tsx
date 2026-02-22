import Link from 'next/link'
import { getPhotoSrc } from '@/lib/sanity'
import type { Profile } from '@/lib/types'

export default function ProfileCard({ p }: { p: Profile }) {
  const photo = getPhotoSrc(p)
  return (
    <Link href={`/profil/${p.slug.current}`} style={{ textDecoration: 'none', display: 'block', borderRadius: 16, overflow: 'hidden', background: 'rgba(21,25,32,.85)', border: '1px solid rgba(255,255,255,.07)', transition: 'transform .2s,box-shadow .2s', position: 'relative' }}>
      {/* Photo */}
      <div style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
        <img
          src={photo}
          alt={`${p.nom}, ${p.age} ans`}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,15,20,1) 0%, rgba(12,15,20,.4) 45%, transparent 100%)' }} />

        {/* Top badges */}
        <div style={{ position: 'absolute', top: 10, left: 10, right: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {p.online && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(34,197,94,.15)', border: '1px solid rgba(34,197,94,.35)', borderRadius: 50, padding: '3px 8px', fontSize: '.68rem', color: '#86efac', fontWeight: 600 }}>
              <span style={{ width: 6, height: 6, background: '#22c55e', borderRadius: '50%' }} /> En ligne
            </span>
          )}
          {p.vedette && (
            <span style={{ marginLeft: 'auto', background: 'rgba(201,145,58,.2)', border: '1px solid rgba(201,145,58,.4)', borderRadius: 50, padding: '3px 8px', fontSize: '.68rem', color: '#e8b96a', fontWeight: 600 }}>★ Vedette</span>
          )}
        </div>

        {/* Bottom info on photo */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '12px 14px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 2 }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.15rem', fontWeight: 700, color: 'white' }}>{p.nom}</span>
            <span style={{ color: 'rgba(255,255,255,.7)', fontSize: '.9rem' }}>{p.age} ans</span>
          </div>
          {p.ville && (
            <div style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', gap: 4 }}>
              📍 {p.ville.nom}
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div style={{ padding: '10px 14px 14px' }}>
        <p style={{ color: '#7c8590', fontSize: '.78rem', lineHeight: 1.5, marginBottom: 8, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {p.tagline}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {p.verifie?.photo && <span style={{ fontSize: '.65rem', background: 'rgba(201,145,58,.1)', border: '1px solid rgba(201,145,58,.3)', color: '#e8b96a', borderRadius: 50, padding: '2px 7px' }}>✓ Photo</span>}
          {p.verifie?.premium && <span style={{ fontSize: '.65rem', background: 'rgba(168,85,247,.1)', border: '1px solid rgba(168,85,247,.3)', color: '#d8b4fe', borderRadius: 50, padding: '2px 7px' }}>★ Premium</span>}
          {p.categorie && <span style={{ fontSize: '.65rem', background: 'rgba(225,29,72,.08)', border: '1px solid rgba(225,29,72,.2)', color: '#fb7185', borderRadius: 50, padding: '2px 7px' }}>{p.categorie.emoji} {p.categorie.nom}</span>}
        </div>
      </div>
    </Link>
  )
}
