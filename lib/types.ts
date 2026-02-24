export interface Ville {
  _id: string
  nom: string
  slug: { current: string }
  region?: string
  profileCount?: number

  /* 🔥 SEO CONTENT BLOCKS */
  topContent?: string
  bottomContent?: string

  /* 🔍 SEO */
  seoTitle?: string
  seoDescription?: string
}

export interface Categorie {
  _id: string
  nom: string
  slug: { current: string }
  emoji?: string
  description?: string
  profileCount?: number

  /* 🔥 SEO CONTENT BLOCKS */
  topContent?: string
  bottomContent?: string

  /* 🔍 SEO */
  seoTitle?: string
  seoDescription?: string
}

export interface Profile {
  _id: string
  slug: { current: string }

  nom: string
  age: number

  ville?: Ville
  categorie?: Categorie

  tagline?: string
  bio?: string
  heroTitle?: string

  /* 🔍 SEO */
  seoTitle?: string
  seoDescription?: string

  /* 🖼 Images (Sanity native) */
  photo?: any
  photos?: any[]

  /* ⚠ Legacy (keep optional for safety) */
  photoUrl?: string
  photosUrls?: { url: string; alt?: string }[]

  verifie?: {
    photo?: boolean
    email?: boolean
    telephone?: boolean
    premium?: boolean
  }

  online?: boolean
  vedette?: boolean
  membreDepuis?: string
  derniereActivite?: string
  tags?: string[]
  affiliateUrl?: string
}

export interface SiteSettings {
  affiliateUrl?: string
  siteName?: string
  siteDescription?: string

  /* 🔍 Homepage SEO */
  homeSeoTitle?: string
  homeSeoDescription?: string

  /* 🔍 Categories Page SEO */
  categoriesSeoTitle?: string
  categoriesSeoDescription?: string

  /* 🔍 Regions Page SEO */
  regionsSeoTitle?: string
  regionsSeoDescription?: string
}