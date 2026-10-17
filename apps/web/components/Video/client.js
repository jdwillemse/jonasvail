// Clicking one video consents to all of them, and localStorage remembers it.
// `consented` stands in where localStorage throws, such as blocked storage.
const KEY = 'youtube-consent'
let consented = false

const readConsent = () => {
  try {
    return localStorage.getItem(KEY) === 'yes'
  } catch {
    return consented
  }
}

const giveConsent = () => {
  try {
    localStorage.setItem(KEY, 'yes')
  } catch {
    consented = true
  }
}

// Swaps every consent button for its YouTube player. The clicked one plays.
function load(clicked) {
  for (const wrap of document.querySelectorAll('[data-youtube]')) {
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube-nocookie.com/embed/${wrap.dataset.youtube}${wrap === clicked ? '?autoplay=1' : ''}`
    iframe.title = 'YouTube video'
    iframe.allow = 'autoplay; encrypted-media'
    iframe.allowFullscreen = true
    wrap.replaceChildren(iframe)
    delete wrap.dataset.youtube
  }
}

export default function video() {
  if (readConsent()) return load()
  document.addEventListener('click', (e) => {
    const wrap = e.target.closest('[data-youtube]')
    if (!wrap) return
    giveConsent()
    load(wrap)
  })
  // Consent given in another tab
  addEventListener('storage', () => readConsent() && load())
}
