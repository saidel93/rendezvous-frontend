import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,.06)', padding: '50px 0 28px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 40, marginBottom: 32 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.35rem', fontWeight: 700, background: 'linear-gradient(135deg,#fb7185,#e11d48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 }}>RendezVous Québec</div>
            <p style={{ color: '#7c8590', fontSize: '.83rem', lineHeight: 1.7 }}>Connecter de vraies personnes pour de vraies relations à travers le Québec.</p>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '.7rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Figtree',sans-serif" }}>Explorer</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['/annonces|Annonces', '/regions|Régions', '/categories|Catégories', '/tags|Tags'].map(item => {
                const [href, label] = item.split('|')
                return <Link key={href} href={href} style={{ color: '#7c8590', textDecoration: 'none', fontSize: '.82rem' }}>{label}</Link>
              })}
            </div>
          </div>
          <div>
            <h4 style={{ color: 'white', fontSize: '.7rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Figtree',sans-serif" }}>Légal</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {["Politique de confidentialité", "Conditions d'utilisation", "Divulgation d'affiliation"].map(l => (
                <a key={l} href="#" style={{ color: '#7c8590', textDecoration: 'none', fontSize: '.82rem' }}>{l}</a>
              ))}
            </div>
          </div>
        </div>
        <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ color: '#3e444d', fontSize: '.73rem', lineHeight: 1.6 }}>⚠️ <strong style={{ color: '#fbbf24' }}>Divulgation d'affiliation :</strong> Ce site contient des liens d'affiliation. Nous pouvons recevoir une compensation pour les références. Les profils sont à titre illustratif. Pour adultes 18+ seulement.</p>
        </div>
        <div style={{ textAlign: 'center', color: '#3e444d', fontSize: '.74rem', paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          © {new Date().getFullYear()} RendezVous Québec. Tous droits réservés. Pour adultes 18+
        </div>
      </div>
    </footer>
  )
}
