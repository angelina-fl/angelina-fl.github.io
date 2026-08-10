import type { ReactNode } from 'react'
import Reveal from './Reveal'

/**
 * Editorial 栏目头：眉题（栏目名 + 编号）压一条细线，
 * 下面是一句陈述式大标题，再跟一段小字导语。
 */
export default function SectionHeading({
  index,
  en,
  title,
  lede,
}: {
  index: string
  en: string
  title: ReactNode
  lede?: ReactNode
}) {
  return (
    <Reveal>
      <header className="mb-12">
        <div className="flex items-baseline justify-between border-b border-rule pb-3">
          <p className="label-xs">{en}</p>
          <p className="font-mono text-[10px] tracking-[0.18em] text-ink-mute">{index}</p>
        </div>

        <h2 className="mt-7 font-display text-[32px] font-medium leading-[1.12] tracking-[0.08em] text-ink md:text-[42px]">
          {title}
        </h2>

        {/*
          导语跟着版心走，不再用固定的 ch 宽度掐断：ch 量的是西文 “0” 的宽度，
          中文里换算不准，宽屏上会在版心六成的地方就折行，末行剩几个字很难看。
          text-pretty 再顺手把孤字挤回上一行。
        */}
        {lede && (
          <p className="mt-4 whitespace-pre-line text-pretty text-[14px] leading-[1.85] text-ink-soft">
            {lede}
          </p>
        )}
      </header>
    </Reveal>
  )
}
