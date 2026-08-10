import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { siteContent } from '@/content'

const COMMON = siteContent.common

/**
 * 照片查看器：点击图片左半边翻上一张、右半边翻下一张，到头自动绕回另一端。
 * 只有图片与页码，不放任何说明文字。
 * 超高长图（如整页截图）不压缩适配，改为接近原宽显示、可上下滚动浏览；
 * 长图要上下拖着读，图上不做点击分区，翻页交给两侧箭头。
 */
export default function PhotoLightbox({
  photos,
  startAt = 0,
  open,
  onClose,
}: {
  photos: string[]
  startAt?: number
  open: boolean
  onClose: () => void
}) {
  const [index, setIndex] = useState(startAt)
  /** 记录每张图的天然高宽比，超过 TALL_RATIO 视为长图 */
  const [ratios, setRatios] = useState<Record<string, number>>({})
  const scrollRef = useRef<HTMLDivElement>(null)

  const TALL_RATIO = 2.6
  const isTall = (ratios[photos[index]] ?? 0) > TALL_RATIO

  const recordRatio = (img: HTMLImageElement) => {
    if (!img.naturalWidth) return
    const r = img.naturalHeight / img.naturalWidth
    setRatios((m) => (m[img.src] === r ? m : { ...m, [img.src]: r }))
  }

  // 每次打开都从被点击的那张开始
  useEffect(() => {
    if (open) setIndex(startAt)
  }, [open, startAt])

  // 切换长图时滚动条回到顶部
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [index])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % photos.length)
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + photos.length) % photos.length)
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, photos.length])

  /* 挂到 body 上再渲染：灯箱原地渲染时会被外层的 z-10 容器关进同一个层叠上下文，
     自身 z-[60] 只在那层里比大小，照片墙里的图仍会盖在灯箱上面。 */
  return createPortal(
    // 外层常驻，点击权由 open 直接控制：退场动画未结束时也不会挡住页面
    <div
      className="fixed inset-0 z-[60]"
      style={{ pointerEvents: open ? 'auto' : 'none' }}
    >
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="absolute inset-0 bg-[#0f1720]/70 backdrop-blur-sm"
              onClick={onClose}
              aria-hidden
            />

            <button
              type="button"
              onClick={onClose}
              aria-label={COMMON.close}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative flex flex-col items-center gap-5">
              {isTall ? (
                /* 长图：接近原宽展示，上下滚动浏览；两侧箭头翻页 */
                <div className="flex items-center gap-3 md:gap-5">
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
                    aria-label={COMMON.prevPhoto}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>

                  <div
                    ref={scrollRef}
                    className="relative h-[78vh] w-[min(80vw,440px)] overflow-y-auto overscroll-contain rounded-xl shadow-[0_30px_80px_-24px_rgba(0,0,0,0.7)] [scrollbar-width:thin]"
                  >
                    <AnimatePresence initial={false}>
                      <motion.img
                        key={index}
                        src={photos[index]}
                        alt={`剧日记截图 ${index + 1}`}
                        onLoad={(e) => recordRatio(e.currentTarget)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%' }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="h-auto w-full"
                        draggable={false}
                      />
                    </AnimatePresence>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % photos.length)}
                    aria-label={COMMON.nextPhoto}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                /* 普通照片：图片自己就是翻页区，左半边往回、右半边往下 */
                <div className="relative block max-h-[78vh] overflow-hidden rounded-xl shadow-[0_30px_80px_-24px_rgba(0,0,0,0.7)]">
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={index}
                      src={photos[index]}
                      alt={`演出现场照片 ${index + 1}`}
                      onLoad={(e) => recordRatio(e.currentTarget)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, position: 'absolute' }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="inset-0 max-h-[78vh] w-auto object-contain"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {photos.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setIndex((i) => (i - 1 + photos.length) % photos.length)}
                        aria-label={COMMON.prevPhoto}
                        className="group absolute inset-y-0 left-0 flex w-1/2 cursor-w-resize items-center justify-start pl-3 focus:outline-none"
                      >
                        <ChevronLeft className="h-6 w-6 text-white/0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-colors duration-200 group-hover:text-white/80 group-focus-visible:text-white/80" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setIndex((i) => (i + 1) % photos.length)}
                        aria-label={COMMON.nextPhoto}
                        className="group absolute inset-y-0 right-0 flex w-1/2 cursor-e-resize items-center justify-end pr-3 focus:outline-none"
                      >
                        <ChevronRight className="h-6 w-6 text-white/0 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] transition-colors duration-200 group-hover:text-white/80 group-focus-visible:text-white/80" />
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* 页码与圆点 */}
              <div className="flex items-center gap-4">
                <span className="font-mono text-[11px] tracking-widest text-white/55">
                  {String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
                </span>
                {isTall && (
                  <span className="text-[11px] tracking-wide text-white/45">{COMMON.tallPhotoHint}</span>
                )}
                <div className="flex items-center gap-2">
                  {photos.map((p, n) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setIndex(n)}
                      aria-label={`第 ${n + 1} 张`}
                      aria-current={n === index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        n === index ? 'w-5 bg-white/85' : 'w-1.5 bg-white/35 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>,
    document.body,
  )
}
