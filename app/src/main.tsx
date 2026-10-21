import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { MotionConfig } from 'framer-motion'
import './index.css'
import App from './App.tsx'
import { LangProvider } from './LangProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      {/* reducedMotion="user"：系统开启"减弱动态效果"时自动禁用位移/缩放动画 */}
      <MotionConfig reducedMotion="user">
        <LangProvider>
          <App />
        </LangProvider>
      </MotionConfig>
    </HashRouter>
  </StrictMode>,
)
