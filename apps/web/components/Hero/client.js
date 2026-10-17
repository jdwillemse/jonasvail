import textGL from '@/lib/textGL'

// The scroll wobble from ehaakana/codrops-text-demo: scroll speed bends the
// text with two sine waves and pulls the red channel apart. There it's a
// full-screen post-process pass; here it's worked out in viewport space so the
// waves line up the same, then mapped back onto the hero's own canvas.
const FRAGMENT = `
precision mediump float;
uniform sampler2D text;
uniform vec2 size;
uniform vec2 origin;
uniform vec2 viewport;
uniform float velocity;
uniform float time;
uniform vec3 color;
varying vec2 uv;
void main() {
  vec2 screen = (origin + uv * size) / viewport;
  float amplitude = velocity * 0.00045;
  float frequency = 4.0 + velocity * 0.01;
  vec2 wave = vec2(
    sin(screen.y * frequency + time),
    sin(screen.x * frequency * 5.0 + time * 0.8)
  ) * amplitude * viewport / size;
  vec2 shift = vec2(0.0, -velocity * 0.0005) * viewport / size;
  float a = texture2D(text, uv + wave).a;
  float r = texture2D(text, uv + wave + shift).a;
  gl_FragColor = vec4(color.r * r, color.g * a, color.b * a, max(r, a));
}`

// Scroll px per frame is smoothed like the demo's Lenis velocity, and capped
// since native wheel scrolling jumps much harder than Lenis does.
const SMOOTHING = 0.15
const MAX_VELOCITY = 60

// Wobbles each hero's copy while the page scrolls.
export default function hero() {
  for (const copy of document.querySelectorAll('[data-hero]')) wobble(copy)
}

function wobble(copy) {
  let frame = 0
  let stop = () => {}
  // Kept across wobbles, so the scroll that starts one counts towards it.
  let last = scrollY

  function start() {
    if (frame) return
    const box = copy.getBoundingClientRect()
    if (
      box.bottom < 0 ||
      box.top > innerHeight ||
      !matchMedia('(prefers-reduced-motion: no-preference)').matches
    )
      return void (last = scrollY)
    // Room for the furthest the waves and red shift can push the text.
    const reach = MAX_VELOCITY * 0.00045
    const padX = Math.ceil(innerWidth * reach)
    const padY = Math.ceil(innerHeight * (reach + MAX_VELOCITY * 0.0005))
    const gl = textGL(copy, FRAGMENT, padX, padY)
    if (!gl) return
    copy.classList.add('wobbling')
    gl.uniform('viewport', innerWidth, innerHeight)
    stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
      copy.classList.remove('wobbling')
      gl.destroy()
    }

    const t0 = performance.now()
    let velocity = 0
    const tick = (now) => {
      const delta = Math.max(
        -MAX_VELOCITY,
        Math.min(MAX_VELOCITY, scrollY - last)
      )
      last = scrollY
      velocity += (delta - velocity) * SMOOTHING
      if (!delta && Math.abs(velocity) < 0.05) return stop()
      const { left, top } = copy.getBoundingClientRect()
      gl.uniform('origin', left - padX, top - padY)
      gl.uniform('velocity', velocity)
      gl.uniform('time', (now - t0) / 1000)
      gl.draw()
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
  }

  addEventListener('scroll', start, { passive: true })
}
