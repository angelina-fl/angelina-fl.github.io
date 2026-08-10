import { useEffect } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'

/**
 * 全局鼠标层：跟随鼠标的柔光探照灯（spotlight），随滚动加深
 */
export default function MouseLayer() {
  const mx = useMotionValue(-600)
  const my = useMotionValue(-600)

  const spotX = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 })
  const spotY = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 })

  const opacity = useMotionValue(0)

  // 探照灯随滚动加深：白天是柔光，滚到"夜晚"（舞台/联系区）变成真正的追光灯
  const { scrollYProgress } = useScroll()
  const spotAlpha = useTransform(scrollYProgress, [0, 0.55, 1], [0.08, 0.11, 0.18])
  const spotlight = useMotionTemplate`radial-gradient(560px circle at ${spotX}px ${spotY}px, rgba(84, 114, 154, ${spotAlpha}), transparent 70%)`

  // 系统开启"减弱动态效果"时不渲染探照灯与光标圆环
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (reduced) return
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      opacity.set(1)
    }
    const leave = () => opacity.set(0)

    window.addEventListener('mousemove', move)
    document.documentElement.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.documentElement.removeEventListener('mouseleave', leave)
    }
  }, [mx, my, opacity, reduced])

  if (reduced) return null

  return (
    /* 柔光探照灯 */
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ opacity, background: spotlight }}
    />
  )
}
