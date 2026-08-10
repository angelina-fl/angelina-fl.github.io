import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Music2, X } from 'lucide-react'
import { useState } from 'react'
import { siteContent } from '@/content'

const RECORD = siteContent.recordPlayer
const COMMON = siteContent.common

/** 网易云官方外链播放器（type=2 单曲，auto=0 不自动播放） */
const OUTCHAIN_SRC = `https://music.163.com/outchain/player?type=2&id=${RECORD.songId}&auto=0&height=66`
const SONG_URL = `https://music.163.com/song?id=${RECORD.songId}`

/** 右下角的翻唱唱片入口：纸面上放着的一张黑胶。点开面板后内嵌网易云外链播放器，站内直接播放。 */
export default function RecordPlayer() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-3 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 18, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, y: 10, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="w-[min(330px,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-rule bg-paper-raised p-4 text-left shadow-[0_20px_50px_-24px_rgba(30,26,20,0.5)]"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="record-disc h-12 w-12 shrink-0">
                  <span>{RECORD.discText}</span>
                </div>
                <div>
                  <p className="label-xs">{RECORD.kicker}</p>
                  <p className="mt-1 font-display text-[17px] font-medium tracking-normal text-ink">
                    {RECORD.songTitle}
                  </p>
                  <p className="truncate text-[13px] text-ink-soft">{RECORD.subtitle}</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label={COMMON.closePlayerPanel}
                className="rounded-full p-1 text-ink-mute transition hover:bg-paper-deep hover:text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <iframe
              key={OUTCHAIN_SRC}
              src={OUTCHAIN_SRC}
              title={`${RECORD.songTitle} · ${RECORD.subtitle}`}
              width="330"
              height="86"
              frameBorder="no"
              allow="autoplay"
              className="block w-full rounded-lg border border-rule bg-paper"
            />

            <a
              href={SONG_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-[12px] text-ink-mute transition hover:text-mark"
            >
              {RECORD.openInNetease}
              <ExternalLink size={12} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? COMMON.closeRecord : COMMON.openRecord}
        className="group relative grid h-14 w-14 place-items-center rounded-full border border-rule bg-paper-raised shadow-[0_14px_30px_-16px_rgba(30,26,20,0.6)] transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-mark/40 sm:h-16 sm:w-16"
      >
        <span className="record-disc h-11 w-11 sm:h-12 sm:w-12">
          <span className="text-[7px]">cover</span>
        </span>
        <Music2
          size={14}
          className="absolute text-paper opacity-0 transition group-hover:opacity-100"
        />
      </button>
    </div>
  )
}
