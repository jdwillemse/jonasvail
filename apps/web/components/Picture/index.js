// An image from lib/images.js: its smaller formats as sources, the last as
// the fallback.
export default function Picture({ image, alt = '', sizes, className, style }) {
  const formats = Object.values(image)
  const fallback = formats.at(-1)
  const largest = fallback.at(-1)
  return (
    <picture>
      {formats.slice(0, -1).map((format) => (
        <source
          key={format[0].sourceType}
          type={format[0].sourceType}
          srcSet={format.map((size) => size.srcset).join(', ')}
          sizes={sizes}
        />
      ))}
      <img
        src={largest.url}
        srcSet={fallback.map((size) => size.srcset).join(', ')}
        sizes={sizes}
        width={largest.width}
        height={largest.height}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        style={style}
      />
    </picture>
  )
}
