/**
 * 中英切换。
 *
 * 文案分两份：content.ts（中文）与 content.en.ts（英文），结构一一对应。
 * 组件里用 useContent() 取当前语言的那一份，切换时整站即时重渲染，不刷新页面。
 * Provider 在 LangProvider.tsx（单独成文件，fast refresh 要求组件文件只导出组件）。
 *
 * 初始语言：?lang=en / ?lang=zh 参数 > 上次的选择 > 浏览器语言（非中文默认英文）。
 */
import { createContext, useContext } from 'react'
import { siteContent, type SiteContent } from './content'
import { siteContentEn } from './content.en'

export type Lang = 'zh' | 'en'

export const CONTENT: Record<Lang, SiteContent> = { zh: siteContent, en: siteContentEn }
export const STORAGE_KEY = 'site-lang'

const isLang = (v: unknown): v is Lang => v === 'zh' || v === 'en'

export function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (isLang(fromUrl)) return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (isLang(saved)) return saved
  } catch {
    // 隐私模式等情况下 localStorage 不可用，忽略即可
  }
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void } | null>(null)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}

/** 当前语言的全站文案 */
export function useContent(): SiteContent {
  return CONTENT[useLang().lang]
}
