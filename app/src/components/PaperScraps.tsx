/**
 * 照片墙里的两张纸片：登机牌存根 + 音乐剧票根。
 *
 * 都是纯 DOM/CSS，没有图片：虚线是撕口，撕口两端各挖一个和纸面同色的小圆（打孔），
 * 条码是一条不等宽的 repeating-linear-gradient。它们是道具，不是正文，
 * 字号压得比正文小，但不低于 9px——再小就会被浏览器的"最小字号"设置顶上来。
 *
 * 尺寸由内容决定（w-fit + 每行 nowrap），不再按画布宽度取百分比：
 * 一来宽屏下不会被拉成一张大卡片，二来读者把字号调大时整张卡跟着变宽，
 * 而不是文字换行撑破卡面。
 */
import { siteContent } from '@/content'

const PASS = siteContent.pileCollage.boardingPass
const TICKET = siteContent.pileCollage.ticket

/** 撕口两端的打孔：颜色跟纸面一致，看起来就是被咬掉一口 */
function Notch({ className }: { className: string }) {
  return <span aria-hidden className={`absolute h-2 w-2 rounded-full bg-paper ${className}`} />
}

/* 不写 position：定位交给调用方传进来的 absolute（写了 relative 会盖掉它）。
   也不能 overflow-hidden——撕口两端那两个打孔是特意露在卡片外面的。 */
const CARD = 'photo-shadow flex rounded-[3px] border border-rule bg-paper-raised'

export function BoardingPass({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`${CARD} w-fit ${className}`}>
      <div className="px-2.5 py-[7px]">
        <p className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] text-ink-mute">
          {PASS.label}
        </p>
        <p className="mt-[3px] flex items-baseline gap-1 whitespace-nowrap font-display text-[15px] font-medium leading-none text-ink">
          {PASS.from}
          <span className="text-[10px] text-ink-mute">→</span>
          {PASS.to}
        </p>
        <p className="mt-[3px] whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute">
          {PASS.fromCity} · {PASS.toCity}
        </p>
        <p className="mt-[5px] whitespace-nowrap font-mono text-[9px] tracking-[0.1em] text-ink-soft">
          {PASS.passenger}
        </p>
      </div>

      {/* 副券：宽度跟着座位号/日期这两行走，不再吃主券的百分比 */}
      <div className="relative flex shrink-0 flex-col justify-between border-l border-dashed border-rule px-[9px] py-[7px]">
        <Notch className="-left-1 -top-1" />
        <Notch className="-bottom-1 -left-1" />
        <p className="whitespace-nowrap font-mono text-[9px] tracking-[0.1em] text-ink-soft">
          {PASS.seat}
        </p>
        <div
          className="my-[3px] h-[11px] w-full opacity-80"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, #15171B 0 1px, transparent 1px 3px, #15171B 3px 4.4px, transparent 4.4px 5px, #15171B 5px 5.7px, transparent 5.7px 7px)',
          }}
        />
        <p className="whitespace-nowrap font-mono text-[9px] tracking-[0.1em] text-ink-mute">
          {PASS.date}
        </p>
      </div>
    </div>
  )
}

/* 票根不走纸色：暗红打底 + 金色字，跟观剧小程序年度报告那张卡同一套主色 */
const WINE = '#4A1024'
const GOLD = '#D3AE6B'
const GOLD_BRIGHT = '#E5C78D'

export function TicketStub({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`photo-shadow flex w-fit rounded-[3px] border border-[#5E1A32] ${className}`}
      style={{ backgroundColor: WINE }}
    >
      <div className="relative shrink-0 px-2.5 py-[13px]">
        {/* 每行都锁死不换行：字号被浏览器抬高时整张票变宽，而不是文字折行撑破副券 */}
        <p
          className="whitespace-nowrap font-mono text-[9px] uppercase leading-[1.6] tracking-[0.1em]"
          style={{ color: GOLD, opacity: 0.75 }}
        >
          {TICKET.label}
        </p>
        <p
          className="mt-[3px] whitespace-nowrap font-mono text-[9px] tracking-[0.08em]"
          style={{ color: GOLD, opacity: 0.6 }}
        >
          {TICKET.no}
        </p>
        <Notch className="-right-1 -top-1" />
        <Notch className="-bottom-1 -right-1" />
      </div>

      <div
        className="border-l border-dashed px-2.5 py-[13px]"
        style={{ borderColor: 'rgba(211,174,107,0.35)' }}
      >
        <p
          className="whitespace-nowrap font-display text-[13px] leading-none tracking-[0.22em]"
          style={{ color: GOLD_BRIGHT }}
        >
          {TICKET.title}
        </p>
        <p
          className="mt-[5px] whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.12em]"
          style={{ color: GOLD, opacity: 0.7 }}
        >
          {TICKET.subtitle} · {TICKET.seat}
        </p>
      </div>
    </div>
  )
}
