/**
 * 照片墙里的两张纸片：登机牌存根 + 音乐剧票根。
 *
 * 都是纯 DOM/CSS，没有图片：虚线是撕口，撕口两端各挖一个和纸面同色的小圆（打孔），
 * 条码是一条不等宽的 repeating-linear-gradient。字号故意压到 6–7px——
 * 它们是道具，不是正文，读得出是什么就够了。
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
    <div aria-hidden className={`${CARD} ${className}`}>
      <div className="flex-1 px-2 py-[7px]">
        <p className="font-mono text-[6px] uppercase tracking-[0.2em] text-ink-mute">{PASS.label}</p>
        <p className="mt-[3px] flex items-baseline gap-1 font-display text-[13px] font-medium leading-none text-ink">
          {PASS.from}
          <span className="text-[9px] text-ink-mute">→</span>
          {PASS.to}
        </p>
        <p className="mt-[3px] font-mono text-[6px] uppercase tracking-[0.14em] text-ink-mute">
          {PASS.fromCity} · {PASS.toCity}
        </p>
        <p className="mt-[5px] font-mono text-[6px] tracking-[0.1em] text-ink-soft">{PASS.passenger}</p>
      </div>

      {/* 副券 */}
      <div className="relative flex w-[36%] flex-col justify-between border-l border-dashed border-rule px-[7px] py-[7px]">
        <Notch className="-left-1 -top-1" />
        <Notch className="-bottom-1 -left-1" />
        <p className="font-mono text-[6px] tracking-[0.1em] text-ink-soft">{PASS.seat}</p>
        <div
          className="my-[3px] h-[11px] w-full opacity-80"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to right, #15171B 0 1px, transparent 1px 3px, #15171B 3px 4.4px, transparent 4.4px 5px, #15171B 5px 5.7px, transparent 5.7px 7px)',
          }}
        />
        <p className="font-mono text-[6px] tracking-[0.1em] text-ink-mute">{PASS.date}</p>
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
      className={`photo-shadow flex rounded-[3px] border border-[#5E1A32] ${className}`}
      style={{ backgroundColor: WINE }}
    >
      <div className="relative w-[34%] px-2.5 py-[13px]">
        {/* 窄屏下这行会断成两行，撑破副券——字距收一点并锁死不换行 */}
        <p
          className="whitespace-nowrap font-mono text-[6px] uppercase leading-[1.6] tracking-[0.1em]"
          style={{ color: GOLD, opacity: 0.75 }}
        >
          {TICKET.label}
        </p>
        <p
          className="mt-[3px] font-mono text-[7px] tracking-[0.08em]"
          style={{ color: GOLD, opacity: 0.6 }}
        >
          {TICKET.no}
        </p>
        <Notch className="-right-1 -top-1" />
        <Notch className="-bottom-1 -right-1" />
      </div>

      <div
        className="flex-1 border-l border-dashed px-2.5 py-[13px]"
        style={{ borderColor: 'rgba(211,174,107,0.35)' }}
      >
        <p
          className="font-display text-[12px] leading-none tracking-[0.22em]"
          style={{ color: GOLD_BRIGHT }}
        >
          {TICKET.title}
        </p>
        <p
          className="mt-[5px] font-mono text-[6px] uppercase tracking-[0.12em]"
          style={{ color: GOLD, opacity: 0.7 }}
        >
          {TICKET.subtitle} · {TICKET.seat}
        </p>
      </div>
    </div>
  )
}
