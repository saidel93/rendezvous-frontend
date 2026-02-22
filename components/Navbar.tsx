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

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 200 }}>
      {/* Top bar */}
      <div style={{ background: 'rgba(12,15,20,.97)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 62, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#fb7185,#9f1239)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, boxShadow: '0 4px 16px rgba(225,29,72,.4)' }}>❤️</div>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', fontWeight: 700, background: 'linear-gradient(135deg,#fb7185,#e11d48,#c9913a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>RendezVous Québec</span>
          </Link>
          <div style={{ flex: 1, maxWidth: 340, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#7c8590' }}>🔍</span>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Rechercher un profil, une ville..."
              onKeyDown={e => { if (e.key === 'Enter' && q.trim()) { window.location.href = `/annonces?q=${encodeURIComponent(q)}`; setQ('') } }}
              style={{ width: '100%', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 50, padding: '8px 16px 8px 36px', color: 'white', fontFamily: "'Figtree',sans-serif", fontSize: '.85rem', outline: 'none' }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', borderRadius: 50, padding: '5px 12px', fontSize: '.78rem', color: '#86efac', fontWeight: 600 }}>
              <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
              <span>87 en ligne</span>
            </div>
            <Link href="/annonces" style={{ background: 'linear-gradient(135deg,#e11d48,#9f1239)', boxShadow: '0 4px 16px rgba(225,29,72,.35)', color: '#fff', fontWeight: 600, padding: '8px 20px', borderRadius: 50, fontSize: '.85rem', textDecoration: 'none' }}>Rejoindre</Link>
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ background: 'rgba(12,15,20,.92)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.04)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 46, display: 'flex', alignItems: 'center' }}>
          {[{ href: '/', label: '🏠 Accueil' }, { href: '/annonces', label: '❤ Annonces' }].map(item => (
            <Link key={item.href} href={item.href} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', height: 46, borderRight: '1px solid rgba(255,255,255,.05)', color: '#7c8590', fontSize: '.83rem', fontWeight: 500, textDecoration: 'none' }}>
              {item.label}
            </Link>
          ))}

          {/* Régions */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setOpen(open === 'reg' ? null : 'reg')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', height: 46, borderRight: '1px solid rgba(255,255,255,.05)', background: 'transparent', border: 'none', borderRight: '1px solid rgba(255,255,255,.05)', color: open === 'reg' ? 'white' : '#7c8590', fontSize: '.83rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Figtree',sans-serif" }}>
              📍 Régions ▾
            </button>
            {open === 'reg' && (
              <div style={{ position: 'absolute', top: '100%', left: 0, background: 'rgba(21,25,32,.99)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '0 0 16px 16px', minWidth: 230, zIndex: 300, padding: '8px 0', boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}>
                <div style={{ color: '#3e444d', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '10px 16px 6px' }}>Villes du Québec</div>
                {cities.map(c => (
                  <Link key={c._id} href={`/regions/${c.slug.current}`} onClick={close} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 16px', color: '#7c8590', fontSize: '.84rem', textDecoration: 'none' }}>
                    <span>📍 {c.nom}</span>
                    <span style={{ fontSize: '.7rem', background: 'rgba(225,29,72,.15)', border: '1px solid rgba(225,29,72,.25)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{c.profileCount || 0}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Catégories */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setOpen(open === 'cat' ? null : 'cat')} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0 16px', height: 46, background: 'transparent', border: 'none', borderRight: '1px solid rgba(255,255,255,.05)', color: open === 'cat' ? 'white' : '#7c8590', fontSize: '.83rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Figtree',sans-serif" }}>
              💝 Catégories ▾
            </button>
            {open === 'cat' && (
              <div style={{ position: 'absolute', top: '100%', left: 0, background: 'rgba(21,25,32,.99)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,.07)', borderRadius: '0 0 16px 16px', minWidth: 250, zIndex: 300, padding: '8px 0', boxShadow: '0 20px 60px rgba(0,0,0,.5)' }}>
                <div style={{ color: '#3e444d', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '10px 16px 6px' }}>Type de rencontre</div>
                {cats.map(c => (
                  <Link key={c._id} href={`/categories/${c.slug.current}`} onClick={close} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 16px', color: '#7c8590', fontSize: '.84rem', textDecoration: 'none' }}>
                    <span>{c.emoji} {c.nom}</span>
                    <span style={{ fontSize: '.7rem', background: 'rgba(225,29,72,.15)', border: '1px solid rgba(225,29,72,.25)', color: '#fb7185', borderRadius: 50, padding: '1px 7px' }}>{c.profileCount || 0}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/tags" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 46, color: '#7c8590', fontSize: '.83rem', fontWeight: 500, textDecoration: 'none' }}>🏷️ Tags</Link>
        </div>
      </div>
    </nav>
  )
}
