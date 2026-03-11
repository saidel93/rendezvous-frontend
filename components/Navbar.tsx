'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { client, ALL_CITIES_QUERY } from '@/lib/sanity'
import type { Ville } from '@/lib/types'

export default function Navbar({
  dict,
}: {
  dict: Record<string, string>
}) {
  const [cities, setCities] = useState<Ville[]>([])
  const [mobileOpen, setMobileOpen] = useState(false)
  const [q, setQ] = useState('')
  const [onlineCount, setOnlineCount] = useState<number | null>(null)

  useEffect(() => {
    client.fetch(ALL_CITIES_QUERY).then(setCities).catch(() => {})
    setOnlineCount(Math.floor(Math.random() * 71) + 50)
  }, [])

  const close = () => setMobileOpen(false)

  const t = (key: string, fallback: string) =>
    dict?.[key] || fallback

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

      {/* TOP BAR */}
      <div style={topBar}>
        <div style={inner}>

          {/* Logo */}
          <Link
            href="/"
            onClick={close}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#fb7185,#9f1239)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 16,
                boxShadow: '0 4px 18px rgba(225,29,72,.45)',
              }}
            >
              ❤️
            </span>

            <span
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: '1.25rem',
                fontWeight: 700,
                background:
                  'linear-gradient(135deg,#fb7185,#e11d48,#c9913a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                whiteSpace: 'nowrap',
              }}
            >
              {t('site_name', 'Putas Madrid X')}
            </span>
          </Link>

          {/* Search */}
          <div style={{ flex: 1, maxWidth: 340, position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: 13,
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280',
              }}
            >
              🔍
            </span>

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t(
                'search_placeholder',
                'Buscar perfil o ciudad...'
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && q.trim()) {
                  window.location.href = `/anuncios?q=${encodeURIComponent(q)}`
                  setQ('')
                }
              }}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.11)',
                borderRadius: 50,
                padding: '9px 16px 9px 38px',
                color: 'white',
                fontSize: '.85rem',
                outline: 'none',
              }}
            />
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                background: 'rgba(34,197,94,.09)',
                border: '1px solid rgba(34,197,94,.28)',
                borderRadius: 50,
                padding: '6px 13px',
                fontSize: '.77rem',
                color: '#86efac',
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: '#22c55e',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: 4,
                }}
              />
              <span suppressHydrationWarning>
                {onlineCount !== null
                  ? `${onlineCount} ${t('online_label', 'en línea')}`
                  : '...'}
              </span>
            </div>

            <Link
              href="/anuncios"
              style={{
                background:
                  'linear-gradient(135deg,#e11d48,#9f1239)',
                boxShadow:
                  '0 4px 18px rgba(225,29,72,.38)',
                color: '#fff',
                fontWeight: 700,
                padding: '9px 22px',
                borderRadius: 50,
                fontSize: '.85rem',
                textDecoration: 'none',
              }}
            >
              {t('join_button', 'Entrar')}
            </Link>

            <button
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.12)',
                borderRadius: 8,
                padding: '9px 11px',
                cursor: 'pointer',
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP NAV */}
      <div
        style={{
          background: 'rgba(8,10,16,.95)',
          borderBottom: '1px solid rgba(255,255,255,.05)',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 20px',
            height: 44,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Link href="/" style={navLink}>
            🏠 {t('header_home', 'Inicio')}
          </Link>
          <Link href="/anuncios" style={navLink}>
            ❤ {t('header_annonces', 'Anuncios')}
          </Link>
          <Link href="/regiones" style={navLink}>
            📍 {t('header_regions', 'Regiones')}
          </Link>
          <Link href="/categorias" style={navLink}>
            💖 {t('header_categories', 'Categorías')}
          </Link>
          <Link href="/blog" style={navLink}>
            📝 {t('header_blog', 'Blog')}
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: 68,
            left: 0,
            right: 0,
            bottom: 0,
            background: '#080a10',
            zIndex: 199,
            overflowY: 'auto',
          }}
        >
          {[
            { href: '/', key: 'header_home', fallback: 'Inicio', icon: '🏠' },
            { href: '/anuncios', key: 'header_annonces', fallback: 'Anuncios', icon: '❤' },
            { href: '/regiones', key: 'header_regions', fallback: 'Regiones', icon: '📍' },
            { href: '/categorias', key: 'header_categories', fallback: 'Categorías', icon: '💖' },
            { href: '/blog', key: 'header_blog', fallback: 'Blog', icon: '📝' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={close}
              style={{
                display: 'block',
                padding: '16px 24px',
                color: '#d1d5db',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,.05)',
              }}
            >
              {item.icon} {t(item.key, item.fallback)}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

const navLink: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 16px',
  height: 44,
  borderRight: '1px solid rgba(255,255,255,.05)',
  color: '#9ba3af',
  fontSize: '.82rem',
  fontWeight: 500,
  textDecoration: 'none',
}