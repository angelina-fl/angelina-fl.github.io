/**
 * 摄影集：一叠照片沿对角线撒开——左下角最前，向右上一片片铺开，
 * 每片略带自己的斜度，像摊在桌上随手推开的一把照片。
 *
 * 鼠标（或键盘焦点）落在哪张，哪张就转正、抬起、放大到看得清；
 * 再点一下进灯箱看大图。
 */
import { useState } from 'react'
import { motion } from 'framer-motion'
import PhotoLightbox from './PhotoLightbox'
import { useContent } from '@/i18n'

/* 文件名补了零，按键排序就是拍摄集的既定顺序 */
const pick = (glob: Record<string, unknown>) =>
  Object.keys(glob)
    .sort()
    .map((k) => glob[k] as string)

const CARDS = pick(
  import.meta.glob('../assets/gallery/album/card-*.webp', { eager: true, import: 'default' }),
)
const FULLS = pick(
  import.meta.glob('../assets/gallery/album/full-*.webp', { eager: true, import: 'default' }),
)

const N = CARDS.length
const CARD_W = 84
const CARD_H = CARD_W * (4 / 3)
/** 每往右上走一张，纵向固定抬这么多；横向由容器宽度均分 */
const STEP_Y = 22
/** 悬停时向上多抬的富余量，容器高度要把它留出来 */
const HOVER_LIFT = 20
/** 每张照片自己的斜度（度），交错摆才有"随手撒开"的感觉 */
const TILTS = [-3, 2.4, -1.6, 3.2, -2.6, 1.2, -3.4, 2.8, -1, 3.6, -2.2]

export default function PhotoBox() {
  const { common: COMMON, photoBox } = useContent()
  const ALT = photoBox.alts
  const [active, setActive] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [startAt, setStartAt] = useState(0)

  return (
    <div>
      <div
        className="relative select-none"
        style={{ height: CARD_H + (N - 1) * STEP_Y + HOVER_LIFT + 14 }}
        onMouseLeave={() => setActive(null)}
      >
        {CARDS.map((src, i) => {
          const t = N > 1 ? i / (N - 1) : 0.5
          const on = active === i

          return (
            <motion.button
              key={src}
              type="button"
              aria-label={`${COMMON.viewPhotoPrefix}${ALT[i] ?? ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => {
                setStartAt(i)
                setOpen(true)
              }}
              className="absolute origin-center rounded-[2px] outline-none"
              style={{
                width: CARD_W,
                height: CARD_H,
                // 对角线：整体贴住栏的右缘，越靠前的照片越往左下退
                right: `calc(${1 - t} * (100% - ${CARD_W}px))`,
                bottom: i * STEP_Y,
                // 左下角那张压在最上面，往右上依次垫后
                zIndex: on ? 60 : N - i,
              }}
              animate={{
                rotate: on ? 0 : TILTS[i % TILTS.length],
                y: on ? -HOVER_LIFT : 0,
                scale: on ? 1.45 : 1,
              }}
              transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            >
              <img
                src={src}
                alt=""
                draggable={false}
                className="h-full w-full rounded-[2px] object-cover"
                style={{
                  boxShadow: on
                    ? '0 12px 24px -8px rgba(30,26,20,0.45)'
                    : '0 3px 8px -3px rgba(30,26,20,0.5)',
                }}
              />
            </motion.button>
          )
        })}
      </div>

      <PhotoLightbox
        photos={FULLS}
        startAt={startAt}
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}
