import { revalidateTag } from 'next/cache'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// A Sanity webhook posts `{ _type }` when a document changes. Every query is
// tagged with the types it reads, so this refreshes each page that used it.
export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  if (!secret) return new Response('Missing secret', { status: 500 })

  const body = await request.text()
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? ''
  if (!(await isValidSignature(body, signature, secret))) {
    return new Response('Invalid signature', { status: 401 })
  }

  const { _type } = JSON.parse(body)
  if (!_type) return new Response('Missing _type', { status: 400 })

  revalidateTag(_type, { expire: 0 })
  return Response.json({ revalidated: _type })
}
