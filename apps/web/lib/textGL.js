const VERTEX = `
attribute vec2 p;
varying vec2 uv;
void main() {
  uv = vec2(p.x, -p.y) * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`

// Draws an element's words where the browser laid them out into a texture, and
// puts a WebGL canvas over the element to show them through `fragment`. The
// canvas overhangs the text by `padX`/`padY` so the shader has room to move it.
// The shader gets `text`, `size` (canvas px), `line` (line height px) and
// `color`; set the rest with `uniform`. Returns null if the element isn't one
// text node or WebGL is unavailable.
export default function textGL(el, fragment, padX, padY = 0) {
  const node = el.firstChild
  if (node?.nodeType !== Node.TEXT_NODE || node.nextSibling) return null
  const style = getComputedStyle(el)
  const fontSize = parseFloat(style.fontSize)
  const box = el.getBoundingClientRect()
  const dpr = Math.min(devicePixelRatio || 1, 2)
  const width = box.width + padX * 2
  const height = box.height + padY * 2

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
      rects[0].left - box.left + padX,
      rects[0].top - box.top + padY + ascent
    )
  }
  for (const match of node.textContent.matchAll(/\S+/g))
    draw(match[0], match.index)

  const canvas = document.createElement('canvas')
  canvas.width = text.width
  canvas.height = text.height
  el.append(canvas)
  // Place it from its containing block, which an inline element split over lines isn't.
  const origin = canvas.offsetParent.getBoundingClientRect()
  Object.assign(canvas.style, {
    position: 'absolute',
    pointerEvents: 'none',
    width: `${width}px`,
    height: `${height}px`,
    left: `${box.left - origin.left - padX}px`,
    top: `${box.top - origin.top - padY}px`,
  })
  const gl = canvas.getContext('webgl')
  if (!gl) {
    canvas.remove()
    return null
  }

  const program = gl.createProgram()
  for (const [type, source] of [
    [gl.VERTEX_SHADER, VERTEX],
    [gl.FRAGMENT_SHADER, fragment],
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

  const locations = {}
  const uniform = (name, ...values) =>
    gl[`uniform${values.length}f`](
      (locations[name] ??= gl.getUniformLocation(program, name)),
      ...values
    )
  const [r, g, b] = style.color.match(/[\d.]+/g).map(Number)
  uniform('color', r / 255, g / 255, b / 255)
  uniform('size', width, height)
  uniform('line', parseFloat(style.lineHeight) || fontSize * 1.25)

  return {
    uniform,
    draw() {
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },
    destroy() {
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      canvas.remove()
    },
  }
}
