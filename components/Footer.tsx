import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '52px 0 28px', marginTop: 60 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 36 }}>
          
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(135deg,#fb7185,#e11d48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 }}>
              Putas Madrid X
            </div>

            <p style={{ color: '#6b7280', fontSize: '.82rem', lineHeight: 1.7 }}>
              Directorio de encuentros para adultos en Madrid y toda España.
              Sitio de afiliación para mayores de 18 años.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Figtree',sans-serif" }}>
              Explorar
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { href: '/anuncios', label: '❤ Anuncios' },
                { href: '/regiones', label: '📍 Regiones' },
                { href: '/categorias', label: '💝 Categorías' },
                { href: '/blog', label: '📝 Blog' },
                { href: '/tags', label: '🏷️ Etiquetas' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '.83rem' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: 'white', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Figtree',sans-serif" }}>
              Información legal
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { href: '/legal', label: '⚖️ Aviso legal' },
                { href: '/confidentialite', label: '🔒 Política de privacidad' },
                { href: '/conditions', label: '📄 Términos y condiciones' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '.83rem' }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.04)', paddingTop: 18, marginBottom: 20 }}>
          <p style={{ color: '#374151', fontSize: '.7rem', lineHeight: 1.8 }}>
            ⚠️ <strong style={{ color: '#4b5563' }}>Afiliación:</strong> Este sitio recibe una comisión por los registros realizados a través de enlaces de socios, sin costo adicional para usted.
            {' '}ℹ️ <strong style={{ color: '#4b5563' }}>Directorio informativo:</strong> No ofrecemos contacto directo — los perfiles redirigen a plataformas asociadas.
            {' '}🔞 Solo para adultos mayores de 18 años.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          
          <span style={{ color: '#374151', fontSize: '.74rem' }}>
            © {new Date().getFullYear()} PutasMadridX.es — Sitio de afiliación. Solo para adultos 18+.
          </span>

          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { href: '/legal', label: 'Legal' },
              { href: '/confidentialite', label: 'Privacidad' },
              { href: '/conditions', label: 'Condiciones' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ color: '#374151', textDecoration: 'none', fontSize: '.74rem' }}>
                {l.label}
              </Link>
            ))}
          </div>

        </div>

      </div>
    </footer>
  )
}