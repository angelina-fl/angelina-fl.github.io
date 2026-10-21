import { useCallback, useEffect, useState, type ReactNode } from 'react'
import { CONTENT, LangContext, STORAGE_KEY, initialLang, type Lang } from './i18n'

/** 浏览器标题、分享描述与 <html lang> 跟着当前语言走；index.html 里保留的是静态兜底 */
function applyMeta(lang: Lang) {
  const meta = CONTENT[lang].meta
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  document.title = meta.title
  document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', meta.ogTitle)
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', meta.ogDescription)
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', meta.locale)
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => applyMeta(lang), [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE_KEY, l)
    } catch {
      // localStorage 不可用时只是记不住选择，切换本身照常生效
    }
  }, [])

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}
