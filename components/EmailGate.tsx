'use client'

import { useState } from 'react'

export default function EmailGate({
  affiliateUrl,
  profileName,
  city,
  country,
}) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      alert('Veuillez entrer un email valide')
      return
    }

    setLoading(true)

    await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        profileName,
        city,
        country,
        website: 'quebecrencontrex.com',
      }),
    })

    setTimeout(() => {
      window.location.href = affiliateUrl
    }, 2000)
  }

  return (
    <>
      {/* 🔥 RESTORED SEXY CTA BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="ctaBtn"
        style={{
          display: 'block',
          width: '100%',
          padding: '18px',
          borderRadius: '14px',
          background:
            'linear-gradient(135deg,#e11d48,#9f1239)',
          boxShadow:
            '0 10px 30px rgba(225,29,72,.4)',
          color: '#fff',
          fontSize: '1.1rem',
          fontWeight: 700,
          textAlign: 'center',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        🔒 Continuer sur la plateforme sécurisée
      </button>

      {/* 🔥 PREMIUM POPUP */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            animation: 'fadeIn .3s ease',
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(135deg,#0f172a,#1e293b)',
              padding: '40px',
              borderRadius: '22px',
              width: '90%',
              maxWidth: '450px',
              textAlign: 'center',
              border:
                '1px solid rgba(225,29,72,.3)',
              boxShadow:
                '0 30px 80px rgba(0,0,0,.6)',
              animation: 'slideUp .3s ease',
            }}
          >
            <h2
              style={{
                color: '#fff',
                fontSize: '1.8rem',
                marginBottom: '10px',
              }}
            >
              🔐 Accès Privé Sécurisé
            </h2>

            <p
              style={{
                color: '#cbd5e1',
                fontSize: '0.95rem',
                marginBottom: '25px',
              }}
            >
              {profileName} vous attend à {city}.
              <br />
              Confirmez votre email pour accéder
              immédiatement.
            </p>

            <input
              type="email"
              placeholder="Entrez votre email privé..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '10px',
                border: '1px solid #334155',
                marginBottom: '18px',
                fontSize: '1rem',
                outline: 'none',
              }}
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '12px',
                background:
                  'linear-gradient(135deg,#e11d48,#be123c)',
                color: '#fff',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {loading
                ? 'Vérification en cours...'
                : '🔥 Accéder maintenant'}
            </button>

            <p
              style={{
                marginTop: '15px',
                fontSize: '0.75rem',
                color: '#94a3b8',
              }}
            >
              ✔ 100% confidentiel
              <br />
              ✔ Aucun spam
              <br />
              ✔ Accès immédiat
            </p>
          </div>
        </div>
      )}
    </>
  )
}