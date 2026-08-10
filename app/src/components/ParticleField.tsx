import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/**
 * 首页背景粒子网络：
 * - 粒子缓慢漂移，相近粒子之间连线
 * - 鼠标靠近时粒子被轻轻推开，并与鼠标形成连线
 */
export default function ParticleField({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let particles: Particle[] = []
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(110, Math.floor((w * h) / 14000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.4 + 0.6,
      }))
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 }
    }

    const LINK = 120
    const MOUSE_R = 180

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      const m = mouse.current

      for (const p of particles) {
        // 鼠标排斥
        const dxm = p.x - m.x
        const dym = p.y - m.y
        const dm = Math.hypot(dxm, dym)
        if (dm < MOUSE_R && dm > 0.01) {
          const force = ((MOUSE_R - dm) / MOUSE_R) * 0.6
          p.vx += (dxm / dm) * force * 0.12
          p.vy += (dym / dm) * force * 0.12
        }

        p.x += p.vx
        p.y += p.vy
        // 速度衰减，保持缓慢漂移
        p.vx *= 0.985
        p.vy *= 0.985
        if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - 0.5) * 0.02
        if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - 0.5) * 0.02

        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(84, 114, 154, 0.45)'
        ctx.fill()
      }

      // 粒子间连线
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(84, 114, 154, ${0.16 * (1 - d / LINK)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // 鼠标与粒子连线
      if (m.x > 0) {
        for (const p of particles) {
          const d = Math.hypot(p.x - m.x, p.y - m.y)
          if (d < MOUSE_R) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(m.x, m.y)
            ctx.strokeStyle = `rgba(64, 92, 128, ${0.28 * (1 - d / MOUSE_R)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    // 系统开启"减弱动态效果"时：只画一帧静态星座，不跑动画循环、不追踪鼠标
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(84, 114, 154, 0.45)'
        ctx.fill()
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < LINK) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(84, 114, 154, ${0.16 * (1 - d / LINK)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }
    }

    const onResize = () => {
      resize()
      if (reduced) drawStatic()
    }

    resize()
    if (reduced) {
      drawStatic()
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }

    tick()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
