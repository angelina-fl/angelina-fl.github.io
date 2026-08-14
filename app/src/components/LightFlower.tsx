/**
 * 侧边栏背景：一朵「光影之花」。
 *
 * 视觉上不是一朵画出来的花，而是光打在花瓣上留下的影子——
 * 两层叠加：投影（橄榄灰）／受光（奶油·胭脂·淡金），
 * 全部重度模糊，做出照片里那种梦境般的散射与朦胧感。
 *
 * 交互：鼠标靠近侧栏时，花瓣像被风吹开一样错落转动（每片刚度不同 → 有先后的涟漪感）；
 * 鼠标离开后缓慢收回。始终保持一层极慢的「呼吸」——缩放 + 微幅摆动 + 光晕明暗。
 *
 * 动画用一个手写的弹簧积分器直接写 SVG 属性，避免每片花瓣挂三套 motion value。
 */
import { useEffect, useRef } from 'react'
import { useAnimationFrame, useMotionValue } from 'framer-motion'

/* 画布坐标系：窄长一条，花心压在偏下方，花瓣向上散开、被侧栏裁切 */
const VW = 216
const VH = 860
const CX = 98
const CY = 820

type PetalSpec = {
  /** 基准角度，0 = 朝正上；负数偏左 */
  a: number
  /** 长度系数 */
  len: number
  /** 宽度系数 */
  w: number
  /** 弹簧刚度：越小越"软"，被风吹动时落后越多 */
  k: number
  /** 阻尼 */
  c: number
  /** 呼吸频率 / 相位 */
  f: number
  ph: number
  /** 受光色调：a 偏胭脂、b 偏淡金——相邻瓣错开，重叠处才分得出层次 */
  tint: 'a' | 'b'
  /** 该片的整体浓度 */
  o: number
}

/*
 * 外圈九片长瓣 + 内圈五片短瓣。
 * 花心压在画布底边，长瓣一直扫到顶部被裁掉——像参考图里那样，
 * 花比画框大，只看得到其中一段。
 */
const PETALS: PetalSpec[] = [
  { a: -104, len: 0.78, w: 1.0, k: 20, c: 6.2, f: 0.34, ph: 0.0, tint: 'a', o: 0.62 },
  { a: -76, len: 0.98, w: 1.12, k: 26, c: 6.8, f: 0.29, ph: 1.1, tint: 'b', o: 0.8 },
  { a: -50, len: 1.0, w: 0.94, k: 22, c: 6.0, f: 0.41, ph: 2.3, tint: 'a', o: 0.95 },
  { a: -27, len: 1.16, w: 1.2, k: 31, c: 7.4, f: 0.36, ph: 3.4, tint: 'a', o: 0.7 },
  { a: -8, len: 1.1, w: 1.0, k: 18, c: 5.6, f: 0.25, ph: 4.6, tint: 'b', o: 0.9 },
  { a: 16, len: 1.2, w: 1.16, k: 28, c: 7.0, f: 0.44, ph: 5.5, tint: 'a', o: 0.72 },
  { a: 41, len: 1.04, w: 0.92, k: 23, c: 6.3, f: 0.31, ph: 0.7, tint: 'b', o: 0.88 },
  { a: 65, len: 0.94, w: 1.08, k: 33, c: 7.8, f: 0.39, ph: 2.0, tint: 'b', o: 0.66 },
  { a: 92, len: 0.76, w: 0.96, k: 25, c: 6.6, f: 0.27, ph: 3.1, tint: 'a', o: 0.58 },
  // 内圈：短、窄，插在外瓣的缝里，后画所以压在上面
  { a: -62, len: 0.5, w: 0.72, k: 36, c: 8.0, f: 0.47, ph: 1.5, tint: 'b', o: 0.85 },
  { a: -33, len: 0.58, w: 0.66, k: 30, c: 7.2, f: 0.52, ph: 2.9, tint: 'a', o: 0.72 },
  { a: 3, len: 0.54, w: 0.76, k: 40, c: 8.6, f: 0.43, ph: 4.1, tint: 'b', o: 0.9 },
  { a: 32, len: 0.62, w: 0.68, k: 34, c: 7.6, f: 0.56, ph: 5.2, tint: 'a', o: 0.75 },
  { a: 60, len: 0.46, w: 0.74, k: 38, c: 8.2, f: 0.49, ph: 0.4, tint: 'b', o: 0.82 },
]

const N = PETALS.length

/**
 * 一片花瓣：从原点朝上的长条，中段最宽，尖端收窄并向右侧翻卷一点，
 * 像参考图里被风撑起来的那种织物瓣。
 */
function petalPath({ len, w }: PetalSpec) {
  const L = 292 * len
  const W = 41 * w
  return [
    'M 0 0',
    // 左缘：根部收紧，四成处最宽，再向尖端收
    `C ${-W * 0.5} ${-L * 0.14}, ${-W * 1.0} ${-L * 0.42}, ${-W * 0.72} ${-L * 0.8}`,
    `C ${-W * 0.6} ${-L * 0.94}, ${-W * 0.3} ${-L * 1.01}, ${-W * 0.04} ${-L}`,
    // 尖端：不对称，稍微向右翻
    `C ${W * 0.26} ${-L * 0.995}, ${W * 0.52} ${-L * 0.92}, ${W * 0.6} ${-L * 0.78}`,
    // 右缘
    `C ${W * 0.92} ${-L * 0.4}, ${W * 0.56} ${-L * 0.13}, 0 0`,
    'Z',
  ].join(' ')
}

const PATHS = PETALS.map(petalPath)

/* 飘浮的光尘 */
const MOTES = [
  { x: 46, r: 2.6, speed: 15, amp: 13, ph: 0.0 },
  { x: 118, r: 1.8, speed: 21, amp: 9, ph: 1.7 },
  { x: 74, r: 3.2, speed: 11, amp: 17, ph: 3.2 },
  { x: 152, r: 2.0, speed: 18, amp: 11, ph: 4.4 },
  { x: 24, r: 1.6, speed: 24, amp: 8, ph: 5.6 },
  { x: 96, r: 2.4, speed: 13, amp: 15, ph: 2.5 },
]

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export default function LightFlower() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const rootRef = useRef<SVGGElement>(null)
  const bloomRef = useRef<SVGEllipseElement>(null)
  const coreRef = useRef<SVGCircleElement>(null)
  /** [层][花瓣序号]，三层共用同一个旋转角 */
  const petalRefs = useRef<Array<Array<SVGGElement | null>>>([[], [], []])
  const moteRefs = useRef<Array<SVGCircleElement | null>>([])

  const wind = useMotionValue(0)
  const lift = useMotionValue(0)
  const hover = useMotionValue(0)

  /* 弹簧状态：每片花瓣的当前角与角速度 */
  const petalState = useRef(PETALS.map((p) => ({ cur: p.a, vel: 0 })))
  const shared = useRef({ hs: 0, wx: 0, wy: 0, spin: 0, spinVel: 0, glow: 0.5 })
  const settled = useRef(false)

  const reduced = useRef(false)
  useEffect(() => {
    reduced.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  /* 感应区：侧栏本身，再向右多给一点，鼠标还没进来花就先有反应 */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = wrapRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.width === 0) return
      const inside =
        e.clientX >= r.left - 24 &&
        e.clientX <= r.right + 72 &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      if (!inside) {
        hover.set(0)
        return
      }
      hover.set(1)
      wind.set(clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1.5, 1.5))
      lift.set(clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1))
    }
    const onLeave = () => hover.set(0)

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [hover, wind, lift])

  useAnimationFrame((time, delta) => {
    const s = shared.current
    const still = reduced.current

    if (still && settled.current) return

    const dt = Math.min(delta, 34) / 1000
    const t = time / 1000

    /* 输入平滑：hover 与风向都缓慢逼近目标，避免鼠标一动花瓣就抽搐 */
    const hTarget = still ? 0 : hover.get()
    s.hs += (hTarget - s.hs) * Math.min(1, dt * 4)
    const wTarget = hTarget > 0 ? wind.get() : 0
    const lTarget = hTarget > 0 ? lift.get() : 0
    s.wx += (wTarget - s.wx) * Math.min(1, dt * 3.2)
    s.wy += (lTarget - s.wy) * Math.min(1, dt * 3.2)

    /* 花瓣 */
    for (let i = 0; i < N; i++) {
      const p = PETALS[i]
      const st = petalState.current[i]

      // 张开：中间那片几乎不动，越靠外张得越开
      const fan = (p.a / 100) * 8.5
      // 迎风面：顺着扇形有梯度，整朵花被风"剪切"一下而不是整体平移
      const swing = 6 + 14 * ((p.a + 110) / 210)
      // 呼吸：无论有没有鼠标都在轻轻起伏，hover 时幅度加大
      const breathe = still ? 0 : Math.sin(t * p.f + p.ph) * (2.2 + 2.4 * s.hs)

      const target =
        p.a + breathe + s.hs * fan + s.wx * swing * (0.3 + 0.9 * s.hs) - s.wy * 4.5 * s.hs

      st.vel += ((target - st.cur) * p.k - st.vel * p.c) * dt
      st.cur += st.vel * dt

      const tr = `rotate(${st.cur.toFixed(2)} ${CX} ${CY})`
      petalRefs.current[0][i]?.setAttribute('transform', tr)
      petalRefs.current[1][i]?.setAttribute('transform', tr)
      petalRefs.current[2][i]?.setAttribute('transform', tr)
    }

    /* 整朵花：跟着风向缓慢偏转，同时极轻微地胀缩 */
    const spinTarget = still ? 0 : s.wx * 7 + s.hs * 4
    s.spinVel += ((spinTarget - s.spin) * 8 - s.spinVel * 4.6) * dt
    s.spin += s.spinVel * dt
    const scale = still ? 1 : 1 + Math.sin(t * 0.23) * 0.018 + s.hs * 0.035
    rootRef.current?.setAttribute(
      'transform',
      `translate(${CX} ${CY}) rotate(${s.spin.toFixed(2)}) scale(${scale.toFixed(4)}) translate(${-CX} ${-CY})`,
    )

    /* 光晕明暗 */
    const glowTarget = still ? 0.5 : 0.48 + 0.34 * s.hs + Math.sin(t * 0.31) * 0.07
    s.glow += (glowTarget - s.glow) * Math.min(1, dt * 2.4)
    bloomRef.current?.setAttribute('opacity', s.glow.toFixed(3))
    coreRef.current?.setAttribute('opacity', (s.glow * 0.85).toFixed(3))

    /* 光尘 */
    if (!still) {
      for (let i = 0; i < MOTES.length; i++) {
        const m = MOTES[i]
        const span = VH + 120
        const y = VH + 60 - (((t + m.ph * 30) * m.speed) % span)
        const x = m.x + Math.sin(t * 0.42 + m.ph) * m.amp + s.wx * 14
        const el = moteRefs.current[i]
        if (!el) continue
        el.setAttribute('cx', x.toFixed(1))
        el.setAttribute('cy', y.toFixed(1))
        el.setAttribute('opacity', (0.14 + 0.2 * (0.5 + 0.5 * Math.sin(t * 0.7 + m.ph))).toFixed(3))
      }
    }

    if (still) settled.current = true
  })

  /** 画一层花瓣；fill 交给调用方按每片的 tint 决定 */
  const layer = (
    index: 0 | 1 | 2,
    props: (p: PetalSpec) => React.SVGProps<SVGPathElement>,
  ) =>
    PATHS.map((d, i) => (
      <g
        key={i}
        ref={(el) => {
          petalRefs.current[index][i] = el
        }}
        transform={`rotate(${PETALS[i].a} ${CX} ${CY})`}
      >
        <path
          d={d}
          transform={`translate(${CX} ${CY})`}
          opacity={PETALS[i].o}
          {...props(PETALS[i])}
        />
      </g>
    ))

  return (
    <div ref={wrapRef} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 底色：上方近纸白，越往下越暖 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(178deg, rgba(233,228,205,0.16) 0%, rgba(228,224,200,0.15) 32%, rgba(206,203,172,0.28) 58%, rgba(226,205,196,0.34) 80%, rgba(249,243,233,0.5) 100%)',
        }}
      />
      {/* 花心那一带的胭脂晕 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(110% 40% at 30% 88%, rgba(239,201,203,0.36) 0%, rgba(239,201,203,0) 72%)',
        }}
      />
      {/* 底部压一层极淡的橄榄灰，免得花心糊掉下面的小字 */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background:
            'linear-gradient(0deg, rgba(72,74,52,0.14) 0%, rgba(72,74,52,0.05) 46%, rgba(72,74,52,0) 100%)',
        }}
      />

      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          {/* 投影：橄榄灰，负责把花瓣彼此分开 */}
          <linearGradient id="lf-shadow" x1="0.88" y1="1" x2="0.08" y2="0.06">
            <stop offset="0%" stopColor="#3B3E28" stopOpacity="0.88" />
            <stop offset="34%" stopColor="#5F6445" stopOpacity="0.58" />
            <stop offset="74%" stopColor="#8B8E71" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#ADAC90" stopOpacity="0.02" />
          </linearGradient>

          {/* 受光 a：胭脂。斜着走，让每片瓣自带一明一暗两条边 */}
          <linearGradient id="lf-light-a" x1="0.92" y1="1" x2="0.06" y2="0.04">
            <stop offset="0%" stopColor="#FAF4EC" stopOpacity="0.06" />
            <stop offset="28%" stopColor="#E8AFB4" stopOpacity="0.7" />
            <stop offset="64%" stopColor="#EFCFC4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFFDF8" stopOpacity="0.32" />
          </linearGradient>

          {/* 受光 b：淡金，比 a 暖一点，交替着排 */}
          <linearGradient id="lf-light-b" x1="0.92" y1="1" x2="0.06" y2="0.04">
            <stop offset="0%" stopColor="#F6F1E2" stopOpacity="0.06" />
            <stop offset="28%" stopColor="#D8C97C" stopOpacity="0.62" />
            <stop offset="64%" stopColor="#E7DDA9" stopOpacity="0.56" />
            <stop offset="100%" stopColor="#FFFEF6" stopOpacity="0.3" />
          </linearGradient>

          <radialGradient id="lf-bloom">
            <stop offset="0%" stopColor="#EFE3AE" stopOpacity="0.8" />
            <stop offset="52%" stopColor="#DFCFA4" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#DFCFA4" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="lf-core">
            <stop offset="0%" stopColor="#FFFBF0" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#EFC1C4" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#EFC1C4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 花后面的那团光 */}
        <ellipse
          ref={bloomRef}
          cx={CX + 12}
          cy={CY - 165}
          rx={116}
          ry={210}
          fill="url(#lf-bloom)"
          opacity="0.5"
          style={{ filter: 'blur(30px)' }}
        />

        <g ref={rootRef}>
          {/* 1 投影：先铺一层橄榄灰，给受光层垫出体积 */}
          <g transform={`rotate(3 ${CX} ${CY}) translate(6 8)`} style={{ filter: 'blur(8px)' }}>
            <g opacity="0.88">{layer(0, () => ({ fill: 'url(#lf-shadow)' }))}</g>
          </g>

          {/* 2 受光：胭脂与淡金交替，只靠色彩起形 */}
          <g transform="translate(-4 -5)" style={{ filter: 'blur(10px)' }}>
            <g opacity="0.82">
              {layer(1, (p) => ({ fill: `url(#lf-light-${p.tint})` }))}
            </g>
          </g>

        </g>

        {/* 花心 */}
        <circle
          ref={coreRef}
          cx={CX}
          cy={CY}
          r={46}
          fill="url(#lf-core)"
          opacity="0.42"
          style={{ filter: 'blur(12px)' }}
        />

        {/* 光尘 */}
        <g style={{ filter: 'blur(1.2px)' }}>
          {MOTES.map((m, i) => (
            <circle
              key={i}
              ref={(el) => {
                moteRefs.current[i] = el
              }}
              cx={m.x}
              cy={VH * 0.6}
              r={m.r}
              fill="#FFFBF0"
              opacity="0.2"
            />
          ))}
        </g>
      </svg>

      {/* 靠近正文那一侧收回纸色，让侧栏和正文之间过渡得柔和些 */}
      <div
        className="absolute inset-y-0 right-0 w-14"
        style={{
          background: 'linear-gradient(90deg, rgba(244,242,236,0) 0%, rgba(244,242,236,0.42) 100%)',
        }}
      />
    </div>
  )
}
