import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { siteContent } from '@/content'

const PAPER = siteContent.paper
const COMMON = siteContent.common
const PARAGRAPHS = PAPER.paragraphs

export default function AbstractPaper({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  // 打开时锁定背景滚动，并支持 Esc 关闭
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    // 外层常驻并由 open 直接控制点击权：退场动画未完成时也不会挡住页面
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
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
          {/* 背景压暗 */}
          <div
            className="absolute inset-0 bg-[#0f1720]/45 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          {/* 纸张 */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={PAPER.ariaLabel}
            initial={{ opacity: 0, y: 26, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-h-[88vh] w-full max-w-2xl overflow-hidden rounded-[3px] bg-[#fbfaf5] shadow-[0_2px_0_rgba(255,255,255,0.7)_inset,0_40px_90px_-28px_rgba(15,23,32,0.6)]"
          >
            {/* 纸纹 + 装订侧的淡淡阴影 */}
            <div className="pointer-events-none absolute inset-0 bg-grain opacity-70" aria-hidden />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-10"
              style={{
                background:
                  'linear-gradient(to right, rgba(120,108,86,0.10), rgba(120,108,86,0) 100%)',
              }}
              aria-hidden
            />

            <button
              type="button"
              onClick={onClose}
              aria-label={COMMON.close}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-[#8a8577] transition-colors hover:bg-[#efece2] hover:text-[#4a463c]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative max-h-[88vh] overflow-y-auto px-8 py-12 md:px-16 md:py-16">
              {/* 页眉 */}
              <div className="mb-10 border-b border-[#e0dccf] pb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#a09a89]">
                  {PAPER.kicker}
                </p>
                <h3 className="font-paper mt-4 text-2xl font-bold text-[#1d1a14]">{PAPER.title}</h3>
                <p className="font-paper mt-2 text-sm italic leading-relaxed text-[#6b6558]">
                  {PAPER.question}
                </p>
              </div>

              {/* 正文 */}
              <div className="font-paper space-y-6 text-justify text-[15px] leading-[1.95] text-[#241f18] hyphens-auto">
                {PARAGRAPHS.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>

              {/* 页脚 */}
              <div className="mt-12 flex items-center justify-between border-t border-[#e0dccf] pt-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#a09a89]">
                  {PAPER.footerLeft}
                </p>
                <p className="font-paper text-xs italic text-[#a09a89]">{PAPER.footerRight}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
