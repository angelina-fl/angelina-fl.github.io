/**
 * 技能页照片墙：像摊在编辑台上的一叠拍立得。
 * 相纸白边 + 手写说明 + 几笔手绘批注，桌面端向两侧展开，移动端保持紧凑。
 * 底下垫一层版式网格与裁切标记，照片之间再压两张纸片（登机牌 / 票根）当道具。
 */
import { useState } from 'react'
import PhotoLightbox from '@/components/PhotoLightbox'
import { BoardingPass, TicketStub } from '@/components/PaperScraps'
import pileStage from '@/assets/gallery/pile-stage.jpg'
import pileRehearsal from '@/assets/gallery/pile-rehearsal.jpg'
import pileSeaside from '@/assets/gallery/pile-seaside.jpg'
import pileMixer from '@/assets/gallery/pile-mixer.jpg'
import pilePaddle from '@/assets/gallery/pile-paddle.jpg'
import pileSpeech from '@/assets/gallery/pile-speech.jpg'
import pileCat from '@/assets/gallery/pile-cat.jpg'
import iconClaude from '@/assets/gallery/icon-claude.png'
import iconFigma from '@/assets/gallery/icon-figma.png'
import iconSql from '@/assets/gallery/icon-sql.png'
import { Arrow, HandNote } from '@/components/Doodle'
import { siteContent } from '@/content'

type Photo = {
  src: string
  alt: string
  caption?: string
  className: string
  imageClassName: string
}

/** 布局与图片留在组件里；alt / caption 文案统一在 content.ts 里改。
 *  层级刻意交错（z 值不递增），让照片有前有后地叠在一起。 */
const LAYOUT = [
  { id: 'bubble', src: pileCat, className: 'left-[1%] top-[15%] z-20 w-[15%] -rotate-6', imageClassName: 'aspect-[3/4] rounded-full' },
  { id: 'stage', src: pileStage, className: 'left-[13%] top-[1%] z-30 w-[27%] -rotate-2', imageClassName: 'aspect-[4/5]' },
  { id: 'rehearsal', src: pileRehearsal, className: 'left-[44%] top-[5%] z-10 w-[30%] rotate-2', imageClassName: 'aspect-[4/3]' },
  { id: 'majorca', src: pileSeaside, className: 'right-[2%] top-[9%] z-30 w-[19%] rotate-6', imageClassName: 'aspect-[3/4] rounded-full' },
  /* mixer 往左顶到边、再往上提一档：它的右上角正对着 stage 那张的 "on stage" 说明，
     只能靠"贴左边"腾出的距离换高度，再高说明文字就被压住了 */
  { id: 'mixer', src: pileMixer, className: 'left-[0%] top-[55%] z-30 w-[24%] rotate-3', imageClassName: 'aspect-[4/3]' },
  { id: 'speech', src: pileSpeech, className: 'left-[32%] top-[52%] z-10 w-[23%] -rotate-3', imageClassName: 'aspect-[3/4]' },
  { id: 'paddle', src: pilePaddle, className: 'left-[57%] top-[43%] z-20 w-[23%] rotate-3', imageClassName: 'aspect-[3/4]' },
]

const PHOTOS: Photo[] = LAYOUT.map((layout) => {
  const copy = siteContent.pileCollage.photos.find((p) => p.id === layout.id)
  return {
    ...layout,
    alt: copy?.alt ?? '',
    caption: copy?.caption ?? undefined,
  }
})

/**
 * 背景版式层：一张淡到几乎看不见的方格纸 + 四角裁切标记。
 * 网格用径向遮罩往四周化开，免得整块看起来像贴了张格子纸；
 * 裁切标记是印刷拼版留下的那种角线，给这堆照片一个"版心"。
 */
function Backdrop() {
  const corner = 'absolute h-4 w-4 border-ink-mute/25'
  return (
    /* 横向收在照片墙里侧一点：再往外就压到正文栏那两条竖线上了 */
    <div aria-hidden className="pointer-events-none absolute inset-x-2 -inset-y-6 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(141,139,133,0.15) 0 1px, transparent 1px 46px), repeating-linear-gradient(to bottom, rgba(141,139,133,0.15) 0 1px, transparent 1px 46px)',
          WebkitMaskImage: 'radial-gradient(115% 88% at 50% 46%, #000 30%, transparent 76%)',
          maskImage: 'radial-gradient(115% 88% at 50% 46%, #000 30%, transparent 76%)',
        }}
      />
      <span className={`${corner} left-0 top-0 border-l border-t`} />
      <span className={`${corner} right-0 top-0 border-r border-t`} />
      <span className={`${corner} bottom-0 left-0 border-b border-l`} />
      <span className={`${corner} bottom-0 right-0 border-b border-r`} />
    </div>
  )
}

export default function PileCollage() {
  /** null = 灯箱关着；否则是被点开的那张的下标 */
  const [openAt, setOpenAt] = useState<number | null>(null)

  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[980px] select-none sm:h-[620px]">
      <Backdrop />

      {PHOTOS.map((photo, i) => (
        <figure
          key={photo.src}
          className={`group absolute m-0 transition duration-300 ease-out hover:z-40 hover:rotate-0 hover:scale-[1.06] ${photo.className}`}
        >
          <button
            type="button"
            aria-label={`${siteContent.common.viewPhotoPrefix}${photo.alt}`}
            onClick={() => setOpenAt(i)}
            className={`block w-full cursor-zoom-in outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pop ${
              photo.imageClassName.includes('rounded-full') ? 'rounded-full' : 'photo-shadow'
            }`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              draggable={false}
              className={`h-full w-full object-cover ${photo.imageClassName} ${
                photo.imageClassName.includes('rounded-full')
                  ? 'shadow-[0_10px_24px_-14px_rgba(30,26,20,0.6)]'
                  : ''
              }`}
            />
          </button>
          {photo.caption && (
            <figcaption className="mt-1.5 text-center font-hand text-[15px] leading-tight text-ink-mute">
              {photo.caption}
            </figcaption>
          )}
        </figure>
      ))}

      <img
        src={iconFigma}
        alt="Figma"
        className="absolute left-[38%] top-[25%] z-30 h-11 w-11 -rotate-12 rounded-xl shadow-[0_10px_22px_-12px_rgba(30,26,20,0.55)] transition hover:scale-110 sm:h-14 sm:w-14"
      />
      {/* Claude 只留那朵花，没有底板：投影得跟着花瓣形状走，用 drop-shadow 而不是 box-shadow */}
      <img
        src={iconClaude}
        alt="Claude"
        className="absolute right-[20%] top-[32%] z-30 h-12 w-12 rotate-6 drop-shadow-[0_6px_10px_rgba(30,26,20,0.28)] transition hover:scale-110 sm:h-16 sm:w-16"
      />

      <img
        src={iconSql}
        alt="SQL"
        className="absolute left-[72%] top-[4%] z-30 h-11 w-11 rotate-3 rounded-xl shadow-[0_10px_22px_-12px_rgba(30,26,20,0.55)] transition hover:scale-110 sm:h-14 sm:w-14"
      />

      {/*
        手写批注 + 弯箭头。写在照片墙上方的空白里，钩子往右下落到 Majorca 那张圆照片。
        批注和箭头都跟着照片一起用百分比定位（箭头 w-[7%] + aspect 锁死比例），
        所以窗口变宽变窄时，笔画的起点仍压在"Solo Trip"下面、箭尖仍停在圆照片外沿——
        放在页眉那一行里的话，那行按正文栏宽走，和照片墙差 96px 的出血，指哪儿全看窗口。
      */}
      <span className="pointer-events-none absolute left-[71.6%] top-[-6.5%] z-40">
        <HandNote rotate={-3} className="text-ink-mute">
          {siteContent.common.casualShots}
        </HandNote>
      </span>
      {/* 箭尖落在圆照片外沿 12px 处，方向对着圆心——用 hook-down 那一钩，收笔是扎下去的 */}
      <Arrow
        className="left-[71.6%] top-[-1.7%] z-40 aspect-[114/74] w-[72px] sm:top-[-3.2%] sm:w-[12.4%]"
        variant="hook-down"
        color="#234A22"
        delay={0.5}
        strokeWidth={1.8}
      />

      {/*
        两张纸片。窄屏放不下这么小的字，也没有空位，sm 以下直接不出现。
        登机牌 z-30 压在 golden hour 右下角上面（避开画面里的人和下面那行说明）；票根摊在最下面一排。
      */}
      <BoardingPass className="absolute right-[1%] top-[68%] z-30 hidden w-[20%] rotate-[5deg] sm:flex" />
      <TicketStub className="absolute left-[3%] top-[90%] z-20 hidden w-[28%] rotate-[2deg] sm:flex" />

      <PhotoLightbox
        photos={PHOTOS.map((p) => p.src)}
        startAt={openAt ?? 0}
        open={openAt !== null}
        onClose={() => setOpenAt(null)}
      />
    </div>
  )
}
