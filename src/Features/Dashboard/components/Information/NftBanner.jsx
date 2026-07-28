import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { listBanners } from '../../../../services/banners'

const placeholders = [
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80',
  'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=600&q=80',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80',
  'https://images.unsplash.com/photo-1553729459-afe8f2e8b27c?w=600&q=80',
]

const NftBanner = () => {
  const [banners, setBanners] = useState([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    listBanners()
      .then(setBanners)
      .catch(() => setBanners([]))
      .finally(() => setLoading(false))
  }, [])

  const len = banners.length

  const goTo = useCallback((index) => {
    setCurrent((index + len) % len)
  }, [len])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (len < 2) return
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [next, len])

  if (loading) {
    return (
      <div className="bg-linear-to-r from-[#143F26] to-[#34A563] rounded-2xl w-full h-64 flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (len === 0) return null

  const banner = banners[current]

  const bgGradients = [
    'from-[#143F26] to-[#34A563]',
    'from-[#1a3a5c] to-[#2563eb]',
    'from-[#4a1a5c] to-[#7c3aed]',
    'from-[#5c2a1a] to-[#ea580c]',
  ]

  const gradient = bgGradients[current % bgGradients.length]

  return (
    <div className={`relative bg-linear-to-r ${gradient} rounded-2xl w-full overflow-hidden`}>
      <div className="w-full h-full flex flex-col md:flex-row items-center py-6 px-4 sm:px-8 md:space-x-24 relative z-10">
        <div className="flex flex-col space-y-4 flex-1">
          <div className="flex flex-col space-y-1">
            <h2 className="text-3xl font-semibold text-white">
              {banner.title}
            </h2>
            {banner.subtitle && (
              <p className="text-lg text-white/80 font-medium">
                {banner.subtitle}
              </p>
            )}
          </div>
          {banner.description && (
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              {banner.description}
            </p>
          )}
          {banner.buttonText && (
            <a
              href={banner.buttonLink || '#'}
              className="inline-flex items-center gap-2 text-[#FFFFFF] font-medium py-2.5 px-5 rounded-4xl border border-[#FFFFFF] hover:bg-white/10 transition-colors w-fit"
            >
              {banner.buttonText}
              <ArrowRight size={16} />
            </a>
          )}
        </div>

        {banner.imageUrl && (
          <div className="shrink-0 hidden md:block">
            <img
              src={banner.imageUrl}
              alt={banner.title}
              className="w-56 h-56 object-cover rounded-xl shadow-lg"
            />
          </div>
        )}
      </div>

      {len > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-1.5 transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all cursor-pointer ${
                  i === current
                    ? 'w-6 h-2 bg-white'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default NftBanner
