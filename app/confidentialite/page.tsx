import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Politique de confidentialité – RendezVous Québec',
  description: 'Comment RendezVous Québec collecte, utilise et protège vos données personnelles. Conformité avec les lois canadiennes et québécoises.',
}

const s = (t: string, c: React.ReactNode) => (
  <section style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: '1.25rem', color: 'white', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,.07)' }}>{t}</h2>
    <div style={{ color: '#9ba3af', fontSize: '.88rem', lineHeight: 1.9, fontFamily: "'Figtree',sans-serif" }}>{c}</div>
  </section>
)

export default function ConfidentialitePage() {
  return (
    <div>
      <div className="page-header">
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
          <p className="page-breadcrumb">Accueil › <Link href="/legal" style={{ color: '#7c8590', textDecoration: 'none' }}>Légal</Link> › <span style={{ color: '#fb7185' }}>Confidentialité</span></p>
          <h1>Politique de confidentialité</h1>
          <p>Dernière mise à jour : février 2025</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 80px' }}>

        {s('1. Informations que nous collectons', <>
          <p style={{ marginBottom: 10 }}>RendezVous Québec ne collecte que les données minimales nécessaires au bon fonctionnement du site :</p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}><strong style={{ color: 'white' }}>Données de navigation :</strong> adresse IP anonymisée, type de navigateur, pages visitées, durée de session — collectées automatiquement via des cookies techniques.</li>
            <li style={{ marginBottom: 6 }}><strong style={{ color: 'white' }}>Données analytiques :</strong> statistiques agrégées et anonymes sur le comportement des visiteurs (ex. : Google Analytics si activé).</li>
            <li><strong style={{ color: 'white' }}>Aucune donnée personnelle identifiable</strong> (nom, email, téléphone) n'est collectée sur ce site sans votre consentement explicite.</li>
          </ul>
        </>)}

        {s('2. Cookies', <>
          <p style={{ marginBottom: 10 }}>Nous utilisons des cookies pour :</p>
          <ul style={{ paddingLeft: 20, marginBottom: 10 }}>
            <li style={{ marginBottom: 6 }}>Assurer le bon fonctionnement technique du site (cookies essentiels).</li>
            <li style={{ marginBottom: 6 }}>Mesurer l'audience et améliorer notre contenu (cookies analytiques, soumis à votre consentement).</li>
            <li>Suivre les conversions d'affiliation (cookies partenaires, soumis à votre consentement).</li>
          </ul>
          <p>Vous pouvez désactiver les cookies non essentiels dans les paramètres de votre navigateur à tout moment.</p>
        </>)}

        {s('3. Partage des données', <>
          <p style={{ marginBottom: 10 }}>Nous ne vendons jamais vos données personnelles. Nous pouvons partager des données anonymisées avec :</p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}><strong style={{ color: 'white' }}>Plateformes d'analyse :</strong> Google Analytics (données agrégées et anonymes).</li>
            <li><strong style={{ color: 'white' }}>Plateformes partenaires d'affiliation :</strong> un identifiant de clic anonyme peut être transmis lors d'une redirection vers une plateforme partenaire, à des fins de suivi de commission.</li>
          </ul>
        </>)}

        {s('4. Vos droits (Loi 25 — Québec)', <>
          <p style={{ marginBottom: 10 }}>Conformément à la Loi 25 sur la protection des renseignements personnels dans le secteur privé (Québec), vous disposez des droits suivants :</p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>Droit d'accès à vos données personnelles.</li>
            <li style={{ marginBottom: 6 }}>Droit de rectification.</li>
            <li style={{ marginBottom: 6 }}>Droit à l'effacement ("droit à l'oubli").</li>
            <li>Droit de déposer une plainte auprès de la Commission d'accès à l'information (CAI) du Québec.</li>
          </ul>
        </>)}

        {s('5. Sécurité', <>
          <p>Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger les données collectées contre tout accès non autorisé, divulgation ou destruction.</p>
        </>)}

        {s('6. Contact', <>
          <p>Pour toute question relative à la confidentialité, contactez-nous via le formulaire disponible sur notre page de contact. Nous répondrons dans un délai de 30 jours.</p>
        </>)}

        <div style={{ marginTop: 20 }}>
          <Link href="/legal" style={{ color: '#fb7185', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>← Retour aux informations légales</Link>
        </div>
      </div>
    </div>
  )
}
