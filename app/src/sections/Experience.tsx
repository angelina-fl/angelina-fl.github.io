import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import AgentFlowDemo from '@/components/AgentFlowDemo'
import { siteContent } from '@/content'

const EXPERIENCE = siteContent.experience
const JOBS = EXPERIENCE.jobs

export default function Experience() {
  return (
    <section id="experience">
      <SectionHeading
        index={EXPERIENCE.heading.index}
        en={EXPERIENCE.heading.en}
        title={
          <>
            {EXPERIENCE.heading.titleLine1}
            <br />
            {EXPERIENCE.heading.titleLine2Before}
            <span className="marker-blue marker">{EXPERIENCE.heading.titleHighlight}</span>
            {EXPERIENCE.heading.titleLine2After}
          </>
        }
        lede={
          <>
            {EXPERIENCE.heading.ledeLine1}
            <br />
            {EXPERIENCE.heading.ledeLine2}
          </>
        }
      />

      <div className="border-t border-rule">
        {JOBS.map((job, i) => (
          <Reveal key={job.company} delay={0.06 + i * 0.08}>
            <article className="grid gap-4 border-b border-rule py-9 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
              {/* 左栏：时间与标签 */}
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 sm:block">
                <p className="font-mono text-[11px] leading-6 text-ink-mute">{job.period}</p>
                <p className="text-[11px] leading-[1.9] text-ink-mute sm:mt-3">
                  {job.tags.map((t, k) => (
                    <span key={t}>
                      {k > 0 && <span className="text-rule"> / </span>}
                      <span className="whitespace-nowrap">{t}</span>
                    </span>
                  ))}
                </p>
              </div>

              {/* 右栏：机构、角色与要点 */}
              <div>
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-[19px] font-medium tracking-normal text-ink">
                    {job.company}
                  </h3>
                </div>
                <p className="mt-1.5 text-[13px] text-mark">{job.role}</p>

                <ul className="mt-5 space-y-3">
                  {job.points.map((p) => (
                    <li
                      key={p}
                      className="flex gap-3.5 text-[13.5px] leading-[1.95] text-ink-soft"
                    >
                      <span className="mt-[13px] h-px w-3 shrink-0 bg-ink-mute/60" />
                      <span className="max-w-[52ch] xl:max-w-[62ch]">{p}</span>
                    </li>
                  ))}
                </ul>

                {job.company === EXPERIENCE.agentDemo.attachTo && <AgentFlowDemo />}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
