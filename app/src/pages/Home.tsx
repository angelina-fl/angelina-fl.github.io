import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar, { PAGES } from '@/components/Sidebar'
import type { PageKey } from '@/components/Sidebar'
import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Experience from '@/sections/Experience'
import Projects from '@/sections/Projects'
import Education from '@/sections/Education'
import Skills from '@/sections/Skills'
import Contact from '@/sections/Contact'
import RecordPlayer from '@/components/RecordPlayer'
import PaperGlow from '@/components/PaperGlow'
import PhotoBox from '@/components/PhotoBox'
import { HandNote } from '@/components/Doodle'
import { siteContent } from '@/content'

const EMAIL_HREF = siteContent.identity.emailHref
const COMMON = siteContent.common

export default function Home() {
  const [page, setPage] = useState<PageKey>('home')

  // 切页时回到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  const CONTENT: Record<PageKey, React.ReactNode> = {
    home: <Hero onNavigate={setPage} />,
    about: <About />,
    education: <Education />,
    experience: <Experience />,
    projects: <Projects />,
    skills: <Skills />,
    contact: <Contact />,
  }

  const current = PAGES.find((p) => p.key === page)!
  const index = PAGES.findIndex((p) => p.key === page) + 1

  return (
    <div className="relative min-h-screen bg-paper">
      <PaperGlow />
      <Sidebar page={page} onNavigate={setPage} />
      <RecordPlayer />

      {/*
        Editorial 分栏：左目录 · 中正文（左右各一条细线）· 右页边注。

        xl 以上页边注才出现，这时整条版心靠右对齐、只留 pr-16 的余量——
        居中的话右侧会空出一大条（宽屏上有三百多 px），而左边那条空带
        接着侧栏的光晕，读起来是页边距，右边那条读起来就是漏排了。

        正文吃掉剩下的宽度（flex-1，封顶 920），所以窄一点的宽屏上空白直接没了；
        超宽屏正文到顶后，多出来的宽度靠 justify-end 全部堆到左边那条空带里。
        pl-12 是给左边留的最小间隙，不然正文那条细线会贴到侧栏的分隔线上。
        xl 以下没有页边注，也就没有右侧那条空白，正文照旧居中、宽度维持 768。
      */}
      <div className="relative z-10 lg:pl-[216px]">
        <div className="mx-auto flex w-full max-w-[1180px] justify-center xl:max-w-none xl:justify-end xl:pl-12 xl:pr-16">
          <main className="w-full max-w-[768px] border-rule px-6 pb-24 pt-20 sm:border-x sm:px-12 lg:pt-16 xl:max-w-[920px] xl:flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {CONTENT[page]}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* 页边注：页码 / 当前栏目 / 联系方式 */}
          <aside className="hidden w-[210px] shrink-0 pl-10 pt-20 lg:pt-16 xl:block">
            <div className="sticky top-16 space-y-9 text-right">
              <div>
                <p className="label-xs">{COMMON.pageLabel}</p>
                <p className="mt-1.5 font-mono text-[11px] text-ink-soft">
                  {String(index).padStart(2, '0')} <span className="text-ink-mute">/ 07</span>
                </p>
              </div>

              <div>
                <p className="label-xs">{COMMON.currentLabel}</p>
                <p className="mt-1.5 font-display text-[13px] tracking-normal text-ink">
                  {current.en}
                  <span className="ml-1.5 text-ink-mute">{current.label}</span>
                </p>
              </div>

              <div>
                <p className="label-xs">{COMMON.sayHiLabel}</p>
                <a
                  href={EMAIL_HREF}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1.5 inline-block border-b border-rule text-[12px] text-ink-soft transition-colors hover:border-mark hover:text-mark"
                >
                  {COMMON.emailLink}
                </a>
              </div>

              <HandNote rotate={-5} className="block pt-2 text-ink-mute">
                {COMMON.takeYourTime}
              </HandNote>

              {/*
                摄影集向右出血：版心靠右后，窗口右缘到页边注右缘就是固定的 pr-16（64px），
                负 margin 顶掉这 64 再多走 10，像参考图那样被窗口裁掉一点。
                （之前版心居中，这里得用 100vw 算那条会变的空隙；现在不用了。）
              */}
              <div className="-ml-8 text-left" style={{ marginRight: '-74px' }}>
                <PhotoBox />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
