import Link from 'next/link'

export default function Navbar() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(12,15,20,.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255,255,255,.06)'
    }}>
      <div style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>

        {/* LOGO + TITLE */}
        <Link href="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none'
        }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'linear-gradient(135deg,#e11d48,#9f1239)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1rem'
          }}>
            ❤️
          </div>

          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#fb7185'
          }}>
            Quebec Rencontre X
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24
        }}>
          <Link href="/" style={navStyle}>🏠 Accueil</Link>
          <Link href="/annonces" style={navStyle}>🖤 Annonces</Link>
          <Link href="/regions" style={navStyle}>📍 Régions</Link>
          <Link href="/tags" style={navStyle}>🏷 Tags</Link>
          <Link href="/blog" style={navStyle}>📰 Blog</Link>
        </nav>

        {/* RIGHT SIDE */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14
        }}>
          <span style={{
            background: 'rgba(34,197,94,.12)',
            border: '1px solid rgba(34,197,94,.3)',
            color: '#22c55e',
            fontSize: '.75rem',
            padding: '4px 10px',
            borderRadius: 50,
            fontWeight: 600
          }}>
            109 en ligne
          </span>

          <Link href="/rejoindre" style={{
            background: 'linear-gradient(135deg,#e11d48,#9f1239)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: 50,
            fontWeight: 600,
            fontSize: '.85rem',
            textDecoration: 'none'
          }}>
            Rejoindre
          </Link>
        </div>
      </div>
    </header>
  )
}

const navStyle = {
  color: '#d1d5db',
  fontSize: '.85rem',
  textDecoration: 'none',
  fontWeight: 500
}