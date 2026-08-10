/**
 * 左侧固定目录（Sidebar）：Editorial 版式——
 * 顶部字标，中间竖排目录（当前页用手绘圈标出），底部联系方式。
 * 移动端退化为顶部横滑导航条。
 */
import { CircleMark } from './Doodle'
import LightFlower from './LightFlower'
import { siteContent } from '@/content'

export type PageKey =
  | 'home'
  | 'about'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'contact'

export const PAGES = siteContent.nav as { key: PageKey; label: string; en: string }[]

const EMAIL = siteContent.identity.email
const EMAIL_HREF = siteContent.identity.emailHref
const COMMON = siteContent.common

/** 字标：FL.SUN，中间那个点是重点色 */
function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-display text-[17px] font-semibold tracking-[0.01em] ${className}`}>
      FL<span className="text-pop">.</span>SUN
    </span>
  )
}

export default function Sidebar({
  page,
  onNavigate,
}: {
  page: PageKey
  onNavigate: (p: PageKey) => void
}) {
  const items = PAGES.filter((p) => p.key !== 'home')

  return (
    <>
      {/* 桌面端：左侧窄目录，只用一条细线与正文分栏 */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[188px] flex-col overflow-hidden border-r border-rule px-8 py-10 lg:flex">
        <LightFlower />

        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="relative z-10 w-fit text-ink transition-opacity hover:opacity-60"
          aria-label={COMMON.backHome}
        >
          <Wordmark />
        </button>

        <nav className="relative z-10 mt-12">
          <ul className="space-y-3.5">
            {items.map((p) => {
              const active = page === p.key
              return (
                <li key={p.key}>
                  <button
                    type="button"
                    onClick={() => onNavigate(p.key)}
                    aria-current={active ? 'page' : undefined}
                    className={`relative w-fit text-left text-[13px] transition-colors duration-200 ${
                      active ? 'text-ink' : 'text-ink-mute hover:text-ink-soft'
                    }`}
                  >
                    {p.en}
                    <span className="ml-2 text-[11px] text-ink-mute/80">{p.label}</span>
                    {active && (
                      <CircleMark
                        className="-inset-x-3.5 -inset-y-2 h-[calc(100%+16px)] w-[calc(100%+28px)]"
                        color="#234A22"
                        strokeWidth={1.6}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative z-10 mt-auto">
          <p className="label-xs">{COMMON.workAndCoop}</p>
          <a
            href={EMAIL_HREF}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block w-fit border-b border-rule text-[11px] leading-relaxed text-ink-soft transition-colors hover:border-mark hover:text-mark"
          >
            {EMAIL}
          </a>
        </div>
      </aside>

      {/* 移动端：顶部横滑导航条 */}
      <div className="fixed inset-x-0 top-0 z-40 border-b border-rule bg-paper/90 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-5 overflow-x-auto px-5 py-3.5 [scrollbar-width:none]">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className={`shrink-0 transition-colors ${page === 'home' ? 'text-ink' : 'text-ink-soft'}`}
          >
            <Wordmark />
          </button>
          {items.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => onNavigate(p.key)}
              aria-current={page === p.key ? 'page' : undefined}
              className={`shrink-0 text-[13px] transition-colors ${
                page === p.key
                  ? 'text-ink underline decoration-mark decoration-2 underline-offset-[6px]'
                  : 'text-ink-mute'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
