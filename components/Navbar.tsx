'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { client, ALL_CITIES_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/sanity'
import type { Ville, Categorie } from '@/lib/types'

export default function Navbar() {
  const [cities, setCities] = useState<Ville[]>([])
  const [cats, setCats] = useState<Categorie[]>([])
  const [open, setOpen] = useState<string | null>(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    client.fetch(ALL_CITIES_QUERY).then(setCities).catch(() => {})
    client.fetch(ALL_CATEGORIES_QUERY).then(setCats).catch(() => {})
  }, [])

  const close = () => setOpen(null)

  const navButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '0 16px',
    height: 46,
    background: 'transparent',
    border: 'none',
    borderRight: '1px solid rgba(255,255,255,.05)',
    fontSize: '.83rem',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: "'Figtree',sans-serif",
  } as const

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 200 }}>

      {/* Bottom nav only (problem area simplified) */}
      <div style={{ background: 'rgba(12,15,20,.92)', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 46, display: 'flex', alignItems: 'center' }}>

          {/* Régions */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen(open === 'reg' ? null : 'reg')}
              style={{
                ...navButtonStyle,
                color: open === 'reg' ? 'white' : '#7c8590',
              }}
            >
              📍 Régions ▾
            </button>

            {open === 'reg' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'rgba(21,25,32,.99)',
                  border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: '0 0 16px 16px',
                  minWidth: 230,
                  zIndex: 300,
                  padding: '8px 0',
                }}
              >
                {cities.map(c => (
                  <Link
                    key={c._id}
                    href={`/regions/${c.slug.current}`}
                    onClick={close}
                    style={{
                      display: 'block',
                      padding: '9px 16px',
                      color: '#7c8590',
                      fontSize: '.84rem',
                      textDecoration: 'none',
                    }}
                  >
                    📍 {c.nom}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Catégories */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setOpen(open === 'cat' ? null : 'cat')}
              style={{
                ...navButtonStyle,
                color: open === 'cat' ? 'white' : '#7c8590',
              }}
            >
              💝 Catégories ▾
            </button>

            {open === 'cat' && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  background: 'rgba(21,25,32,.99)',
                  border: '1px solid rgba(255,255,255,.07)',
                  borderRadius: '0 0 16px 16px',
                  minWidth: 250,
                  zIndex: 300,
                  padding: '8px 0',
                }}
              >
                {cats.map(c => (
                  <Link
                    key={c._id}
                    href={`/categories/${c.slug.current}`}
                    onClick={close}
                    style={{
                      display: 'block',
                      padding: '9px 16px',
                      color: '#7c8590',
                      fontSize: '.84rem',
                      textDecoration: 'none',
                    }}
                  >
                    {c.emoji} {c.nom}
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  )
}