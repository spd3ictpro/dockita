import { useState, useEffect, useCallback } from 'react'

export default function Lightbox({ images, initialIndex, onClose }) {
  const [idx, setIdx] = useState(initialIndex || 0)

  const prev = useCallback(() => setIdx(i => (i > 0 ? i - 1 : images.length - 1)), [images.length])
  const next = useCallback(() => setIdx(i => (i < images.length - 1 ? i + 1 : 0)), [images.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>&times;</button>

      {images.length > 1 && (
        <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prev() }}>&lsaquo;</button>
      )}

      <div className="lightbox-content" onClick={e => e.stopPropagation()}>
        <img src={images[idx]} alt="" className="lightbox-image" />
      </div>

      {images.length > 1 && (
        <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); next() }}>&rsaquo;</button>
      )}

      {images.length > 1 && (
        <div className="lightbox-dots">
          {images.map((_, i) => (
            <button key={i} className={`lightbox-dot${i === idx ? ' active' : ''}`} onClick={() => setIdx(i)} />
          ))}
        </div>
      )}
    </div>
  )
}
