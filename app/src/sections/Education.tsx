import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Arrow, HandNote } from '@/components/Doodle'
import uclPortico from '@/assets/gallery/ucl-portico.jpg'
import { siteContent } from '@/content'

const EDUCATION = siteContent.education
const EDU = EDUCATION.items

export default function Education() {
  return (
    <section id="education">
      <SectionHeading
        index={EDUCATION.heading.index}
        en={EDUCATION.heading.en}
        title={
          <>
            {EDUCATION.heading.titleLine1}
            <br />
            {EDUCATION.heading.titleLine2Before}
            <span className="marker-blue marker">{EDUCATION.heading.titleHighlight}</span>
            {EDUCATION.heading.titleLine2After}
          </>
        }
        lede={EDUCATION.heading.lede}
      />

      <div className="border-t border-rule">
        {EDU.map((e, i) => (
          <Reveal key={e.degree} delay={0.08 + i * 0.1}>
            <div className="grid gap-3 border-b border-rule py-8 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
              <p className="font-mono text-[11px] leading-6 text-ink-mute">{e.period}</p>

              <div>
                {e.credential && <p className="label-xs mb-1.5">{e.credential}</p>}
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-[18px] font-medium tracking-normal text-ink">
                    {e.degree}
                  </h3>
                  {e.note && (
                    <HandNote rotate={-4} delay={0.3} className="text-pop">
                      {e.note} ✳
                    </HandNote>
                  )}
                </div>

                <p className="mt-1.5 text-[13px] text-ink-soft">{e.school}</p>

                {e.detail && (
                  <p className="mt-4 max-w-[52ch] xl:max-w-[62ch] whitespace-pre-line text-[13.5px] leading-[1.95] text-ink-soft">
                    {e.detail}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* 校园照片：本科与硕士都在同一座 Wilkins Building 前 */}
      <Reveal delay={0.3}>
        <figure className="relative m-0 mt-12 flex flex-wrap items-end gap-8">
          <div className="photo-shadow w-[52%] max-w-[300px] -rotate-2 transition-transform duration-500 hover:rotate-0">
            <img
              src={uclPortico}
              alt={EDUCATION.photoAlt}
              loading="lazy"
              draggable={false}
              className="aspect-[3/4] w-full object-cover"
            />
          </div>

          <figcaption className="relative flex-1 pb-4">
            <p className="label-xs">{EDUCATION.photoKicker}</p>
            <HandNote rotate={-4} delay={0.5} className="mt-3 block text-pop">
              {EDUCATION.photoNote}
            </HandNote>
            <Arrow
              className="left-[-52px] top-2 hidden h-10 w-10 sm:block"
              variant="down-left"
              color="#234A22"
              delay={0.7}
              strokeWidth={1.8}
            />
          </figcaption>
        </figure>
      </Reveal>
    </section>
  )
}
