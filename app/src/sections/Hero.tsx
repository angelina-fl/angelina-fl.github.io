import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { PageKey } from '@/components/Sidebar'
import { Underline } from '@/components/Doodle'
import portrait from '@/assets/gallery/portrait-cutout.webp'
import { siteContent } from '@/content'

const HOME = siteContent.home

/** 逐个元素依次入场 */
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero({ onNavigate }: { onNavigate: (p: PageKey) => void }) {
  return (
    <section id="top" className="relative sm:pb-16">
      {/* 眉题：栏目名 + 署名 */}
      <motion.div
        {...rise(0.05)}
        className="flex items-baseline justify-between border-b border-rule pb-3"
      >
        <p className="label-xs">{HOME.eyebrow}</p>
        <p className="label-xs normal-case tracking-[0.14em]">{HOME.signature}</p>
      </motion.div>

      {/* 陈述式大标题 */}
      <motion.h1
        {...rise(0.18)}
        className="mt-12 font-display text-[44px] font-medium leading-[0.98] tracking-[0.01em] text-ink sm:text-[58px]"
      >
        {HOME.titleLine1}
        <br />
        <span className="relative inline-block">
          {HOME.titleHighlight}
          <Underline className="-bottom-3.5 left-0 h-3 w-full" color="#234A22" delay={0.9} />
        </span>
        <span className="text-pop">{HOME.titleDot}</span>
      </motion.h1>

      <motion.p
        {...rise(0.3)}
        className="mt-9 max-w-[50ch] text-[15px] leading-[1.95] text-ink-soft sm:max-w-[330px] xl:max-w-[420px]"
      >
        {HOME.intro[0]}
      </motion.p>
      <motion.p
        {...rise(0.38)}
        className="mt-4 max-w-[50ch] text-[15px] leading-[1.95] text-ink-soft sm:max-w-[330px] xl:max-w-[420px]"
      >
        {HOME.intro[1]}
      </motion.p>

      {/* 关键词：纯文字排一行，不做胶囊 */}
      <motion.p {...rise(0.46)} className="mt-8 text-[12px] tracking-wide text-ink-mute">
        {HOME.keywords.map((k, i) => (
          <span key={k}>
            {i > 0 && <span className="mx-2.5 text-rule">/</span>}
            {k}
          </span>
        ))}
      </motion.p>

      {/* 入口：一个实心按钮 */}
      <motion.div {...rise(0.56)} className="relative mt-12 flex flex-wrap items-center gap-6">
        <button
          type="button"
          onClick={() => onNavigate('about')}
          className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-[13px] text-paper transition-colors hover:bg-mark hover:text-ink"
        >
          {HOME.primaryCta}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </motion.div>

      {/*
        职业照：已去背景，不套相框。桌面端贴着版心右下角，正好落在正文右侧；
        移动端没有"右侧"可言，就退回正文下方靠右收尾。
      */}
      <motion.figure
        {...rise(0.24)}
        className="pointer-events-none relative z-0 m-0 ml-auto mt-10 w-[62%] max-w-[240px] select-none sm:absolute sm:bottom-0 sm:right-0 sm:mt-0 sm:w-[272px] sm:max-w-none lg:w-[310px]"
      >
        {/* 原图在胸口就裁掉了，底边渐隐一小段，免得露出一道硬横切 */}
        <img
          src={portrait}
          alt={HOME.portraitAlt}
          draggable={false}
          className="w-full"
          style={{
            maskImage: 'linear-gradient(to bottom, #000 86%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, #000 86%, transparent 100%)',
          }}
        />
      </motion.figure>
    </section>
  )
}
