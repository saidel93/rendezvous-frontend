import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
})

const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)

export function getPhotoSrc(profile: any, w = 400, h = 500): string {
  if (profile?.photoUrl) return profile.photoUrl
  if (profile?.photo) return urlFor(profile.photo).width(w).height(h).url()
  const seed = profile?.nom ? (profile.nom.charCodeAt(0) % 70) + 1 : 44
  return `https://randomuser.me/api/portraits/women/${seed}.jpg`
}

export function getGalleryUrls(profile: any): string[] {
  if (profile?.photosUrls?.length > 0)
    return profile.photosUrls.map((p: any) => p.url).filter(Boolean)
  if (profile?.photos?.length > 0)
    return profile.photos.map((p: any) => urlFor(p).width(400).height(400).url())
  return [getPhotoSrc(profile)]
}

const F = `_id,slug,nom,age,ville->{_id,nom,slug,region},categorie->{_id,nom,slug,emoji},tagline,photoUrl,photo,verifie,online,vedette,membreDepuis,derniereActivite,tags,affiliateUrl`

export const ALL_PROFILES_QUERY     = `*[_type=="profile"]|order(_createdAt desc){${F}}`
export const FEATURED_QUERY         = `*[_type=="profile"&&vedette==true]|order(_createdAt desc)[0...8]{${F}}`
export const PROFILE_BY_SLUG_QUERY  = `*[_type=="profile"&&slug.current==$slug][0]{${F},bio,photosUrls,photos}`
export const PROFILES_BY_CITY_QUERY = `*[_type=="profile"&&ville->slug.current==$citySlug]|order(_createdAt desc){${F}}`
export const PROFILES_BY_CAT_QUERY  = `*[_type=="profile"&&categorie->slug.current==$catSlug]|order(_createdAt desc){${F}}`
export const ALL_CITIES_QUERY       = `*[_type=="ville"]|order(nom asc){_id,nom,slug,region,"profileCount":count(*[_type=="profile"&&ville._ref==^._id])}`
export const ALL_CATEGORIES_QUERY   = `*[_type=="categorie"]|order(nom asc){_id,nom,slug,emoji,description,"profileCount":count(*[_type=="profile"&&categorie._ref==^._id])}`
export const CITY_BY_SLUG_QUERY     = `*[_type=="ville"&&slug.current==$slug][0]{_id,nom,slug,region}`
export const CAT_BY_SLUG_QUERY      = `*[_type=="categorie"&&slug.current==$slug][0]{_id,nom,slug,emoji,description}`
