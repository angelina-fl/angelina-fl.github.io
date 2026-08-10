/**
 * 正文区背景：一层「纸上的光影」。
 *
 * 版式本身是去装饰的 Editorial，所以这层只做三件事：
 * 1) 光斑——淡金 / 胭脂 / 橄榄三团重度模糊的色晕，用 multiply 压在纸色上，
 *    像颜料透过纸背，而不是浮在字上面的色块；
 * 2) 光柱——从左上斜切下来的两道窗光，中间垫一道暗带，
 *    呼应侧栏那朵花的受光方向（光来自左上）；
 * 3) 鼠标——光斑按各自的「深度」跟着指针做视差，靠近指针的那团会亮起来，
 *    指针本身还拖着一小团奶油色的柔光。
 *
 * 漂移与视差合成在同一个 transform 里，所以统一交给一个 rAF 循环写 DOM，
 * 不用 CSS keyframes（那样两者会互相覆盖）。每帧只碰 transform / opacity，
 * 模糊后的图层不会重绘，只做合成。prefers-reduced-motion 时画一帧静态的就停。
 */
import { useEffect, useRef } from 'react'
import { useAnimationFrame } from 'framer-motion'

type BlobSpec = {
  /** 位置与尺寸（Tailwind 定位类） */
  cls: string
  bg: string
  /** 漂移：两个方向的半径（px）与角速度（rad/s），周期都在 18–30s，肉眼可察觉 */
  ax: number
  ay: number
  fx: number
  fy: number
  ph: number
  /** 视差深度（px）：正数跟着指针走，负数往反方向退，两者混着排才有前后关系 */
  dx: number
  dy: number
  /** 基础浓度 */
  o: number
}

const BLOBS: BlobSpec[] = [
  {
    // 淡金：右上角那团，最"远"，跟得最少
    cls: '-right-[14vw] -top-[22vh] h-[62vh] w-[56vw]',
    bg: 'radial-gradient(closest-side, rgba(207,188,133,0.46) 0%, rgba(207,188,133,0.18) 52%, rgba(207,188,133,0) 100%)',
    ax: 92,
    ay: 70,
    fx: 0.28,
    fy: 0.22,
    ph: 0,
    dx: 54,
    dy: 34,
    o: 1,
  },
  {
    // 胭脂：压在正文左侧，反向走位，和淡金错开
    cls: 'left-[4vw] top-[30vh] h-[62vh] w-[52vw]',
    bg: 'radial-gradient(closest-side, rgba(233,175,180,0.38) 0%, rgba(233,175,180,0.15) 55%, rgba(233,175,180,0) 100%)',
    ax: 112,
    ay: 86,
    fx: 0.24,
    fy: 0.31,
    ph: 2.2,
    dx: -90,
    dy: -54,
    o: 1,
  },
  {
    // 橄榄：垫在底部，最"近"，跟手最明显
    cls: '-bottom-[26vh] left-[26vw] h-[56vh] w-[62vw]',
    bg: 'radial-gradient(closest-side, rgba(95,100,69,0.26) 0%, rgba(95,100,69,0.1) 54%, rgba(95,100,69,0) 100%)',
    ax: 82,
    ay: 62,
    fx: 0.34,
    fy: 0.26,
    ph: 4.1,
    dx: 118,
    dy: 68,
    o: 1,
  },
  {
    // 奶油高光：唯一一处提亮，落在左上，作为整页的光源
    cls: '-left-[10vw] -top-[18vh] h-[70vh] w-[60vw]',
    bg: 'radial-gradient(closest-side, rgba(255,252,241,0.85) 0%, rgba(255,252,241,0.3) 58%, rgba(255,252,241,0) 100%)',
    ax: 66,
    ay: 52,
    fx: 0.2,
    fy: 0.25,
    ph: 5.3,
    dx: -48,
    dy: -32,
    o: 0.78,
  },
]

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export default function PaperGlow() {
  const blobRefs = useRef<Array<HTMLDivElement | null>>([])
  const shaftRefs = useRef<Array<HTMLDivElement | null>>([])
  const haloRef = useRef<HTMLDivElement>(null)

  /**
   * 每团色晕的静止中心与「感应半径」（视口坐标），只在尺寸变化时重算。
   * 半径跟着自身尺寸走——这些色晕本来就有大半个屏幕宽，
   * 用固定半径的话指针几乎永远在感应范围外。
   */
  const centers = useRef<Array<{ x: number; y: number; r: number }>>([])
  /**
   * 指针：t* 是原始位置，x/y 是慢跟随（色晕视差用，慢半拍才有重量），
   * hx/hy 是快跟随（指针柔光用，得贴着手走，不然像是另一个东西在飘）。
   */
  const ptr = useRef({ tx: 0, ty: 0, x: 0, y: 0, hx: 0, hy: 0, want: 0, hs: 0 })
  const reduced = useRef(false)
  const settled = useRef(false)

  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const measure = () => {
      centers.current = blobRefs.current.map((el) =>
        el
          ? {
              x: el.offsetLeft + el.offsetWidth / 2,
              y: el.offsetTop + el.offsetHeight / 2,
              r: Math.max(el.offsetWidth, el.offsetHeight) * 0.62,
            }
          : { x: 0, y: 0, r: 1 },
      )
      // 指针还没出现时，让一切以屏幕中心为准，免得首帧从左上角弹进来
      if (!ptr.current.want) {
        const p = ptr.current
        p.tx = p.x = p.hx = window.innerWidth / 2
        p.ty = p.y = p.hy = window.innerHeight / 2
      }
    }
    measure()

    const onMove = (e: MouseEvent) => {
      ptr.current.tx = e.clientX
      ptr.current.ty = e.clientY
      ptr.current.want = 1
    }
    const onLeave = () => {
      ptr.current.want = 0
    }

    window.addEventListener('resize', measure)
    if (!reduced.current) {
      window.addEventListener('mousemove', onMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeave)
    }
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  useAnimationFrame((time, delta) => {
    const still = reduced.current
    if (still && settled.current) return

    const dt = Math.min(delta, 34) / 1000
    const t = still ? 0 : time / 1000
    const p = ptr.current
    const w = window.innerWidth || 1
    const h = window.innerHeight || 1

    /*
     * 指针平滑：位置慢慢追（rate 低 → 光晕总是慢半拍，像有重量），
     * hs 是"指针在不在页面上"的软开关，用来收放视差和高光。
     * rate 3.6 在"有重量"和"跟手"之间取了平衡点，交互感明确但不生硬。
     */
    p.x += (p.tx - p.x) * Math.min(1, dt * 3.6)
    p.y += (p.ty - p.y) * Math.min(1, dt * 3.6)
    p.hx += (p.tx - p.hx) * Math.min(1, dt * 8)
    p.hy += (p.ty - p.hy) * Math.min(1, dt * 8)
    const wantTarget = still ? 0 : p.want
    p.hs += (wantTarget - p.hs) * Math.min(1, dt * 2.6)

    // 归一化到 -1..1，再乘各团的深度
    const nx = (p.x / w - 0.5) * 2
    const ny = (p.y / h - 0.5) * 2

    for (let i = 0; i < BLOBS.length; i++) {
      const b = BLOBS[i]
      const el = blobRefs.current[i]
      if (!el) continue

      const driftX = still ? 0 : Math.sin(t * b.fx + b.ph) * b.ax
      const driftY = still ? 0 : Math.cos(t * b.fy + b.ph * 0.7) * b.ay
      const x = driftX + nx * b.dx * p.hs
      const y = driftY + ny * b.dy * p.hs
      const scale = still ? 1 : 1 + Math.sin(t * b.fx * 0.6 + b.ph) * 0.09 + p.hs * 0.03

      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(4)})`

      // 靠近指针的那团明显变浓——不是发光，只是颜料被"看得更清"
      const c = centers.current[i]
      if (c) {
        const d = Math.hypot(p.x - (c.x + x), p.y - (c.y + y))
        const near = clamp(1 - d / c.r, 0, 1)
        el.style.opacity = (b.o * (1 + 0.85 * near * near * p.hs)).toFixed(3)
      }
    }

    /* 光柱：整体跟着指针横向摆动，指针越靠左（贴近光源）光柱越实 */
    const sway = still ? 0 : Math.sin(t * 0.14) * 1.1
    for (let i = 0; i < shaftRefs.current.length; i++) {
      const el = shaftRefs.current[i]
      if (!el) continue
      const lag = i === 1 ? 0.6 : 1 // 暗带跟得慢一些，和亮边拉开
      const rot = 20 + (sway + nx * 2.6 * p.hs) * lag
      const shift = (still ? 0 : Math.sin(t * 0.11 + i) * 18) + nx * 38 * p.hs * lag
      el.style.transform = `rotate(${rot.toFixed(2)}deg) translateX(${shift.toFixed(1)}px)`
      if (i !== 1) {
        el.style.opacity = (0.4 + 0.16 * (still ? 0 : Math.sin(t * 0.17 + i)) - nx * 0.12 * p.hs).toFixed(3)
      }
    }

    /* 指针柔光：一小团奶油色，落后指针半拍 */
    const halo = haloRef.current
    if (halo) {
      halo.style.transform = `translate3d(${(p.hx - 260).toFixed(1)}px, ${(p.hy - 260).toFixed(1)}px, 0)`
      halo.style.opacity = (p.hs * 0.65).toFixed(3)
    }

    if (still) settled.current = true
  })

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* 纸面基调：顶部提亮一点、底部压暖，先给整张纸一个上下的明暗差 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(168deg, rgba(255,253,247,0.9) 0%, rgba(250,248,241,0.35) 26%, rgba(244,242,236,0) 48%, rgba(238,233,220,0.5) 78%, rgba(233,227,210,0.72) 100%)',
        }}
      />

      {/* 光斑：各走各的周期，叠在一起就一直在缓慢换形 */}
      {BLOBS.map((b, i) => (
        <div
          key={i}
          ref={(el) => {
            blobRefs.current[i] = el
          }}
          className={`${i === 3 ? 'glow-highlight' : 'glow-blob'} absolute ${b.cls}`}
          style={{ background: b.bg, opacity: b.o }}
        />
      ))}

      {/* 窗光：两道斜光柱，宽的在前、窄的紧跟，末端渐隐免得切出硬边 */}
      <div
        ref={(el) => {
          shaftRefs.current[0] = el
        }}
        className="glow-shaft absolute -top-[60vh] left-[8vw] h-[220vh] w-[26vw]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,253,244,0) 0%, rgba(255,253,244,0.75) 42%, rgba(255,253,244,0.85) 58%, rgba(255,253,244,0) 100%)',
        }}
      />
      {/*
        光柱之间垫一道暗带。只有亮的那半边，纸只是"更白"；
        补上这条淡橄榄灰的影，两道光才真的像被什么挡出来的。
      */}
      <div
        ref={(el) => {
          shaftRefs.current[1] = el
        }}
        className="glow-shaft glow-shade absolute -top-[60vh] left-[30vw] h-[220vh] w-[15vw]"
        style={{
          background:
            'linear-gradient(90deg, rgba(120,118,96,0) 0%, rgba(120,118,96,0.16) 48%, rgba(120,118,96,0) 100%)',
        }}
      />
      <div
        ref={(el) => {
          shaftRefs.current[2] = el
        }}
        className="glow-shaft absolute -top-[60vh] left-[42vw] h-[220vh] w-[11vw]"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,252,238,0) 0%, rgba(255,252,238,0.62) 50%, rgba(255,252,238,0) 100%)',
        }}
      />

      {/* 指针柔光：只在桌面端出现，触屏没有"悬停"可言 */}
      <div
        ref={haloRef}
        className="glow-halo absolute left-0 top-0 hidden h-[520px] w-[520px] md:block"
        style={{
          background:
            'radial-gradient(closest-side, rgba(255,251,238,0.9) 0%, rgba(252,240,214,0.34) 46%, rgba(252,240,214,0) 100%)',
          opacity: 0,
        }}
      />

      {/* 颗粒：把上面所有渐变的色带压碎，纸感靠这层 */}
      <div className="bg-grain absolute inset-0 opacity-70" />

      {/* 四周收一圈暗角，正文那条版心才不会被光冲淡 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 42%, rgba(120,112,92,0) 52%, rgba(120,112,92,0.07) 82%, rgba(120,112,92,0.13) 100%)',
        }}
      />
    </div>
  )
}
