import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import Monologue from '@/components/Monologue'
import { HandNote } from '@/components/Doodle'
import { siteContent } from '@/content'

const ABOUT = siteContent.about
const CARDS = ABOUT.cards

export default function About() {
  return (
    <section id="about">
      <SectionHeading
        index={ABOUT.heading.index}
        en={ABOUT.heading.en}
        title={
          <>
            {ABOUT.heading.titleLine1}
            <br />
            {ABOUT.heading.titleLine2Before}
            <span className="marker">{ABOUT.heading.titleHighlight}</span>
            {ABOUT.heading.titleLine2After}
          </>
        }
        lede={ABOUT.heading.lede}
      />

      {/* 开场独白：先用第一人称把人讲一遍，再进下面的三条自述 */}
      <Monologue className="mb-14" />

      {/* 三条自述：左栏编号与小标题，右栏正文 */}
      <div className="border-t border-rule">
        {CARDS.map((c, i) => (
          <Reveal key={c.title} delay={0.08 + i * 0.1}>
            <div className="group grid gap-2 border-b border-rule py-8 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
              <div className="flex items-baseline gap-3 sm:block">
                <span className="font-mono text-[11px] text-pop">{c.num}</span>
                <h3 className="font-display text-[15px] font-medium tracking-normal text-ink sm:mt-2">
                  {c.title}
                </h3>
              </div>
              <p className="max-w-[52ch] xl:max-w-[62ch] text-[14px] leading-[1.95] text-ink-soft">{c.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.35}>
        <div className="mt-8 text-right">
          <HandNote rotate={-3} className="text-ink-mute">
            {ABOUT.outroNote}
          </HandNote>
        </div>
      </Reveal>
    </section>
  )
}
