import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import PileCollage from '@/components/PileCollage'
import { siteContent } from '@/content'

const SKILLS = siteContent.skills
const GROUPS = SKILLS.groups

export default function Skills() {
  return (
    <section id="skills">
      <SectionHeading
        index={SKILLS.heading.index}
        en={SKILLS.heading.en}
        title={
          <>
            {SKILLS.heading.titleLine1}
            <br />
            {SKILLS.heading.titleLine2Before}
            <span className="marker">{SKILLS.heading.titleHighlight}</span>
            {SKILLS.heading.titleLine2After}
          </>
        }
        lede={SKILLS.heading.lede}
      />

      <div className="border-t border-rule">
        {GROUPS.map((g, i) => (
          <Reveal key={g.title} delay={0.06 + i * 0.08}>
            <div className="grid gap-2 border-b border-rule py-6 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
              <div className="flex items-baseline gap-2">
                <span className="font-display text-[14px] font-medium tracking-normal text-ink">
                  {g.title}
                </span>
                <span className="label-xs">{g.en}</span>
              </div>

              <p className="text-[14px] leading-[1.9] text-ink-soft">
                {g.items.map((item, k) => (
                  <span key={item}>
                    {k > 0 && <span className="mx-2.5 text-rule">/</span>}
                    <span className="transition-colors duration-200 hover:text-ink">{item}</span>
                  </span>
                ))}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* 照片墙：正文栏外扩一点，像杂志里跨栏的图版 */}
      <Reveal delay={0.2}>
        <div className="mt-14">
          {/* 「Solo Trip」那句批注和箭头跟着照片走，挪进 PileCollage 里了 */}
          <p className="mb-4 label-xs">{siteContent.common.offTheClock}</p>
          <div className="-mx-6 sm:-mx-12">
            <PileCollage />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
