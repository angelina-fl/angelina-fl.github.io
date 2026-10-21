import { useState } from 'react'
import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import AbstractPaper from '@/components/AbstractPaper'
import PhotoLightbox from '@/components/PhotoLightbox'
import { HandNote } from '@/components/Doodle'
import { ArrowUpRight } from 'lucide-react'
import mumuOpening from '@/assets/gallery/stage-03.jpg'
import troupeGala from '@/assets/gallery/stage-05.jpg'
import troupeFarewell from '@/assets/gallery/stage-02.jpg'
import crewJazz from '@/assets/gallery/stage-01.jpg'
import crewTech from '@/assets/gallery/stage-04.jpg'
import jurijiHome from '@/assets/gallery/juriji-01.jpg'
import jurijiCalendar from '@/assets/gallery/juriji-02.jpg'
import jurijiCast from '@/assets/gallery/juriji-03.jpg'
import jurijiNewShow from '@/assets/gallery/juriji-04.jpg'
import jurijiAnnual from '@/assets/gallery/juriji-05.jpg'
import jurijiQr from '@/assets/gallery/juriji-qrcode.png'
import { useContent } from '@/i18n'

type Project = {
  id: string
  num: string
  period: string
  title: string
  subtitle: string
  desc: string
  tags: string[]
  /** 手写批注，只给最想被看到的那个项目 */
  note?: string | null
  /* 为 true 时出现「阅读摘要」，打开论文摘要纸张 */
  paper?: boolean
  /* 小程序码等方形图片 */
  qr?: string
  /* 缩略图，点击后在灯箱里翻页 */
  photos?: string[]
}

/** 图片资源按项目 id 绑定；文字统一在 content.ts 里改 */
const PROJECT_ASSETS: Record<string, { qr?: string; photos?: string[] }> = {
  juriji: {
    qr: jurijiQr,
    photos: [jurijiHome, jurijiCalendar, jurijiCast, jurijiNewShow, jurijiAnnual],
  },
  mumu: { photos: [mumuOpening, troupeGala, troupeFarewell] },
  crew: { photos: [crewJazz, crewTech] },
}


/** 缩略图条：像贴在版面边上的几张小照片 */
function PhotoStrip({
  photos,
  title,
  onOpen,
}: {
  photos: string[]
  title: string
  onOpen: (index: number) => void
}) {
  const COMMON = useContent().common
  const tilts = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3']

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {photos.map((src, i) => (
        <button
          key={src}
          type="button"
          onClick={() => onOpen(i)}
          aria-label={COMMON.viewNthPhoto(title, i + 1)}
          className={`photo-shadow w-[86px] transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 sm:w-[104px] ${tilts[i % tilts.length]}`}
        >
          <img
            src={src}
            alt=""
            loading="lazy"
            draggable={false}
            className="aspect-[3/4] w-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}

export default function Projects() {
  const [paperOpen, setPaperOpen] = useState(false)
  const [lightbox, setLightbox] = useState<{ photos: string[]; startAt: number } | null>(null)
  const { projects: PROJECTS_CONTENT, common: COMMON } = useContent()
  const PROJECTS: Project[] = PROJECTS_CONTENT.items.map((p) => ({
    ...p,
    ...(PROJECT_ASSETS[p.id] ?? {}),
  }))

  return (
    <section id="projects">
      <SectionHeading
        index={PROJECTS_CONTENT.heading.index}
        en={PROJECTS_CONTENT.heading.en}
        title={
          <>
            {PROJECTS_CONTENT.heading.titleLine1}
            <br />
            <span className="marker">{PROJECTS_CONTENT.heading.titleHighlight}</span>
            {PROJECTS_CONTENT.heading.titleLine2After}
          </>
        }
        lede={PROJECTS_CONTENT.heading.lede}
      />

      <AbstractPaper open={paperOpen} onClose={() => setPaperOpen(false)} />
      <PhotoLightbox
        photos={lightbox?.photos ?? []}
        startAt={lightbox?.startAt ?? 0}
        open={lightbox !== null}
        onClose={() => setLightbox(null)}
      />

      <div className="border-t border-rule">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={0.06 + i * 0.08}>
            <article className="grid gap-5 border-b border-rule py-10 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
              {/* 左栏：时间、标签、小程序码 */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:block">
                <p className="font-mono text-[11px] leading-6 text-ink-mute">{p.period}</p>
                <p className="text-[11px] leading-[1.9] text-ink-mute sm:mt-3">
                  {p.tags.map((t, k) => (
                    <span key={t}>
                      {k > 0 && <span className="text-rule"> / </span>}
                      <span className="whitespace-nowrap">{t}</span>
                    </span>
                  ))}
                </p>

                {p.qr && (
                  <div className="mt-4 w-full sm:mt-6">
                    <img
                      src={p.qr}
                      alt={COMMON.qrAlt(p.title)}
                      loading="lazy"
                      draggable={false}
                      className="h-[84px] w-[84px]"
                    />
                    <p className="mt-1.5 text-[10px] tracking-wide text-ink-mute">{COMMON.qrCaption}</p>
                  </div>
                )}
              </div>

              {/* 右栏：编号、标题与说明 */}
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-mono text-[11px] text-pop">{p.num}</span>
                  <h3 className="font-display text-[21px] font-medium tracking-normal text-ink">
                    {p.title}
                  </h3>
                  {p.note && (
                    <HandNote rotate={-4} delay={0.3} className="text-pop">
                      {p.note}
                    </HandNote>
                  )}
                </div>

                <p className="mt-1.5 text-[13px] text-mark">{p.subtitle}</p>

                <p className="mt-4 max-w-[52ch] xl:max-w-[62ch] whitespace-pre-line text-[13.5px] leading-[1.95] text-ink-soft">
                  {p.desc}
                </p>

                {p.paper && (
                  <button
                    type="button"
                    onClick={() => setPaperOpen(true)}
                    className="group mt-5 inline-flex items-center gap-1.5 border-b border-ink-mute/50 pb-0.5 text-[13px] text-ink-soft transition-colors hover:border-mark hover:text-mark"
                  >
                    {COMMON.paperButton}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                )}

                {p.photos && (
                  <PhotoStrip
                    photos={p.photos}
                    title={p.title}
                    onOpen={(index) => setLightbox({ photos: p.photos!, startAt: index })}
                  />
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
