'use client'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

import textGL from '@/lib/textGL'

import css from './styles.module.css'

// The hover warp from zen-aperios/a-drift (AlphabetGlyph): each row of
// pixels slides sideways by two layered sine waves. There it's done by
// drawing 1px canvas strips; here a fragment shader does the same per pixel.
const FRAGMENT = `
precision mediump float;
uniform sampler2D text;
uniform vec2 size;
uniform float line;
uniform float phase;
uniform float amount;
uniform vec3 color;
varying vec2 uv;
void main() {
  float y = fract(uv.y * size.y / line) * 6.2832 * 1.4;
  float bend = sin(y + phase) * 0.72 + cos(y * 0.325 - phase * 0.7) * 0.28;
  float a = texture2D(text, uv - vec2(bend * amount / size.x, 0.0)).a;
  gl_FragColor = vec4(color * a, a);
}`

// Warp width as a share of the font size, and how fast the waves drift.
const WARP = 0.08
const SPEED = 0.003

const random = (min, max) => min + Math.random() * (max - min)

// A few copies of `logo` scattered over the left of `row`, in page pixels.
// Each is sized to the row's height and kept inside it.
function scatter(row) {
  const { left, top, width, height } = row.getBoundingClientRect()
  return Array.from({ length: Math.round(random(3, 5)) }, () => {
    const size = height * random(0.4, 0.8)
    return {
      x: scrollX + left + width * random(0.04, 0.36),
      y: scrollY + top + random(size / 2, height - size / 2),
      size,
      turn: random(-25, 25),
    }
  })
}

// `logo`, when given, is stamped in a few random spots while hovered.
export default function WaveLink({ href, logo, children }) {
  const linkRef = useRef(null)
  const state = useRef({ hovered: false, frame: 0 })
  const [stamps, setStamps] = useState([])

  function start() {
    const s = state.current
    s.hovered = true
    if (
      !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
        .matches
    )
      return
    // The row is the link's positioned ancestor, which its hit area fills.
    if (logo) setStamps(scatter(linkRef.current.offsetParent))
    if (s.frame) return
    const link = linkRef.current
    const amount = parseFloat(getComputedStyle(link).fontSize) * WARP
    const gl = textGL(link, FRAGMENT, Math.ceil(amount))
    if (!gl) return
    link.classList.add(css.warping)

    // Ease the warp in while hovered and out after, then hand back to the DOM text.
    const t0 = performance.now()
    let strength = 0
    const tick = (now) => {
      strength += ((s.hovered ? 1 : 0) - strength) * 0.12
      if (!s.hovered && strength < 0.01) {
        s.frame = 0
        link.classList.remove(css.warping)
        gl.destroy()
        return
      }
      gl.uniform('phase', (now - t0) * SPEED)
      gl.uniform('amount', amount * strength)
      gl.draw()
      s.frame = requestAnimationFrame(tick)
    }
    s.frame = requestAnimationFrame(tick)
  }

  return (
    <Link
      href={href}
      ref={linkRef}
      className={css.link}
      data-no-squiggle
      onPointerEnter={start}
      onPointerLeave={() => {
        state.current.hovered = false
        setStamps([])
      }}
    >
      {children}
      {stamps.length > 0 &&
        createPortal(
          stamps.map(({ x, y, size, turn }, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={logo}
              alt=""
              className={css.stamp}
              style={{
                left: x,
                top: y,
                height: size,
                '--turn': `${turn}deg`,
                animationDelay: `${i * 70}ms`,
              }}
            />
          )),
          document.body
        )}
    </Link>
  )
}
