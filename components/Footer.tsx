import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,.07)', padding: '52px 0 28px', marginTop: 60 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 40, marginBottom: 36 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.3rem', fontWeight: 700, background: 'linear-gradient(135deg,#fb7185,#e11d48)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 12 }}>RendezVous Québec</div>
            <p style={{ color: '#6b7280', fontSize: '.82rem', lineHeight: 1.7 }}>Annuaire de rencontres partenaires au Québec. Site d'affiliation pour adultes 18+.</p>
          </div>

          {/* Explorer */}
          <div>
            <h4 style={{ color: 'white', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Figtree',sans-serif" }}>Explorer</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { href: '/annonces',   label: '❤ Annonces' },
                { href: '/regions',    label: '📍 Régions' },
                { href: '/categories', label: '💝 Catégories' },
                { href: '/tags',       label: '🏷️ Tags' },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '.83rem' }}>{l.label}</Link>
              ))}
            </div>
          </div>

          {/* Légal */}
          <div>
            <h4 style={{ color: 'white', fontSize: '.68rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14, fontFamily: "'Figtree',sans-serif" }}>Informations légales</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {[
                { href: '/legal',           label: '⚖️ Informations légales' },
                { href: '/confidentialite', label: '🔒 Confidentialité' },
                { href: '/conditions',      label: "📄 Conditions d'utilisation" },
              ].map(l => (
                <Link key={l.href} href={l.href} style={{ color: '#6b7280', textDecoration: 'none', fontSize: '.83rem' }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Full legal text ── */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,.06)', paddingTop: 32, marginBottom: 28 }}>

          {/* Affiliate disclosure */}
          <div style={{ background: 'rgba(251,191,36,.05)', border: '1px solid rgba(251,191,36,.15)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
            <p style={{ color: '#fbbf24', fontWeight: 700, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontFamily: "'Figtree',sans-serif" }}>
              ⚠️ Divulgation d'affiliation
            </p>
            <p style={{ color: '#6b7280', fontSize: '.75rem', lineHeight: 1.8, fontFamily: "'Figtree',sans-serif" }}>
              Ce site est un <strong style={{ color: '#9ca3af' }}>site d'affiliation</strong>. Cela signifie que nous percevons une commission lorsque vous cliquez sur un lien de profil et que vous vous inscrivez ou effectuez une action sur la plateforme partenaire vers laquelle vous êtes redirigé(e). Cette rémunération ne génère aucun coût supplémentaire pour vous. Tous les liens d'affiliation sont clairement identifiés par le bouton "Continuer sur la plateforme sécurisée".
            </p>
          </div>

          {/* No direct contact */}
          <div style={{ background: 'rgba(255,255,255,.025)', border: '1px solid rgba(255,255,255,.06)', borderRadius: 12, padding: '16px 20px', marginBottom: 20 }}>
            <p style={{ color: '#9ca3af', fontWeight: 700, fontSize: '.75rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontFamily: "'Figtree',sans-serif" }}>
              ℹ️ Aucun contact direct
            </p>
            <p style={{ color: '#6b7280', fontSize: '.75rem', lineHeight: 1.8, fontFamily: "'Figtree',sans-serif" }}>
              RendezVous Québec est un <strong style={{ color: '#9ca3af' }}>annuaire vitrine</strong> — nous ne sommes pas une plateforme de rencontres directes. Ce site ne propose aucun système de messagerie intégré et ne facilite aucune relation directe entre les personnes. Les profils présentés sont à titre illustratif pour vous orienter vers des plateformes partenaires. Pour entrer en contact avec une personne, vous devez vous inscrire sur la plateforme partenaire désignée en acceptant ses propres conditions d'utilisation.
            </p>
          </div>

          {/* Legal text columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 20 }}>

            {/* Privacy */}
            <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ color: '#9ca3af', fontWeight: 700, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontFamily: "'Figtree',sans-serif" }}>🔒 Confidentialité</p>
              <p style={{ color: '#4b5563', fontSize: '.73rem', lineHeight: 1.8, fontFamily: "'Figtree',sans-serif" }}>
                Nous collectons uniquement les données minimales nécessaires au bon fonctionnement du site (données de navigation anonymisées, cookies techniques). Nous ne vendons jamais vos données personnelles. Conformément à la Loi 25 (Québec), vous disposez d'un droit d'accès, de rectification et d'effacement de vos données. Pour toute demande, contactez-nous via notre page légale.
              </p>
            </div>

            {/* Terms */}
            <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ color: '#9ca3af', fontWeight: 700, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontFamily: "'Figtree',sans-serif" }}>📄 Conditions d'utilisation</p>
              <p style={{ color: '#4b5563', fontSize: '.73rem', lineHeight: 1.8, fontFamily: "'Figtree',sans-serif" }}>
                L'accès à ce site est strictement réservé aux personnes majeures âgées de <strong style={{ color: '#6b7280' }}>18 ans et plus</strong>. En naviguant sur ce site, vous confirmez avoir au moins 18 ans et acceptez nos conditions d'utilisation ainsi que notre politique de confidentialité. RendezVous Québec se réserve le droit de modifier ces conditions à tout moment.
              </p>
            </div>

            {/* Disclaimer */}
            <div style={{ background: 'rgba(255,255,255,.02)', border: '1px solid rgba(255,255,255,.05)', borderRadius: 10, padding: '14px 16px' }}>
              <p style={{ color: '#9ca3af', fontWeight: 700, fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, fontFamily: "'Figtree',sans-serif" }}>⚖️ Limitation de responsabilité</p>
              <p style={{ color: '#4b5563', fontSize: '.73rem', lineHeight: 1.8, fontFamily: "'Figtree',sans-serif" }}>
                RendezVous Québec ne peut être tenu responsable du contenu, des services ou des pratiques des plateformes partenaires. Les informations présentées sur ce site le sont à titre indicatif uniquement. Ce site est régi par les lois de la province de Québec et les lois fédérales canadiennes applicables.
              </p>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          <span style={{ color: '#374151', fontSize: '.74rem' }}>
            © {new Date().getFullYear()} RendezVous Québec — Site d'affiliation. Pour adultes 18+.
          </span>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { href: '/legal',           label: 'Légal' },
              { href: '/confidentialite', label: 'Confidentialité' },
              { href: '/conditions',      label: 'Conditions' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{ color: '#374151', textDecoration: 'none', fontSize: '.74rem' }}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
