import { useState, useEffect } from 'react'
import { Github, Zap } from 'lucide-react'

const LINES = [
  { t: 0,    c: 'text-orange-300', s: '🏰 地下城堡3 AI Agent 启动...' },
  { t: 500,  c: 'text-slate-400',  s: '[GuideFetcher] 连接 B站维基...' },
  { t: 1100, c: 'text-green-400',  s: '[GuideFetcher] ✓ 获取日常活动攻略 (3.2KB)' },
  { t: 1600, c: 'text-slate-400',  s: '[ActionParser] 发送给 mimo-v2.5-pro 解析...' },
  { t: 2400, c: 'text-amber-300', s: '[MIMO] 识别到 12 个可执行动作' },
  { t: 2800, c: 'text-slate-400',  s: '[GameAutomation] ADB 连接雷电模拟器...' },
  { t: 3300, c: 'text-green-400',  s: '[GameAutomation] ✓ 模拟器已连接 (emulator-5554)' },
  { t: 3700, c: 'text-slate-400',  s: '[执行] click "日常任务" → OCR 定位 (142, 380)' },
  { t: 4200, c: 'text-slate-400',  s: '[执行] tap_zone "领取奖励" → 点击 (660, 980)' },
  { t: 4700, c: 'text-green-400',  s: '[OCR] ✓ 检测到"领取成功"' },
  { t: 5200, c: 'text-slate-400',  s: '[执行] tap_zone "副本入口" → 进入黑暗森林...' },
  { t: 5800, c: 'text-slate-400',  s: '[执行] wait_loading → 等待战斗加载...' },
  { t: 6400, c: 'text-slate-400',  s: '[执行] tap_zone "自动战斗" → 开启' },
  { t: 7000, c: 'text-green-400',  s: '[OCR] ✓ 战斗结束，检测到奖励界面' },
  { t: 7500, c: 'text-amber-300', s: '✅ 全部日常任务完成 · 耗时 ~85s' },
]

export default function Hero() {
  const [shown, setShown] = useState(0)
  useEffect(() => {
    if (shown >= LINES.length) return
    const next = LINES[shown]?.t ?? 0
    const prev = shown > 0 ? LINES[shown - 1].t : 0
    const delay = shown === 0 ? 600 : next - prev
    const t = setTimeout(() => setShown(s => s + 1), delay)
    return () => clearTimeout(t)
  }, [shown])

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 pb-8">
      <div className="relative max-w-4xl mx-auto w-full text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-700/40 bg-orange-950/20 text-orange-300 text-xs mb-6">
          <Zap size={12} className="text-yellow-400" />
          <span>MIMO 模型驱动 · ADB 自动化 · B站攻略解析</span>
        </div>

        <h1 className="text-5xl sm:text-7xl font-black mb-3">
          <span className="orange-text">地下城堡3</span>
        </h1>
        <p className="text-2xl font-bold text-slate-300 mb-4">AI Agent 自动化</p>
        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          从 B 站维基爬取攻略 → 调用 <span className="text-orange-400 font-mono">mimo-v2.5-pro</span> 解析成动作序列<br />
          → ADB 控制雷电模拟器执行 → OCR 验证结果，全程无人工介入
        </p>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="term red-glow">
            <div className="term-bar">
              <div className="dot bg-red-500" /><div className="dot bg-yellow-500" /><div className="dot bg-green-500" />
            </div>
            <div className="p-4 sm:p-5 min-h-[260px] space-y-1.5">
              {LINES.slice(0, shown).map((l, i) => (
                <p key={i} className={`font-mono text-xs sm:text-sm up ${l.c}`}>{l.s}</p>
              ))}
              {shown < LINES.length && <span className="font-mono text-xs text-orange-400 blink">█</span>}
            </div>
          </div>
        </div>

        <a href="https://github.com/mzl2233/dxc3-agent" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-800 hover:bg-red-700 border border-red-700 text-white font-semibold rounded-xl transition-all hover:scale-105 text-sm">
          <Github size={16} /> 查看源码
        </a>
      </div>
    </section>
  )
}
