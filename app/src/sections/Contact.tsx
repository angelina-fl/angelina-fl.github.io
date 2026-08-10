import Reveal from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { HandNote, Squiggle } from '@/components/Doodle'
import { siteContent } from '@/content'

const CONTACT = siteContent.contact
const EMAIL = siteContent.identity.email
const EMAIL_HREF = siteContent.identity.emailHref
const PHONE = siteContent.identity.phone

export default function Contact() {
  return (
    <section id="contact">
      <SectionHeading
        index={CONTACT.heading.index}
        en={CONTACT.heading.en}
        title={
          <>
            {CONTACT.heading.titleLine1}
            <br />
            {CONTACT.heading.titleLine2Before}
            <span className="marker">{CONTACT.heading.titleHighlight}</span>
            {CONTACT.heading.titleLine2After}
          </>
        }
        lede={CONTACT.heading.lede}
      />

      <div className="border-t border-rule">
        <Reveal delay={0.06}>
          <div className="grid gap-2 border-b border-rule py-8 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
            <p className="label-xs leading-6">{CONTACT.emailLabel}</p>
            <a
              href={EMAIL_HREF}
              target="_blank"
              rel="noreferrer"
              className="group w-fit font-display text-[20px] tracking-normal text-ink transition-colors hover:text-mark sm:text-[26px]"
            >
              {EMAIL}
              <span className="ml-2 inline-block text-[16px] transition-transform group-hover:translate-x-1">
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="grid gap-2 border-b border-rule py-8 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
            <p className="label-xs leading-6">{CONTACT.phoneLabel}</p>
            <a
              href={siteContent.identity.phoneHref}
              className="w-fit font-display text-[20px] tracking-normal text-ink transition-colors hover:text-mark sm:text-[26px]"
            >
              {PHONE}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="grid gap-2 border-b border-rule py-8 sm:grid-cols-[132px_1fr] sm:gap-8 xl:grid-cols-[160px_1fr]">
            <p className="label-xs leading-6">{CONTACT.basedLabel}</p>
            <p className="text-[14px] leading-[1.9] text-ink-soft">
              {siteContent.identity.based}
            </p>
          </div>
        </Reveal>
      </div>

      {/* 版权 */}
      <Reveal delay={0.3}>
        <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Squiggle className="mb-4 h-3 w-28" color="#C9C3B5" />
            <p className="font-display text-[13px] tracking-normal text-ink">
              {siteContent.identity.signature}
            </p>
            <p className="mt-1 text-[11px] text-ink-mute">
              {siteContent.identity.footerLine}
            </p>
          </div>
          <HandNote rotate={-4} className="text-ink-mute">
            {siteContent.common.thanks}
          </HandNote>
        </div>
      </Reveal>
    </section>
  )
}
