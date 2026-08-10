import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { siteContent } from './content'

// 让浏览器标题与分享描述跟随 content.ts；index.html 里保留的是静态兜底
const meta = siteContent.meta
document.title = meta.title
document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.ogTitle)
document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.ogDescription)
document.querySelector('meta[property="og:locale"]')?.setAttribute('content', meta.locale)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      {/* reducedMotion="user"：系统开启"减弱动态效果"时自动禁用位移/缩放动画 */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </HashRouter>
  </StrictMode>,
)
