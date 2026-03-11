import type { Metadata } from 'next'
import { client, ALL_CATEGORIES_QUERY, SETTINGS_QUERY } from '@/lib/sanity'
import Link from 'next/link'
import type { Categorie } from '@/lib/types'

export const dynamic = 'force-dynamic'

/* ───────────────────────────────────────────── */
/* 🔥 Dynamic SEO from Sanity                   */
/* ───────────────────────────────────────────── */

export async function generateMetadata(): Promise<Metadata> {
  try {
    const settings = await client.fetch(SETTINGS_QUERY)

    return {
      title:
        settings?.categoriesSeoTitle ??
        'Tipos de encuentros en España – Categorías',

      description:
        settings?.categoriesSeoDescription ??
        'Elige el tipo de encuentro que buscas en Madrid y toda España.',

      openGraph: {
        title:
          settings?.categoriesSeoTitle ??
          'Tipos de encuentros en España – Categorías',

        description:
          settings?.categoriesSeoDescription ??
          'Elige el tipo de encuentro que buscas en Madrid y toda España.',
      },
    }
  } catch {
    return {
      title: 'Categorías – Putas Madrid X',
      description: 'Descubre todas las categorías disponibles.',
    }
  }
}

export default async function CategoriasPage() {
  let cats: Categorie[] = []

  try {
    cats = await client.fetch(ALL_CATEGORIES_QUERY)
  } catch (e) {
    console.error(e)
  }

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div
        style={{
          padding: '40px 0 28px',
          background:
            'linear-gradient(135deg,rgba(225,29,72,.06),transparent)',
          borderBottom: '1px solid rgba(255,255,255,.06)',
          marginBottom: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 20px',
          }}
        >
          <span style={{ color: '#3e444d', fontSize: '.78rem' }}>
            Inicio ›{' '}
            <span style={{ color: '#fb7185' }}>
              Categorías
            </span>
          </span>

          <h1
            style={{
              fontSize: '2.2rem',
              color: 'white',
              marginTop: 8,
              marginBottom: 6,
            }}
          >
            Encuentros según tus preferencias
          </h1>

          <p
            style={{
              color: '#7c8590',
              fontSize: '.9rem',
            }}
          >
            Encuentra la categoría perfecta para ti.
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 20px 60px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fill,minmax(280px,1fr))',
            gap: 16,
          }}
        >
          {cats.map((c) => (
            <Link
              key={c._id}
              href={`/categorias/${c.slug.current}`}
              style={{
                background: 'rgba(21,25,32,.85)',
                border:
                  '1px solid rgba(225,29,72,.12)',
                borderRadius: 16,
                padding: 28,
                textDecoration: 'none',
                display: 'block',
              }}
            >
              <div
                style={{
                  fontSize: '2.8rem',
                  marginBottom: 12,
                }}
              >
                {c.emoji}
              </div>

              <div
                style={{
                  fontFamily:
                    "'Playfair Display',serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'white',
                  marginBottom: 6,
                }}
              >
                {c.nom}
              </div>

              {c.description && (
                <div
                  style={{
                    color: '#7c8590',
                    fontSize: '.83rem',
                    lineHeight: 1.6,
                    marginBottom: 12,
                  }}
                >
                  {c.description}
                </div>
              )}

              <span
                style={{
                  fontSize: '.72rem',
                  background:
                    'rgba(225,29,72,.1)',
                  border:
                    '1px solid rgba(225,29,72,.2)',
                  color: '#fb7185',
                  borderRadius: 50,
                  padding: '3px 10px',
                  fontWeight: 700,
                }}
              >
                {c.profileCount || 0} perfiles
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}