export const runtime = 'nodejs' // ✅ REQUIRED for Netlify

import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// ✅ Safety check for production
if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN is missing in environment variables')
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // must exist in Netlify
  useCdn: false,
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, profileName, city, country, website } = body

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // ✅ Check duplicate
    const existing = await client.fetch(
      `*[_type == "lead" && email == $email][0]`,
      { email }
    )

    if (!existing) {
      await client.create({
        _type: 'lead',
        email,
        profileName,
        city,
        country,
        website,
        createdAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌ Lead API Error:', error)

    return NextResponse.json(
      { error: 'Server error while saving lead' },
      { status: 500 }
    )
  }
}