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

    // Fake verification delay (boost conversion)
    setTimeout(() => {
      window.location.href = affiliateUrl
    }, 2000)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold"
      >
        🔒 Go to plateforme sécurisée
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center">
            <h2 className="text-xl font-bold mb-4">
              Vérification sécurisée 🔐
            </h2>

            <input
              type="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded w-full"
            >
              {loading ? 'Vérification...' : 'Continuer'}
            </button>

            <p className="text-xs mt-3 text-gray-500">
              En continuant, vous acceptez nos conditions.
            </p>
          </div>
        </div>
      )}
    </>
  )
}