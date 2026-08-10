/**
 * B 站达人调研 Agent 的流程演示。
 *
 * 折叠在经历条目下面，点开后自动把「输入 → 抓取 → 筛选 → 去重 → 输出」跑一遍，
 * 每步高亮约 1 秒；跑完停在输出层，访客可以点步骤条回看，或展开筛选条件看逻辑。
 * 文案与演示数据都在 content.ts 的 experience.agentDemo 里。
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Check, ChevronDown, RotateCw, Search } from 'lucide-react'
import { HandNote } from '@/components/Doodle'
import { siteContent } from '@/content'

const DEMO = siteContent.experience.agentDemo

/**
 * 每步停留时长（毫秒），最后一步不再自动前进。
 * 留的时间要够看完这一步的小动画再读一遍文字，所以筛选层给得最长。
 */
const STEP_MS = [2800, 3800, 3000, 4200, 3200]

/** 只在被模拟的 B 站界面里出现的粉，站点本身的色板不动 */
const BILI_PINK = '#FB7299'

/** 一行小注解：短横线 + 灰字，和正文的要点列表同一套语气 */
function Note({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[12px] leading-[1.85] text-ink-soft">
      <span className="mt-[11px] h-px w-2.5 shrink-0 bg-ink-mute/60" />
      <span>{children}</span>
    </li>
  )
}

/** 01 输入层：一个不可输入的搜索框，关键词逐字打出来 */
function StageInput({ reduced }: { reduced: boolean }) {
  const { keyword } = DEMO.input
  const [typed, setTyped] = useState(reduced ? keyword : '')

  // 每次进入这一步都是重新挂载，初值就是空串，逐字补上即可
  useEffect(() => {
    if (reduced) return
    const timers = keyword
      .split('')
      .map((_, i) => window.setTimeout(() => setTyped(keyword.slice(0, i + 1)), 130 * (i + 1)))
    return () => timers.forEach(clearTimeout)
  }, [keyword, reduced])

  return (
    <div>
      <p className="text-[12.5px] leading-[1.9] text-ink-soft">{DEMO.input.caption}</p>

      <div className="mt-5 border border-rule bg-paper-raised p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[13px] font-semibold" style={{ color: BILI_PINK }}>
            {DEMO.input.site}
          </span>
          <span className="text-[11px] text-ink-mute">{DEMO.input.tab}</span>
        </div>

        <div className="mt-3 flex items-stretch">
          <div className="flex min-w-0 flex-1 items-center gap-2 border border-rule border-r-0 bg-paper px-3 py-2">
            <Search className="h-3.5 w-3.5 shrink-0 text-ink-mute" aria-hidden />
            <span className="truncate font-mono text-[12.5px] text-ink">
              {typed || <span className="text-ink-mute">{DEMO.input.placeholder}</span>}
            </span>
            <span
              aria-hidden
              className="ml-px inline-block h-[14px] w-px shrink-0 animate-caret-blink bg-ink/70"
            />
          </div>
          <motion.span
            className="shrink-0 px-4 py-2 text-[12px] leading-[18px] text-white"
            style={{ backgroundColor: BILI_PINK }}
            animate={reduced ? undefined : { opacity: [1, 0.55, 1] }}
            transition={{ duration: 0.6, delay: 1.3, times: [0, 0.5, 1] }}
          >
            {DEMO.input.button}
          </motion.span>
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {DEMO.input.notes.map((n) => (
          <Note key={n}>{n}</Note>
        ))}
      </ul>
    </div>
  )
}

/** 02 调用 Skill：把筛选标准固化成 SKILL.md，逐行「读」出来 */
function StageSkill({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <p className="text-[12.5px] leading-[1.9] text-ink-soft">{DEMO.skill.caption}</p>

      <p className="mt-4 font-mono text-[10.5px] leading-[1.7] text-ink-mute">
        {DEMO.skill.matched}
      </p>

      <div className="mt-3 border border-rule bg-paper-raised">
        <div className="flex items-center gap-2 border-b border-rule px-3 py-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-pop" aria-hidden />
          <span className="truncate font-mono text-[10.5px] text-ink">{DEMO.skill.file}</span>
        </div>

        <div className="space-y-1 px-3.5 py-3">
          {DEMO.skill.lines.map((l, i) => (
            <motion.p
              key={l.k + l.t}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.28 }}
              className={`font-mono text-[10.5px] leading-[1.8] ${
                l.dim ? 'text-ink-mute' : 'text-ink-soft'
              }`}
            >
              {l.k && <span className="text-mark">{l.k}</span>}
              {l.t}
            </motion.p>
          ))}
        </div>
      </div>

      <motion.p
        className="mt-3.5 flex items-center gap-1.5 text-[12px] text-pop"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 2.9 }}
      >
        <Check className="h-3.5 w-3.5 shrink-0" aria-hidden />
        {DEMO.skill.status}
      </motion.p>
    </div>
  )
}

/** 03 抓取层：一个简化的浏览器窗口，卡片骨架依次流入 */
function StageCrawl({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <p className="text-[12.5px] leading-[1.9] text-ink-soft">{DEMO.crawl.caption}</p>

      <div className="mt-5 border border-rule bg-paper-raised">
        {/* 窗口标题栏 */}
        <div className="flex items-center gap-2.5 border-b border-rule px-3 py-2">
          <span className="flex gap-1" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-rule" />
            <span className="h-2 w-2 rounded-full bg-rule" />
            <span className="h-2 w-2 rounded-full bg-rule" />
          </span>
          <span className="truncate rounded-sm bg-paper px-2 py-0.5 font-mono text-[10.5px] text-ink-mute">
            {DEMO.crawl.url}
          </span>
        </div>

        {/* 抓到的 UP 主卡片骨架 */}
        <div className="space-y-2.5 p-3.5">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              initial={reduced ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.32 }}
            >
              <span className="h-6 w-6 shrink-0 rounded-full bg-paper-deep" />
              <span className="flex-1 space-y-1.5">
                <span
                  className="block h-1.5 rounded-full bg-paper-deep"
                  style={{ width: `${52 - i * 6}%` }}
                />
                <span
                  className="block h-1.5 rounded-full bg-paper-deep/70"
                  style={{ width: `${78 - i * 9}%` }}
                />
              </span>
              <span className="shrink-0 font-mono text-[10px] text-ink-mute">mid ****{31 + i * 7}</span>
            </motion.div>
          ))}
        </div>

        <p className="border-t border-rule px-3.5 py-2 font-mono text-[10px] tracking-wide text-pop">
          {DEMO.crawl.badge}
        </p>
      </div>

      <ul className="mt-4 space-y-1.5">
        {DEMO.crawl.notes.map((n) => (
          <Note key={n}>{n}</Note>
        ))}
      </ul>
      <p className="mt-3 font-mono text-[11px] text-ink-mute">{DEMO.crawl.result}</p>
    </div>
  )
}

/** 03 筛选层：四条规则，点开看逻辑 */
function StageFilter({ reduced }: { reduced: boolean }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="max-w-[46ch] xl:max-w-[54ch] text-[12.5px] leading-[1.9] text-ink-soft">{DEMO.filter.caption}</p>
        <span className="font-mono text-[10.5px] text-ink-mute">{DEMO.filter.hint}</span>
      </div>

      {/* 卡片在窄栏里排一列，规则名和淘汰数才能落在同一行 */}
      <div className="mt-4 grid gap-2.5">
        {DEMO.filter.cards.map((c, i) => {
          const expanded = open === i
          return (
            <motion.div
              key={c.name}
              className="border border-rule bg-paper-raised"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 + i * 0.3 }}
            >
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left transition-colors hover:bg-paper"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mark" aria-hidden />
                <span className="flex-1 text-[12.5px] leading-snug text-ink">{c.name}</span>
                <span className="shrink-0 font-mono text-[10.5px] text-ink-mute">
                  {c.from} <span className="text-rule">→</span>{' '}
                  <span className="text-pop">{c.to}</span>
                </span>
                <ChevronDown
                  aria-hidden
                  className={`h-3.5 w-3.5 shrink-0 text-ink-mute transition-transform duration-200 ${
                    expanded ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    key="code"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduced ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <pre className="overflow-x-auto border-t border-rule bg-paper px-3 py-2.5 font-mono text-[10.5px] leading-[1.75] text-ink-soft">
                      {c.code}
                    </pre>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      <p className="mt-3.5 font-mono text-[11px] text-ink-mute">{DEMO.filter.summary}</p>
    </div>
  )
}

/** 04 去重层：命中结果流入，撞库的划掉 */
function StageDedupe({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <p className="text-[12.5px] leading-[1.9] text-ink-soft">{DEMO.dedupe.caption}</p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-[10.5px] text-ink-mute">
        <span>{DEMO.dedupe.libraryLabel}</span>
        <span className="text-ink">{DEMO.dedupe.libraryBefore}</span>
        <span className="text-rule">→</span>
        <motion.span
          className="text-pop"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.35 }}
        >
          {DEMO.dedupe.libraryAfter}
        </motion.span>
      </div>

      <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
        {DEMO.dedupe.items.map((it, i) => (
          <motion.li
            key={it.name}
            className="flex items-center gap-1.5 py-0.5 text-[11.5px]"
            initial={reduced ? false : { opacity: 0, x: -6 }}
            animate={{ opacity: it.dup ? 0.4 : 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.09 }}
          >
            <span
              aria-hidden
              className={`h-1 w-1 shrink-0 rounded-full ${it.dup ? 'bg-ink-mute' : 'bg-pop'}`}
            />
            <span className={`truncate ${it.dup ? 'text-ink-mute line-through' : 'text-ink-soft'}`}>
              {it.name}
            </span>
            <span className="shrink-0 font-mono text-[9.5px] text-ink-mute">
              {it.dup ? DEMO.dedupe.hitLabel : ''}
            </span>
          </motion.li>
        ))}
      </ul>

      <p className="mt-3.5 font-mono text-[11px] text-ink-mute">{DEMO.dedupe.summary}</p>
    </div>
  )
}

/** 05 输出层：写回表格的样子 */
function StageOutput({ reduced }: { reduced: boolean }) {
  return (
    <div>
      <p className="text-[12.5px] leading-[1.9] text-ink-soft">{DEMO.output.caption}</p>

      <p className="mt-4 flex items-center gap-2 font-mono text-[10.5px] text-ink-mute">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mark" aria-hidden />
        {DEMO.output.tableName}
      </p>

      <div className="-mx-1 mt-2 overflow-x-auto px-1">
        <table className="w-full min-w-[440px] border-collapse text-left">
          <thead>
            <tr className="border-y border-rule">
              {DEMO.output.columns.map((col, i) => (
                <th
                  key={col}
                  className={`py-2 font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-ink-mute ${
                    i === 0 ? 'pr-3' : 'px-3'
                  }`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DEMO.output.rows.map((row, r) => (
              <motion.tr
                key={row[0]}
                className="border-b border-rule/70"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.18 + r * 0.2 }}
              >
                {row.map((cell, c) => (
                  <td
                    key={cell + c}
                    className={`py-2.5 text-[12px] leading-snug ${c === 0 ? 'pr-3 text-ink' : 'px-3'} ${
                      c === 1 || c === 2 ? 'font-mono text-ink-soft' : ''
                    } ${c === 3 ? 'text-ink-soft' : ''}`}
                  >
                    {cell}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 font-mono text-[10.5px] text-ink-mute">{DEMO.output.more}</p>
      <p className="mt-3.5 text-[12px] text-pop">{DEMO.output.footer}</p>
    </div>
  )
}

/** 演示主体：步骤条 + 舞台区 */
function Player() {
  const reduced = useReducedMotion() ?? false
  const [step, setStep] = useState(0)
  const [playing, setPlaying] = useState(true)
  /** 每次重播 +1，用来重新触发下面的计时器 */
  const [run, setRun] = useState(0)
  const timers = useRef<number[]>([])

  const clear = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  // 打开面板与每次重播：按 STEP_MS 把五步依次推过去
  useEffect(() => {
    let at = 0
    const ids = STEP_MS.map((ms, i) => {
      at += ms
      return window.setTimeout(() => setStep(i + 1), at)
    })
    ids.push(window.setTimeout(() => setPlaying(false), at))
    timers.current = ids
    return () => ids.forEach(clearTimeout)
  }, [run])

  const play = () => {
    clear()
    setStep(0)
    setPlaying(true)
    setRun((n) => n + 1)
  }

  /** 点步骤条＝接管播放 */
  const goTo = (i: number) => {
    clear()
    setPlaying(false)
    setStep(i)
  }

  const STAGES = [StageInput, StageSkill, StageCrawl, StageFilter, StageDedupe, StageOutput]
  const Stage = STAGES[step]

  return (
    <>
      {/* 步骤条 */}
      <div className="mt-5">
        <div className="flex flex-wrap items-center gap-x-1 gap-y-1.5">
          {DEMO.steps.map((s, i) => {
            const active = i === step
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => goTo(i)}
                aria-current={active ? 'step' : undefined}
                className={`group flex items-baseline gap-1.5 px-1.5 py-1 transition-colors ${
                  active ? 'text-ink' : i < step ? 'text-ink-soft' : 'text-ink-mute'
                } hover:text-ink`}
              >
                <span className="font-mono text-[10px]">{s.num}</span>
                <span className="text-[12.5px] leading-none">{s.name}</span>
                {i < DEMO.steps.length - 1 && (
                  <span aria-hidden className="pl-1 text-[10px] text-rule">
                    ›
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* 进度线 */}
        <div className="mt-2 h-px w-full bg-rule">
          <motion.div
            className="h-px bg-pop"
            animate={{ width: `${((step + 1) / DEMO.steps.length) * 100}%` }}
            transition={{ duration: reduced ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* 舞台 */}
      <div className="mt-6 min-h-[352px] sm:min-h-[318px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <Stage reduced={reduced} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 重播 */}
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-rule pt-4">
        <button
          type="button"
          onClick={play}
          disabled={playing}
          className="group inline-flex items-center gap-1.5 text-[12px] text-ink-soft transition-colors hover:text-pop disabled:text-ink-mute"
        >
          <RotateCw
            aria-hidden
            className={`h-3.5 w-3.5 ${playing ? 'animate-spin' : 'transition-transform group-hover:-rotate-90'}`}
          />
          {playing ? DEMO.running : DEMO.replay}
        </button>

        <dl className="flex flex-wrap items-baseline justify-end gap-x-5 gap-y-1">
          {DEMO.stats.map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-[15px] font-medium tracking-normal text-ink">
                {s.value}
              </dd>
              <span className="text-[11px] text-ink-mute">{s.label}</span>
            </div>
          ))}
        </dl>
      </div>
    </>
  )
}

export default function AgentFlowDemo() {
  const reduced = useReducedMotion() ?? false
  const [open, setOpen] = useState(false)

  return (
    <div className="mt-7">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="group inline-flex items-center gap-2 border border-rule bg-paper-raised px-3.5 py-2 transition-colors hover:border-mark hover:bg-paper"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-pop" aria-hidden />
          <span className="text-[12.5px] text-ink">{DEMO.trigger}</span>
          <ChevronDown
            aria-hidden
            className={`h-3.5 w-3.5 text-ink-mute transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>

        {!open && (
          <HandNote rotate={-4} delay={0.2}>
            {DEMO.triggerHint}
          </HandNote>
        )}
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 border border-rule bg-paper-raised/60 px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <p className="label-xs">{DEMO.eyebrow}</p>
                <p className="font-mono text-[10px] text-ink-mute">
                  {DEMO.stepsLabel} · {String(DEMO.steps.length).padStart(2, '0')}
                </p>
              </div>

              <h4 className="mt-2.5 font-display text-[17px] font-medium tracking-normal text-ink">
                {DEMO.title}
              </h4>
              <p className="mt-1 text-[12.5px] text-mark">{DEMO.subtitle}</p>
              <p className="mt-3 max-w-[52ch] xl:max-w-[62ch] text-[12.5px] leading-[1.95] text-ink-soft">
                {DEMO.intro}
              </p>

              <Player />

              <p className="mt-4 text-[10.5px] leading-[1.8] text-ink-mute">{DEMO.disclaimer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
