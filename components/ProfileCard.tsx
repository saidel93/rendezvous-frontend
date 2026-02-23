import Link from 'next/link'
import { getPhotoSrc } from '@/lib/sanity'
import type { Profile } from '@/lib/types'

export default function ProfileCard({ p }: { p: Profile }) {
  if (!p?.slug?.current) return null

  const photo = getPhotoSrc(p)

  return (
    <Link
      href={`/profil/${p.slug.current}`}
      style={{
        textDecoration: 'none',
        display: 'block',
        borderRadius: 10,
        overflow: 'hidden',
        background: 'rgba(21,25,32,.95)',
        border: '1px solid rgba(255,255,255,.06)',
        transition: 'transform .15s ease',
        position: 'relative'
      }}
    >
      {/* Smaller photo */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1', // square → much smaller height
          overflow: 'hidden'
        }}
      >
        <img
          src={photo}
          alt={`${p.nom || 'Profil'}, ${p.age || ''} ans`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Softer gradient */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(12,15,20,.9) 0%, rgba(12,15,20,.3) 50%, transparent 100%)'
          }}
        />

        {/* Compact badges */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 6,
            right: 6,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}
        >
          {p.online && (
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                background: 'rgba(34,197,94,.15)',
                borderRadius: 50,
                padding: '2px 6px',
                fontSize: '.6rem',
                color: '#86efac',
                fontWeight: 600
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  background: '#22c55e',
                  borderRadius: '50%'
                }}
              />
              En ligne
            </span>
          )}

          {p.vedette && (
            <span
              style={{
                marginLeft: 'auto',
                background: 'rgba(201,145,58,.2)',
                borderRadius: 50,
                padding: '2px 6px',
                fontSize: '.6rem',
                color: '#e8b96a',
                fontWeight: 600
              }}
            >
              ★
            </span>
          )}
        </div>

        {/* Smaller name block */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '8px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 4
            }}
          >
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '.9rem',
                fontWeight: 700,
                color: 'white',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {p.nom}
            </span>
            <span
              style={{
                color: 'rgba(255,255,255,.7)',
                fontSize: '.7rem'
              }}
            >
              {p.age}
            </span>
          </div>

          {p.ville && (
            <div
              style={{
                fontSize: '.65rem',
                color: 'rgba(255,255,255,.6)',
                marginTop: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              📍 {p.ville.nom}
            </div>
          )}
        </div>
      </div>

      {/* Much smaller bottom section */}
      <div style={{ padding: '6px 8px 8px' }}>
        <p
          style={{
            color: '#9aa3af',
            fontSize: '.7rem',
            lineHeight: 1.3,
            marginBottom: 6,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical'
          }}
        >
          {p.tagline}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {p.categorie && (
            <span
              style={{
                fontSize: '.6rem',
                background: 'rgba(225,29,72,.1)',
                color: '#fb7185',
                borderRadius: 50,
                padding: '2px 6px'
              }}
            >
              {p.categorie.emoji}
            </span>
          )}

          {p.verifie?.photo && (
            <span
              style={{
                fontSize: '.6rem',
                background: 'rgba(201,145,58,.15)',
                color: '#e8b96a',
                borderRadius: 50,
                padding: '2px 6px'
              }}
            >
              ✓
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}