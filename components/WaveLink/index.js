'use client'
import { useRef } from 'react'
import Link from 'next/link'

import css from './styles.module.css'

// The hover warp from zen-aperios/a-drift (AlphabetGlyph): each row of
// pixels slides sideways by two layered sine waves. There it's done by
// drawing 1px canvas strips; here a fragment shader does the same per pixel.
const VERTEX = `
attribute vec2 p;
varying vec2 uv;
void main() {
  uv = vec2(p.x, -p.y) * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`

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

export default function WaveLink({ href, children }) {
  const linkRef = useRef(null)
  const state = useRef({ hovered: false, frame: 0 })

  function start() {
    const s = state.current
    s.hovered = true
    if (s.frame) return
    if (
      !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
        .matches
    )
      return
    const link = linkRef.current
    const gl = setup(link)
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
      gl.draw((now - t0) * SPEED, strength)
      s.frame = requestAnimationFrame(tick)
    }
    s.frame = requestAnimationFrame(tick)
  }

  return (
    <Link
      href={href}
      ref={linkRef}
      className={css.link}
      onPointerEnter={start}
      onPointerLeave={() => (state.current.hovered = false)}
    >
      {children}
    </Link>
  )
}

// Draws the link's words where the browser laid them out into a texture, and
// puts a WebGL canvas over the link to show it. A fresh canvas per hover keeps
// at most one live context, well under the browser's cap.
function setup(link) {
  const node = link.firstChild
  if (node?.nodeType !== Node.TEXT_NODE) return null
  const style = getComputedStyle(link)
  const fontSize = parseFloat(style.fontSize)
  const pad = Math.ceil(fontSize * WARP)
  const box = link.getBoundingClientRect()
  const dpr = Math.min(devicePixelRatio || 1, 2)
  const width = box.width + pad * 2
  const height = box.height

  const text = document.createElement('canvas')
  text.width = width * dpr
  text.height = height * dpr
  const ctx = text.getContext('2d')
  ctx.scale(dpr, dpr)
  ctx.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  ctx.letterSpacing = style.letterSpacing
  const ascent = ctx.measureText('H').fontBoundingBoxAscent

  // A range per word gives each word's box on whichever line it wrapped to.
  // A word broken across lines has a box per line, so draw it per letter.
  const range = document.createRange()
  const draw = (text, start) => {
    range.setStart(node, start)
    range.setEnd(node, start + text.length)
    const rects = range.getClientRects()
    if (rects.length > 1 && [...text].length > 1) {
      for (const letter of text.matchAll(/./gsu))
        draw(letter[0], start + letter.index)
      return
    }
    ctx.fillText(
      text,
      rects[0].left - box.left + pad,
      rects[0].top - box.top + ascent
    )
  }
  for (const match of node.textContent.matchAll(/\S+/g))
    draw(match[0], match.index)

  const canvas = document.createElement('canvas')
  canvas.className = css.canvas
  canvas.width = text.width
  canvas.height = text.height
  link.append(canvas)
  // Place it from its containing block, which an inline link split over lines isn't.
  const origin = canvas.offsetParent.getBoundingClientRect()
  Object.assign(canvas.style, {
    width: `${width}px`,
    height: `${height}px`,
    left: `${box.left - origin.left - pad}px`,
    top: `${box.top - origin.top}px`,
  })
  const gl = canvas.getContext('webgl')
  if (!gl) {
    canvas.remove()
    return null
  }

  const program = gl.createProgram()
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, FRAGMENT],
  ]) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    gl.attachShader(program, shader)
  }
  gl.linkProgram(program)
  gl.useProgram(program)

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  )
  gl.enableVertexAttribArray(0)
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture())
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, text)

  const uniform = (name) => gl.getUniformLocation(program, name)
  const [r, g, b] = style.color.match(/[\d.]+/g).map(Number)
  gl.uniform3f(uniform('color'), r / 255, g / 255, b / 255)
  gl.uniform2f(uniform('size'), width, height)
  gl.uniform1f(uniform('line'), parseFloat(style.lineHeight) || fontSize * 1.25)
  const phase = uniform('phase')
  const amount = uniform('amount')

  return {
    draw(t, strength) {
      gl.uniform1f(phase, t)
      gl.uniform1f(amount, fontSize * WARP * strength)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    destroy() {
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      canvas.remove()
    },
  }
}
