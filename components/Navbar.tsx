'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { client, ALL_CITIES_QUERY, ALL_CATEGORIES_QUERY } from '@/lib/sanity'
import type { Ville, Categorie } from '@/lib/types'

export default function Navbar() {
  const [cities, setCities]         = useState<Ville[]>([])
  const [cats, setCats]             = useState<Categorie[]>([])
  const [open, setOpen]             = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [q, setQ]                   = useState('')
  const [onlineCount] = useState(() => Math.floor(Math.random() * 71) + 50))

  useEffect(() => {
    client.fetch(ALL_CITIES_QUERY).then(setCities).catch(() => {})
    client.fetch(ALL_CATEGORIES_QUERY).then(setCats).catch(() => {})
    const handler = (e: MouseEvent) => {
      if (!(e.target as Element).closest('[data-dropdown]')) setOpen('')
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const close = () => { setOpen(''); setMobileOpen(false) }

  const topBar: React.CSSProperties = {
    background: 'rgba(8,10,16,.99)',
    backdropFilter: 'blur(24px)',
    borderBottom: '1px solid rgba(255,255,255,.09)',
  }
  const inner: React.CSSProperties = {
    maxWidth: 1280,
    margin: '0 auto',
    padding: '0 20px',
    height: 68,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
  }

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 200, width: '100%' }}>

      {/* ── TOP BAR ──────────────────────────────────────────────────────── */}
      <div style={topBar}>
        <div style={inner}>

          {/* Logo */}
          <Link href="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#fb7185,#9f1239)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, boxShadow: '0 4px 18px rgba(225,29,72,.45)', flexShrink: 0 }}>❤️</span>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.25rem', fontWeight: 700, background: 'linear-gradient(135deg,#fb7185,#e11d48,#c9913a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', whiteSpace: 'nowrap' }}>
              RendezVous Québec
            </span>
          </Link>

          {/* Search bar – hidden on mobile via CSS class */}
          <div className="nav-search" style={{ flex: 1, maxWidth: 340, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }}>🔍</span>
            <input
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Rechercher un profil, une ville..."
              onKeyDown={e => {
                if (e.key === 'Enter' && q.trim()) {
                  window.location.href = `/annonces?q=${encodeURIComponent(q)}`
                  setQ('')
                }
              }}
              style={{ width: '100%', background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.11)', borderRadius: 50, padding: '9px 16px 9px 38px', color: 'white', fontFamily: "'Figtree',sans-serif", fontSize: '.85rem', outline: 'none' }}
            />
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>

            {/* Online badge – hidden on mobile */}
            <div className="nav-online" style={{ alignItems: 'center', gap: 6, background: 'rgba(34,197,94,.09)', border: '1px solid rgba(34,197,94,.28)', borderRadius: 50, padding: '6px 13px', fontSize: '.77rem', color: '#86efac', fontWeight: 600, whiteSpace: 'nowrap' }}>
              <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block', marginRight: 4 }} />
             {onlineCount} en ligne
            </div>

            {/* CTA */}
            <Link href="/annonces" className="nav-btn" style={{ background: 'linear-gradient(135deg,#e11d48,#9f1239)', boxShadow: '0 4px 18px rgba(225,29,72,.38)', color: '#fff', fontWeight: 700, padding: '9px 22px', borderRadius: 50, fontSize: '.85rem', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Rejoindre
            </Link>

            {/* Hamburger – shown on mobile only */}
            <button
              className="nav-hamburger"
              onClick={() => setMobileOpen(v => !v)}
              aria-label="Menu"
              style={{ flexDirection: 'column', justifyContent: 'center', gap: 5, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 8, padding: '9px 11px', cursor: 'pointer', width: 42, height: 42 }}
            >
              <span style={{ width: 18, height: 2, background: mobileOpen ? '#fb7185' : 'white', borderRadius: 2, display: 'block', transition: 'background .2s' }} />
              <span style={{ width: 18, height: 2, background: mobileOpen ? '#fb7185' : 'white', borderRadius: 2, display: 'block', transition: 'background .2s' }} />
              <span style={{ width: 13, height: 2, background: mobileOpen ? '#fb7185' : 'white', borderRadius: 2, display: 'block', transition: 'background .2s' }} />
            </button>
          </div>
        </div>
      </div>

      {/* ── DESKTOP BOTTOM NAV ────────────────────────────────────────────── */}
      <div className="nav-bottom" style={{ background: 'rgba(8,10,16,.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 44, display: 'flex', alignItems: 'center' }}>

          <Link href="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 44, borderRight: '1px solid rgba(255,255,255,.05)', color: '#9ba3af', fontSize: '.82rem', fontWeight: 500, textDecoration: 'none' }}>
            🏠 Accueil
          </Link>
          <Link href="/annonces" className="nav-link" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 44, borderRight: '1px solid rgba(255,255,255,.05)', color: '#9ba3af', fontSize: '.82rem', fontWeight: 500, textDecoration: 'none' }}>
            ❤ Annonces
          </Link>

          {/* Régions dropdown */}
          <div data-dropdown="reg" style={{ position: 'relative', height: 44, display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setOpen(open === 'reg' ? '' : 'reg')}
              style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '0 16px', height: 44, background: 'transparent', border: 'none', borderRight: '1px solid rgba(255,255,255,.05)', color: open === 'reg' ? '#fb7185' : '#9ba3af', fontSize: '.82rem', fontWeight: 500, cursor: 'pointer', fontFamily: "'Figtree',sans-serif" }}
            >
              📍 Régions <span style={{ fontSize: '.6rem' }}>▾</span>
            </button>
            {open === 'reg' && (
              <div className="dropdown-panel" style={{ position: 'absolute', top: '100%', left: 0, background: '#0e1118', border: '1px solid rgba(255,255,255,.1)', borderTop: '2px solid #e11d48', borderRadius: '0 0 14px 14px', minWidth: 240, zIndex: 400, paddingBottom: 8, boxShadow: '0 24px 60px rgba(0,0,0,.7)' }}>
                <div style={{ color: '#4b5563', fontSize: '.63rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '12px 16px 6px' }}>Villes du Québec</div>
                {cities.map(c => (
                  <Link key={c._id} href={`/regions/${c.slug.current}`} onClick={close} className="dropdown-link" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 16px', color: '#9ba3af', fontSize: '.84rem', textDecoration: 'none' }}>
                    <span>📍 {c.nom}</span>
                    <span style={{ fontSize: '.69rem', background: 'rgba(225,29,72,.12)', border: '1px solid rgba(225,29,72,.25)', color: '#fb7185', borderRadius: 50, padding: '1px 8px' }}>{c.profileCount || 0}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        

          <Link href="/tags" className="nav-link" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 44, color: '#9ba3af', fontSize: '.82rem', fontWeight: 500, textDecoration: 'none' }}>🏷️ Tags</Link>
          <Link href="/legal" className="nav-link" style={{ display: 'flex', alignItems: 'center', padding: '0 16px', height: 44, color: '#9ba3af', fontSize: '.82rem', fontWeight: 500, textDecoration: 'none' }}>⚖️ Légal</Link>
        </div>
      </div>

      {/* ── MOBILE FULL-SCREEN MENU ───────────────────────────────────────── */}
      <div
        className={`mobile-menu${mobileOpen ? ' is-open' : ''}`}
        style={{ position: 'fixed', top: 68, left: 0, right: 0, bottom: 0, background: '#080a10', zIndex: 199, flexDirection: 'column', overflowY: 'auto' }}
      >
        {/* Mobile search */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }}>🔍</span>
            <input
              placeholder="Rechercher..."
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  window.location.href = `/annonces?q=${encodeURIComponent(e.currentTarget.value)}`
                  close()
                }
              }}
              style={{ width: '100%', background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12, padding: '11px 16px 11px 38px', color: 'white', fontFamily: "'Figtree',sans-serif", fontSize: '.9rem', outline: 'none' }}
            />
          </div>
        </div>

        {/* Nav links */}
        {[
          { href: '/',           label: '🏠 Accueil' },
          { href: '/annonces',   label: '❤ Toutes les annonces' },
          { href: '/regions',    label: '📍 Toutes les régions' },
          { href: '/categories', label: '💝 Toutes les catégories' },
          { href: '/tags',       label: '🏷️ Tags' },
          { href: '/legal',      label: '⚖️ Informations légales' },
        ].map(item => (
          <Link key={item.href} href={item.href} onClick={close} style={{ display: 'flex', alignItems: 'center', padding: '15px 24px', color: '#d1d5db', fontSize: '1rem', fontWeight: 500, textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,.05)' }}>
            {item.label}
          </Link>
        ))}

        {/* Cities chips */}
        {cities.length > 0 && (
          <div style={{ padding: '16px 24px 8px' }}>
            <p style={{ color: '#4b5563', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Villes</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {cities.map(c => (
                <Link key={c._id} href={`/regions/${c.slug.current}`} onClick={close} style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.09)', borderRadius: 50, padding: '7px 15px', color: '#9ba3af', fontSize: '.83rem', textDecoration: 'none' }}>
                  📍 {c.nom}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{ padding: '20px 24px 32px' }}>
          <Link href="/annonces" onClick={close} style={{ display: 'block', textAlign: 'center', background: 'linear-gradient(135deg,#e11d48,#9f1239)', color: '#fff', fontWeight: 700, padding: '15px', borderRadius: 14, fontSize: '1rem', textDecoration: 'none', boxShadow: '0 4px 20px rgba(225,29,72,.4)' }}>
            ❤ Parcourir les profils
          </Link>
        </div>
      </div>

    </nav>
  )
}