export interface Ville {
  _id: string
  nom: string
  slug: { current: string }
  region: string
  profileCount?: number
}

export interface Categorie {
  _id: string
  nom: string
  slug: { current: string }
  emoji: string
  description?: string
  profileCount?: number
}

export interface Profile {
  _id: string
  slug: { current: string }
  nom: string
  age: number
  ville: Ville
  categorie: Categorie
  tagline: string
  bio?: string
  photoUrl?: string
  photo?: any
  photosUrls?: { url: string; alt?: string }[]
  photos?: any[]
  verifie?: { photo?: boolean; email?: boolean; telephone?: boolean; premium?: boolean }
  online?: boolean
  vedette?: boolean
  membreDepuis?: string
  derniereActivite?: string
  tags?: string[]
  affiliateUrl: string
}
