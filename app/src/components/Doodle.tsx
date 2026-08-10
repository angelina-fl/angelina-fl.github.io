/**
 * Playful 层：一组手绘感的批注笔迹（圈、下划线、箭头、波浪、星号）。
 * 全部是 SVG 线稿，进入视口时按笔画"画"出来，默认不接收指针事件，
 * 只作为排版之上的一层注记，不参与布局。
 */
import { motion } from 'framer-motion'

type MarkProps = {
  className?: string
  /** 线条颜色，默认取页面重点色 */
  color?: string
  delay?: number
  strokeWidth?: number
}

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, margin: '-40px' },
  transition: {
    pathLength: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
    opacity: { duration: 0.12, delay },
  },
})

/** 随手圈出来的一圈（末尾故意画过头一点） */
export function CircleMark({
  className = '',
  color = '#234A22',
  delay = 0,
  strokeWidth = 2,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 44"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
    >
      <motion.path
        d="M60 5C89 4 115 10 114 21c-1 12-27 18-56 18S3 33 4 21C5 10 32 4 66 6"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...draw(delay)}
      />
    </svg>
  )
}

/** 手划的下划线：两笔，第二笔略微错开 */
export function Underline({
  className = '',
  color = '#234A22',
  delay = 0,
  strokeWidth = 2.5,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 200 14"
      fill="none"
      aria-hidden
      preserveAspectRatio="none"
      className={`pointer-events-none absolute ${className}`}
    >
      <motion.path
        d="M4 8c34-4 76-5 116-4 30 1 55 3 76 5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        {...draw(delay)}
      />
      <motion.path
        d="M18 12c40-3 92-4 140-2"
        stroke={color}
        strokeWidth={strokeWidth * 0.5}
        strokeLinecap="round"
        opacity={0.5}
        vectorEffect="non-scaling-stroke"
        {...draw(delay + 0.18)}
      />
    </svg>
  )
}

type ArrowProps = MarkProps & {
  /** 弯钩方向：向下右 / 向下左 / 向右 / 先向右再兜头扎下去 */
  variant?: 'down-right' | 'down-left' | 'right' | 'hook-down'
}

/** 指向某处的弯箭头 */
export function Arrow({
  className = '',
  color = '#234A22',
  delay = 0,
  strokeWidth = 2,
  variant = 'down-right',
}: ArrowProps) {
  const paths = {
    'down-right': {
      body: 'M6 6c2 22 14 38 44 44',
      head: 'M36 40l14 10-4 15',
      box: '0 0 60 62',
    },
    'down-left': {
      body: 'M54 6C52 28 40 44 10 50',
      head: 'M24 40L10 50l4 15',
      box: '0 0 60 62',
    },
    right: {
      body: 'M4 26c18-14 44-18 66-14',
      head: 'M56 2l14 10-11 12',
      box: '0 0 76 34',
    },
    /*
      甩出去再兜回来扎下去的一钩：收笔方向约 67°，箭头是照着这个切线算的，
      所以它是真的"扎向"下方那个目标，而不是从旁边擦过去。
      viewBox 贴着笔画本身（只留一点余量），换算位置时直接按 38/34 这两个坐标推箭尖。
    */
    'hook-down': {
      body: 'M6 4c34 4 86 26 100 64',
      head: 'M109 54L106 68l-11-9',
      box: '0 0 114 74',
    },
  }[variant]

  return (
    <svg
      viewBox={paths.box}
      fill="none"
      aria-hidden
      className={`pointer-events-none absolute ${className}`}
    >
      <motion.path
        d={paths.body}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...draw(delay)}
      />
      <motion.path
        d={paths.head}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(delay + 0.4)}
      />
    </svg>
  )
}

/** 波浪线：段落之间的呼吸 */
export function Squiggle({
  className = '',
  color = '#C9C3B5',
  delay = 0,
  strokeWidth = 2,
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 12"
      fill="none"
      aria-hidden
      className={`pointer-events-none ${className}`}
    >
      <motion.path
        d="M2 8c8-8 16 8 24 0s16 8 24 0 16 8 24 0 16 8 24 0"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        {...draw(delay)}
      />
    </svg>
  )
}

/** 手绘星号：给"重点"做记号 */
export function Asterisk({
  className = '',
  color = '#234A22',
  delay = 0,
  strokeWidth = 2,
}: MarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={`pointer-events-none ${className}`}>
      <motion.path d="M12 3v18" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...draw(delay)} />
      <motion.path d="M4 7.5l16 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...draw(delay + 0.1)} />
      <motion.path d="M20 7.5l-16 9" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" {...draw(delay + 0.2)} />
    </svg>
  )
}

/** 手写注记：页边空白处那句随手写下的话 */
export function HandNote({
  children,
  className = '',
  rotate = -4,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  rotate?: number
  delay?: number
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay }}
      style={{ rotate: `${rotate}deg` }}
      className={`inline-block font-hand text-[17px] leading-tight text-mark ${className}`}
    >
      {children}
    </motion.span>
  )
}
