import { useState, useEffect, useRef } from 'react'
import { Play, RotateCcw } from 'lucide-react'

const LOG = [
  { t: 0,     c: 'text-orange-300', s: '=== 地下城堡3 AI Agent 启动 ===' },
  { t: 300,   c: 'text-slate-400',  s: '[GuideFetcher] 请求 wiki.biligame.com/dxcb3...' },
  { t: 900,   c: 'text-green-400',  s: '[GuideFetcher] ✓ 日常活动攻略获取成功 (3218 bytes)' },
  { t: 1200,  c: 'text-slate-400',  s: '[ActionParser] 发送至 mimo-v2.5-pro...' },
  { t: 2100,  c: 'text-amber-300', s: '[MIMO] ✓ 解析完成 → 12 个动作' },
  { t: 2400,  c: 'text-slate-400',  s: '[GameAutomation] ADB 连接 emulator-5554...' },
  { t: 2900,  c: 'text-green-400',  s: '[GameAutomation] ✓ 已连接，游戏运行中' },
  { t: 3100,  c: 'text-slate-400',  s: '[执行 1/12] tap_zone "日常入口"' },
  { t: 3500,  c: 'text-slate-400',  s: '  ADB tap 142 380' },
  { t: 3900,  c: 'text-slate-400',  s: '[执行 2/12] wait_loading' },
  { t: 4600,  c: 'text-green-400',  s: '  ✓ 画面稳定 (1.2s)' },
  { t: 4900,  c: 'text-slate-400',  s: '[执行 3/12] click "领取任务"' },
  { t: 5200,  c: 'text-slate-400',  s: '  OCR 定位 "领取任务" → (210, 450) conf=0.96' },
  { t: 5600,  c: 'text-slate-400',  s: '  ADB tap 210 450' },
  { t: 6000,  c: 'text-green-400',  s: '  ✓ OCR 检测到任务面板已打开' },
  { t: 6300,  c: 'text-slate-400',  s: '[执行 4-8/12] 执行任务序列...' },
  { t: 7200,  c: 'text-green-400',  s: '  ✓ 日常任务全部完成' },
  { t: 7500,  c: 'text-slate-400',  s: '[执行 9/12] tap_zone "副本入口"' },
  { t: 7900,  c: 'text-slate-400',  s: '  ADB tap 80 540' },
  { t: 8300,  c: 'text-slate-400',  s: '[执行 10/12] click_text "黑暗森林"' },
  { t: 8700,  c: 'text-slate-400',  s: '  OCR: Found "黑暗森林" at (360, 320) conf=0.97' },
  { t: 9100,  c: 'text-slate-400',  s: '[执行 11/12] tap_zone "自动战斗"' },
  { t: 9700,  c: 'text-slate-400',  s: '  等待战斗结束 (30s)...' },
  { t: 10400, c: 'text-green-400',  s: '  ✓ OCR 检测到奖励界面' },
  { t: 10800, c: 'text-slate-400',  s: '[执行 12/12] tap_zone "返回主城"' },
  { t: 11300, c: 'text-amber-300', s: '✅ 全部完成 · 耗时 86s · 0 次人工介入' },
]

export default function RunLog() {
  const [shown, setShown] = useState(0)
  const [running, setRunning] = useState(false)
  const ref = useRef(null)
  const raf = useRef(null)
  const box = useRef(null)

  const run = () => {
    setShown(0); setRunning(true)
    const t0 = Date.now()
    const tick = () => {
      const el = Date.now() - t0
      const n = LOG.filter(l => l.t <= el).length
      setShown(n)
      if (n < LOG.length) raf.current = requestAnimationFrame(tick)
      else setRunning(false)
    }
    raf.current = requestAnimationFrame(tick)
  }
  const reset = () => { cancelAnimationFrame(raf.current); setShown(0); setRunning(false) }
  useEffect(() => { if (box.current) box.current.scrollTop = box.current.scrollHeight }, [shown])
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-green-400 text-xs font-mono uppercase tracking-widest mb-3">完整运行日志</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">模拟一次完整运行</h2>
          <p className="text-slate-400 text-lg">点击 Run 查看从获取攻略到完成任务的全过程</p>
        </div>

        <div className="term red-glow">
          <div className="term-bar justify-between">
            <div className="flex items-center gap-2">
              <div className="dot bg-red-500" /><div className="dot bg-yellow-500" /><div className="dot bg-green-500" />
              <span className="ml-2 text-slate-500 text-xs font-mono">python main.py --task auto</span>
            </div>
            <div className="flex gap-3">
              <button onClick={run} disabled={running}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-green-400 transition-colors disabled:opacity-40">
                <Play size={11} /> Run
              </button>
              <button onClick={reset}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-sky-400 transition-colors">
                <RotateCcw size={11} /> Reset
              </button>
            </div>
          </div>

          <div ref={box} className="p-4 sm:p-5 h-80 overflow-y-auto space-y-0.5 scroll-smooth">
            {shown === 0 && !running && (
              <p className="text-slate-600 text-sm font-mono text-center pt-16">按 Run 开始演示</p>
            )}
            {LOG.slice(0, shown).map((l, i) => (
              <p key={i} className={`font-mono text-xs sm:text-sm leading-relaxed ${l.c}`}>{l.s}</p>
            ))}
            {running && shown < LOG.length && <span className="font-mono text-xs text-orange-400 blink">█</span>}
          </div>

          <div className="px-4 py-2 border-t border-slate-800/50 flex flex-wrap gap-4 text-xs font-mono text-slate-600">
            <span><span className="text-orange-400">MIMO</span> = AI 解析</span>
            <span><span className="text-sky-400">OCR</span> = 视觉识别</span>
            <span><span className="text-slate-400">ADB</span> = 模拟器指令</span>
            <span><span className="text-green-400">✓</span> = 验证成功</span>
          </div>
        </div>
      </div>
    </section>
  )
}
