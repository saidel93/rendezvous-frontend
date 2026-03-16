import { client, UI_TEXTS_QUERY } from '@/lib/sanity'

export async function getUITexts() {
  try {
    const ui = await client.fetch(UI_TEXTS_QUERY)
    return ui || {}
  } catch {
    return {}
  }
}