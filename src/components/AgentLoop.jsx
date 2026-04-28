import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    n: '01', icon: '🌐', title: '爬取攻略',
    mod: 'GuideFetcher', color: 'text-orange-400', border: 'border-orange-800/40 bg-orange-950/20',
    lines: ['requests + BeautifulSoup', '爬取 B站维基游戏攻略', '支持主线 / 日常 / 副本 / BOSS', '结构化提取章节内容'],
  },
  {
    n: '02', icon: '🤖', title: 'AI 解析动作',
    mod: 'ActionParser × MIMO', color: 'text-orange-400', border: 'border-orange-800/40 bg-orange-950/20',
    badge: 'MIMO', lines: ['调用 mimo-v2.5-pro 模型', '攻略文本 → JSON 动作序列', '支持 12 种动作类型', '自动处理游戏 UI 布局'],
  },
  {
    n: '03', icon: '📱', title: '感知游戏状态',
    mod: 'GameAutomation', color: 'text-red-400', border: 'border-red-800/40 bg-red-950/20',
    lines: ['ADB 截取当前屏幕', 'OCR 识别界面文字位置', 'OpenCV 图像模板匹配', '智能等待画面稳定'],
  },
  {
    n: '04', icon: '👆', title: '执行 & 验证',
    mod: 'GameAutomation', color: 'text-pink-400', border: 'border-pink-800/40 bg-pink-950/20',
    lines: ['ADB 发送 click/tap/swipe', 'OCR 确认操作结果', '失败自动重试 (2次)', '卡死自动 recover'],
  },
]

export default function AgentLoop() {
  const [vis, setVis] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">Agent 架构</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">感知 · 推理 · 执行</h2>
          <p className="text-slate-400 text-lg">四步闭环，MIMO 模型负责推理规划，ADB 负责执行</p>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.n}
              className={`relative p-5 rounded-2xl border ${s.border} transition-all duration-500
                ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}>
              {s.badge && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-mono bg-yellow-500/15 border border-yellow-500/30 text-yellow-400">
                  {s.badge}
                </span>
              )}
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className={`text-xs font-mono ${s.color} mb-0.5`}>{s.n} / {s.mod}</div>
              <h3 className="font-bold text-white text-base mb-3">{s.title}</h3>
              <ul className="space-y-1">
                {s.lines.map(l => (
                  <li key={l} className="text-xs text-slate-400 flex items-start gap-1.5">
                    <span className={`${s.color} mt-0.5 shrink-0`}>›</span>{l}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-600 px-4 py-2 bg-slate-900/40 rounded-xl border border-slate-800">
            步骤 03 → 04 在每个动作前后各执行一次，形成完整感知-执行闭环
          </div>
        </div>
      </div>
    </section>
  )
}
