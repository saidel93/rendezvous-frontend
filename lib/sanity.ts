import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SiteSettings } from './types'

/* ────────────────────────────────────────────────────────────── */
/*  SANITY CLIENT                                                */
/* ────────────────────────────────────────────────────────────── */

export const client = createClient({
  projectId:
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'e8skho1c',
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

/* ────────────────────────────────────────────────────────────── */
/*  IMAGE HELPERS (UPLOAD ONLY)                                  */
/* ────────────────────────────────────────────────────────────── */

export function getPhotoSrc(profile: any, w = 400, h = 500): string {
  if (!profile?.photo?.asset?._ref) {
    return '/placeholder.jpg'
  }

  return urlFor(profile.photo)
    .width(w)
    .height(h)
    .fit('crop')
    .url()
}

export function getGalleryUrls(profile: any): string[] {
  if (!profile?.photos?.length) return []

  return profile.photos
    .filter((p: any) => p?.asset?._ref)
    .map((p: any) =>
      urlFor(p)
        .width(600)
        .height(600)
        .fit('crop')
        .url()
    )
}

/* ────────────────────────────────────────────────────────────── */
/*  AFFILIATE                                                    */
/* ────────────────────────────────────────────────────────────── */

export function getAffiliateUrl(
  profile: any,
  settings: SiteSettings | null
): string {
  return (
    profile?.affiliateUrl ||
    settings?.affiliateUrl ||
    '#'
  )
}

/* ────────────────────────────────────────────────────────────── */
/*  SEO HELPERS                                                  */
/* ────────────────────────────────────────────────────────────── */

export function getProfileMetaTitle(profile: any): string {
  if (profile?.seoTitle?.trim())
    return profile.seoTitle.trim()

  return `${profile.nom}, ${profile.age} ans à ${
    profile.ville?.nom || 'Québec'
  } – RendezVous Québec`
}

export function getProfileMetaDesc(profile: any): string {
  if (profile?.seoDescription?.trim())
    return profile.seoDescription.trim()

  if (profile?.bio?.trim()) {
    const words = profile.bio.trim().split(/\s+/)
    return (
      words.slice(0, 20).join(' ') +
      (words.length > 20 ? '…' : '')
    )
  }

  return profile?.tagline || ''
}

/* ────────────────────────────────────────────────────────────── */
/*  COMMON PROFILE FIELDS                                        */
/* ────────────────────────────────────────────────────────────── */

const PROFILE_FIELDS = `
  _id,
  slug,
  nom,
  age,
  ville->{_id, nom, slug, region},
  categorie->{_id, nom, slug, emoji},
  tagline,
  heroTitle,
  seoTitle,
  seoDescription,
  photo{ asset->{_ref, _id, url} },
  photos[]{ asset->{_ref, _id, url} },
  verifie,
  online,
  vedette,
  membreDepuis,
  derniereActivite,
  tags,
  affiliateUrl
`

/* ────────────────────────────────────────────────────────────── */
/*  PROFILE QUERIES                                              */
/* ────────────────────────────────────────────────────────────── */

export const ALL_PROFILES_QUERY = `
  *[_type == "profile"]
  | order(_createdAt desc)
  { ${PROFILE_FIELDS} }
`

export const FEATURED_QUERY = `
  *[_type == "profile" && vedette == true]
  | order(_createdAt desc)[0...8]
  { ${PROFILE_FIELDS} }
`

export const PROFILE_BY_SLUG_QUERY = `
  *[_type == "profile" && slug.current == $slug][0]{
    ${PROFILE_FIELDS},
    bio
  }
`

export const PROFILES_BY_CITY_QUERY = `
  *[_type == "profile" && ville->slug.current == $citySlug]
  | order(_createdAt desc)
  { ${PROFILE_FIELDS} }
`

export const PROFILES_BY_CAT_QUERY = `
  *[_type == "profile" && references(*[_type=="categorie" && slug.current==$catSlug][0]._id)]
  | order(_createdAt desc){
    ${PROFILE_FIELDS}
  }
`

/* ────────────────────────────────────────────────────────────── */
/*  CITIES                                                       */
/* ────────────────────────────────────────────────────────────── */

export const ALL_CITIES_QUERY = `
  *[_type == "ville"]
  | order(nom asc){
    _id,
    nom,
    slug,
    region,
    "profileCount": count(
      *[_type == "profile" && ville._ref == ^._id]
    )
  }
`

export const CITY_BY_SLUG_QUERY = `
  *[_type == "ville" && slug.current == $slug][0]{
    _id,
    nom,
    slug,
    region,
    seoTitle,
    seoDescription
  }
`

/* ────────────────────────────────────────────────────────────── */
/*  CATEGORIES                                                   */
/* ────────────────────────────────────────────────────────────── */

export const ALL_CATEGORIES_QUERY = `
  *[_type == "categorie"]
  | order(nom asc){
    _id,
    nom,
    slug,
    emoji,
    description,
    "profileCount": count(
      *[_type == "profile" && references(^._id)]
    )
  }
`

export const CAT_BY_SLUG_QUERY = `
  *[_type == "categorie" && slug.current == $slug][0]{
    _id,
    nom,
    slug,
    emoji,
    description,
    seoTitle,
    seoDescription
  }
`

/* ────────────────────────────────────────────────────────────── */
/*  SETTINGS                                                     */
/* ────────────────────────────────────────────────────────────── */

export const SETTINGS_QUERY = `
  *[_type == "settings" && _id == "site-settings"][0]{
    affiliateUrl,
    siteName,
    siteDescription
  }
`