/**
 * Playful 层：一段第一人称独白，用打字机逐字打出来。
 *
 * 排版上是一页剧本：左边一条细线当装订线，上面一行舞台提示，
 * 下面是手写体的台词。为了不让字数增长把下文顶来顶去，
 * 每行都压着一份 invisible 的全文占位，真正在打的那份浮在上面。
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { siteContent, type MarkedSeg } from '@/content'

type Seg = MarkedSeg

const LINES: Seg[][] = siteContent.monologue.lines

const chars = (s: string) => [...s]

/** 打平成字符流，顺便记住每个字属于第几行、是不是行首 */
const FLAT = LINES.flatMap((line, li) => {
  let first = true
  return line.flatMap((seg) =>
    chars(seg.t).map((ch) => {
      const item = { ch, line: li, lineStart: first }
      first = false
      return item
    }),
  )
})
const TOTAL = FLAT.length

/** 标点后多停一会儿，模拟说话的断句 */
function delayFor(index: number) {
  if (index <= 0) return 0
  const prev = FLAT[index - 1].ch
  const base = 36
  if (FLAT[index].lineStart) return 260
  if ('。！？—'.includes(prev)) return base + 190
  if ('，、；：'.includes(prev)) return base + 110
  return base + Math.random() * 24
}

const markClass = (seg: Seg) =>
  seg.mark === 'gold' ? 'marker-blue marker' : seg.mark === 'pop' ? 'marker' : ''

function Line({ line, shown, cursor }: { line: Seg[]; shown: number; cursor: boolean }) {
  let consumed = 0
  return (
    <p className="relative">
      {/* 占位：始终是整行，负责撑出高度与换行 */}
      <span className="invisible" aria-hidden>
        {line.map((seg, i) => (
          <span key={i} className={markClass(seg)}>
            {seg.t}
          </span>
        ))}
      </span>

      {/* 实际打出来的那份 */}
      <span className="absolute inset-0" aria-hidden>
        {line.map((seg, i) => {
          const len = chars(seg.t).length
          const take = Math.max(0, Math.min(len, shown - consumed))
          consumed += len
          return (
            <span key={i} className={markClass(seg)}>
              {chars(seg.t).slice(0, take).join('')}
            </span>
          )
        })}
        {cursor && <span className="animate-caret-blink text-mark">▍</span>}
      </span>
    </p>
  )
}

/** 一次会话里只演一遍：来回切页时直接给全文，不再重打 */
let played = false

export default function Monologue({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const [pos, setPos] = useState(0)
  const [skipped, setSkipped] = useState(played)

  // 用户要求减少动效时直接给全文，不做任何动画
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setSkipped(true)
  }, [])

  useEffect(() => {
    if (!inView || skipped || pos >= TOTAL) return
    const timer = setTimeout(() => setPos((p) => p + 1), delayFor(pos))
    return () => clearTimeout(timer)
  }, [inView, skipped, pos])

  useEffect(() => {
    if (skipped || pos >= TOTAL) played = true
  }, [skipped, pos])

  const shown = skipped ? TOTAL : pos
  const done = shown >= TOTAL
  const typing = inView && !done

  // 每行各自已打出多少字
  const perLine = useMemo(() => {
    let rest = shown
    return LINES.map((line) => {
      const len = line.reduce((n, seg) => n + chars(seg.t).length, 0)
      const take = Math.max(0, Math.min(len, rest))
      rest -= len
      return take
    })
  }, [shown])

  const cursorLine = done ? -1 : FLAT[Math.min(shown, TOTAL - 1)].line

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => setSkipped(true)}
      className={`relative border-l border-rule py-1 pl-6 sm:pl-8 ${typing ? 'cursor-pointer' : ''} ${className}`}
    >
      <p className="sr-only">{LINES.map((l) => l.map((s) => s.t).join('')).join('')}</p>

      <div className="space-y-1 font-hand text-[20px] leading-[1.95] text-ink sm:text-[23px]">
        {LINES.map((line, i) => (
          <Line key={i} line={line} shown={perLine[i]} cursor={i === cursorLine} />
        ))}
      </div>

      {/* 打字期间给一个明确的出口，不逼人等 */}
      <div className="mt-3 h-4">
        {typing && (
          <button
            type="button"
            onClick={() => setSkipped(true)}
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-mark"
          >
            {siteContent.common.skip}
          </button>
        )}
      </div>
    </motion.div>
  )
}
