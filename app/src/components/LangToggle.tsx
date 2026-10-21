import { useContent, useLang, type Lang } from '@/i18n'

const OPTIONS: { lang: Lang; text: string }[] = [
  { lang: 'zh', text: '中' },
  { lang: 'en', text: 'EN' },
]

/** 中 / EN 胶囊切换：当前语言填墨色，另一半留白 */
export default function LangToggle({ className = '' }: { className?: string }) {
  const { lang, setLang } = useLang()
  const { common } = useContent()

  return (
    <div
      role="group"
      aria-label={common.switchLang}
      className={`inline-flex items-center rounded-full border border-rule bg-paper-raised/85 p-0.5 shadow-[0_6px_16px_-10px_rgba(30,26,20,0.45)] backdrop-blur-md ${className}`}
    >
      {OPTIONS.map((o) => {
        const active = lang === o.lang
        return (
          <button
            key={o.lang}
            type="button"
            onClick={() => setLang(o.lang)}
            aria-pressed={active}
            className={`min-w-[34px] rounded-full px-2.5 py-1 font-mono text-[11px] leading-none tracking-[0.08em] transition-colors duration-200 ${
              active ? 'bg-ink text-paper' : 'text-ink-mute hover:text-ink'
            }`}
          >
            {o.text}
          </button>
        )
      })}
    </div>
  )
}
