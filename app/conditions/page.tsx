import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: "Conditions d'utilisation – RendezVous Québec",
  description: "Conditions générales d'utilisation du site RendezVous Québec. Règles d'accès, responsabilités et informations sur notre modèle d'affiliation.",
}

const s = (t: string, c: React.ReactNode) => (
  <section style={{ marginBottom: 40 }}>
    <h2 style={{ fontSize: '1.25rem', color: 'white', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid rgba(255,255,255,.07)' }}>{t}</h2>
    <div style={{ color: '#9ba3af', fontSize: '.88rem', lineHeight: 1.9, fontFamily: "'Figtree',sans-serif" }}>{c}</div>
  </section>
)

export default function ConditionsPage() {
  return (
    <div>
      <div className="page-header">
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px' }}>
          <p className="page-breadcrumb">Accueil › <Link href="/legal" style={{ color: '#7c8590', textDecoration: 'none' }}>Légal</Link> › <span style={{ color: '#fb7185' }}>Conditions</span></p>
          <h1>Conditions d'utilisation</h1>
          <p>Dernière mise à jour : février 2025</p>
        </div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 20px 80px' }}>

        {s("1. Acceptation des conditions", <>
          <p>En accédant à RendezVous Québec, vous acceptez pleinement et sans réserve les présentes conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site. Nous nous réservons le droit de modifier ces conditions à tout moment, avec ou sans préavis.</p>
        </>)}

        {s("2. Nature du service", <>
          <p style={{ marginBottom: 10 }}>RendezVous Québec est un <strong style={{ color: 'white' }}>annuaire d'affiliation</strong> qui présente des profils à titre illustratif pour diriger les visiteurs vers des plateformes de rencontres partenaires. En tant qu'utilisateur, vous comprenez et acceptez que :</p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>Ce site n'est <strong style={{ color: 'white' }}>pas</strong> une plateforme de rencontres directes.</li>
            <li style={{ marginBottom: 6 }}>Il n'existe <strong style={{ color: 'white' }}>aucun moyen de contacter directement</strong> les personnes présentées sur ce site.</li>
            <li style={{ marginBottom: 6 }}>Les profils sont présentés à titre informatif et publicitaire uniquement.</li>
            <li>Pour tout contact réel, vous devez vous inscrire sur la plateforme partenaire désignée.</li>
          </ul>
        </>)}

        {s("3. Âge minimum — adultes seulement", <>
          <p>L'accès à ce site est <strong style={{ color: 'white' }}>strictement réservé aux personnes âgées de 18 ans et plus</strong>. En utilisant ce site, vous certifiez avoir au moins 18 ans. Toute utilisation par une personne mineure est strictement interdite et constitue une violation des présentes conditions.</p>
        </>)}

        {s("4. Liens d'affiliation et rémunération", <>
          <p style={{ marginBottom: 10 }}>Ce site contient des <strong style={{ color: 'white' }}>liens d'affiliation rémunérés</strong>. Lorsque vous cliquez sur le bouton d'un profil et effectuez une action qualifiante sur la plateforme partenaire (inscription, abonnement, etc.), RendezVous Québec perçoit une commission.</p>
          <p>Cette rémunération ne génère aucun coût supplémentaire pour vous et n'influence pas l'objectivité de nos présentations. Tous les liens d'affiliation sont clairement signalés.</p>
        </>)}

        {s("5. Propriété intellectuelle", <>
          <p>L'ensemble du contenu de ce site (textes, design, logos, code) est la propriété exclusive de RendezVous Québec ou de ses concédants de licence, et est protégé par les lois canadiennes et internationales sur la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans autorisation écrite préalable.</p>
        </>)}

        {s("6. Limitation de responsabilité", <>
          <p style={{ marginBottom: 10 }}>RendezVous Québec ne peut être tenu responsable :</p>
          <ul style={{ paddingLeft: 20 }}>
            <li style={{ marginBottom: 6 }}>Du contenu, des services ou des pratiques des plateformes partenaires vers lesquelles vous êtes redirigé(e).</li>
            <li style={{ marginBottom: 6 }}>De toute perte ou dommage résultant de votre utilisation des plateformes partenaires.</li>
            <li>De l'exactitude ou de l'exhaustivité des informations présentées sur ce site.</li>
          </ul>
        </>)}

        {s("7. Droit applicable", <>
          <p>Les présentes conditions sont régies par les lois de la province de Québec et les lois fédérales canadiennes applicables. Tout litige sera soumis à la juridiction exclusive des tribunaux compétents du Québec.</p>
        </>)}

        <div style={{ marginTop: 20 }}>
          <Link href="/legal" style={{ color: '#fb7185', textDecoration: 'none', fontSize: '.85rem', fontWeight: 600 }}>← Retour aux informations légales</Link>
        </div>
      </div>
    </div>
  )
}
