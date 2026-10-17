import Image from '@11ty/eleventy-img'
import getYouTubeID from 'get-youtube-id'

// Images are resized and encoded at build time and served from this site.
// Sanity's CDN serves WebP at best; AVIF is smaller again. Encoded files stay
// in .cache/img, so a rebuild only encodes new images.
const OPTIONS = {
  widths: [576, 768, 992, 1200, 1400],
  formats: ['avif', 'webp'],
  outputDir: '.cache/img/',
  urlPath: '/img/',
  // Keeps GIFs animated, as WebP. AVIF drops out for them.
  sharpOptions: { animated: true },
  // Sanity and YouTube URLs name a fixed file, so a download never goes stale.
  cacheOptions: { duration: '*' },
}

// Sanity resizes the original first: some are 7000px wide.
const sanity = (url) => `${url}?w=${OPTIONS.widths.at(-1)}&fit=max&q=100`

// Downloads sometimes drop on Vercel's build machines ("fetch failed"), and
// one failure fails the build, so retry. eleventy-img keeps each call's
// promise in memory, keyed by its options, so `attempt` makes each retry a
// new call. Output filenames don't depend on it.
export async function optimise(src, attempt = 1) {
  try {
    return await Image(src, { ...OPTIONS, attempt })
  } catch (error) {
    if (attempt >= 3) throw error
    await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
    return optimise(src, attempt + 1)
  }
}

// Adds `formats` to each image in a project's media blocks, and a
// `thumbnail` to each video.
export async function optimiseMedia(blocks) {
  const items = blocks.flatMap((block) => block.rows.flat())
  await Promise.all(
    items.map(async (item) => {
      if (item.video) {
        // hqdefault exists for every video; maxresdefault doesn't.
        const id = getYouTubeID(item.video)
        item.thumbnail = await optimise(
          `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
        )
      } else if (item.image?.url) {
        item.image.formats = await optimise(sanity(item.image.url))
      }
    })
  )
}
