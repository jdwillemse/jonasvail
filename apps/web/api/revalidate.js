import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

// A Sanity webhook posts here when a document changes. The site is static, so
// this rebuilds and redeploys it through a Vercel deploy hook.
export async function POST(request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL
  if (!secret || !hook) return new Response('Missing secret', { status: 500 })

  const body = await request.text()
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? ''
  if (!(await isValidSignature(body, signature, secret))) {
    return new Response('Invalid signature', { status: 401 })
  }

  const deploy = await fetch(hook, { method: 'POST' })
  if (!deploy.ok) return new Response('Deploy failed', { status: 502 })
  return Response.json({ rebuilding: true })
}
