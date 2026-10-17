// Serves a YouTube thumbnail from this site, so showing it before consent
// doesn't send the visitor's IP address to Google.
export async function GET(_request, { params }) {
  const { id } = await params
  if (!/^[\w-]{11}$/.test(id)) return new Response('Bad id', { status: 400 })

  // hqdefault exists for every video; maxresdefault doesn't.
  const image = await fetch(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)
  if (!image.ok) return new Response('Not found', { status: 404 })

  return new Response(image.body, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=86400, s-maxage=604800',
    },
  })
}
