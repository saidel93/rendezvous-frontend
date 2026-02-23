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
  useCdn: false,
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
/*  SEO HELPERS (AUTO)                                           */
/* ────────────────────────────────────────────────────────────── */

function firstWords(text: string, n = 20): string {
  const clean = text
    .replace(/\s+/g, ' ')
    .replace(/\n+/g, ' ')
    .trim()

  if (!clean) return ''

  const words = clean.split(' ')
  const out = words.slice(0, n).join(' ')
  return words.length > n ? out + '…' : out
}

export function getProfileMetaTitle(profile: any): string {
  const seoTitle = profile?.seoTitle?.trim()
  if (seoTitle) return seoTitle

  // ✅ automatic title (priority)
  const hero = profile?.heroTitle?.trim()
  if (hero) return hero

  const tagline = profile?.tagline?.trim()
  if (tagline) {
    // keep it not too long
    return tagline.length > 70 ? tagline.slice(0, 70).trim() + '…' : tagline
  }

  const nom = profile?.nom || 'Profil'
  const age = profile?.age ? `${profile.age} ans` : ''
  const ville = profile?.ville?.nom ? `à ${profile.ville.nom}` : 'au Québec'

  return `${nom}${age ? `, ${age}` : ''} ${ville} – RendezVous Québec`
}

export function getProfileMetaDesc(profile: any): string {
  const seoDesc = profile?.seoDescription?.trim()
  if (seoDesc) return seoDesc

  const bio = profile?.bio?.trim()
  if (bio) return firstWords(bio, 20)

  const tagline = profile?.tagline?.trim()
  if (tagline) return tagline

  const nom = profile?.nom || 'Profil'
  const ville = profile?.ville?.nom || 'Québec'
  return `Découvrez ${nom} et d’autres profils à ${ville} sur RendezVous Québec.`
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
  photo,
  photos,
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
    siteDescription,
    homeSeoTitle,
    homeSeoDescription,
    categoriesSeoTitle,
    categoriesSeoDescription,
    regionsSeoTitle,
    regionsSeoDescription
  }
`/* ────────────────────────────────────────────────────────────── */
/*  TRANSLATIONS (UI TEXT)                                       */
/* ────────────────────────────────────────────────────────────── */

export const TRANSLATIONS_QUERY = `
  *[_type == "translations" && _id == "translations-default"][0]{
    header_home,
    header_annonces,
    header_regions,
    header_tags,
    header_blog,

    home_mainTitle,
    home_subTitle,
    home_buttonExploreRegions,

    section_randomProfiles,

    profile_similarTitle,
    profile_continueCta,

    blog_title,
    blog_subtitle,

    footer_legal,
    footer_privacy,
    footer_terms,
    footer_affiliateNotice,
    footer_adultNotice,
    footer_copyright
  }
`