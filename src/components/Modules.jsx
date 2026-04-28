import { useEffect, useRef, useState } from 'react'

const TECH = [
  { name: 'mimo-v2.5-pro', role: 'AI 推理引擎', detail: '小米 MIMO 大模型，将攻略自然语言转换为结构化 JSON 动作序列', badge: 'AI Core', bc: 'bg-orange-500/15 border-orange-500/30 text-orange-400', c: 'text-orange-400', b: 'border-orange-800/30 bg-orange-950/15' },
  { name: 'ADB (Android Debug Bridge)', role: '模拟器控制', detail: '通过 ADB 协议连接雷电模拟器，发送 tap/swipe/key 等指令控制游戏', badge: 'Control', bc: 'bg-green-500/15 border-green-500/30 text-green-400', c: 'text-green-400', b: 'border-green-800/30 bg-green-950/15' },
  { name: 'EasyOCR / PaddleOCR', role: '屏幕文字识别', detail: '识别游戏界面当前显示的文字，定位按钮坐标，验证操作是否成功', badge: 'Vision', bc: 'bg-sky-500/15 border-sky-500/30 text-sky-400', c: 'text-sky-400', b: 'border-sky-800/30 bg-sky-950/15' },
  { name: 'OpenCV', role: '图像模板匹配', detail: '与 OCR 互补，识别图标/按钮等没有文字的 UI 元素', badge: 'Vision', bc: 'bg-sky-500/15 border-sky-500/30 text-sky-400', c: 'text-sky-400', b: 'border-sky-800/30 bg-sky-950/15' },
  { name: 'BeautifulSoup + requests', role: '攻略爬取', detail: '爬取 B站维基 wiki.biligame.com/dxcb3，解析主线/日常/副本/BOSS 攻略', badge: 'Fetch', bc: 'bg-violet-500/15 border-violet-500/30 text-violet-400', c: 'text-violet-400', b: 'border-violet-800/30 bg-violet-950/15' },
  { name: 'pyautogui + 定时调度', role: '安全 & 调度', detail: '鼠标移到左上角紧急停止；支持按时间自动调度（日常/主线智能切换）', badge: 'Safety', bc: 'bg-pink-500/15 border-pink-500/30 text-pink-400', c: 'text-pink-400', b: 'border-pink-800/30 bg-pink-950/15' },
]

const STATS = [
  { v: '~85s', l: '完整运行耗时' },
  { v: '12种', l: 'MIMO 动作类型' },
  { v: '0次', l: '人工介入' },
  { v: '4模块', l: '解耦架构' },
]

export default function Modules() {
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
          <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">技术栈</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">项目组成</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {STATS.map((s, i) => (
            <div key={s.l} className={`text-center p-5 rounded-2xl bg-slate-900/40 border border-slate-800/50
              transition-all duration-500 ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="text-3xl font-black mb-1 orange-text">{s.v}</div>
              <div className="text-slate-500 text-xs">{s.l}</div>
            </div>
          ))}
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TECH.map((t, i) => (
            <div key={t.name} className={`p-5 rounded-2xl border ${t.b} transition-all duration-500
              ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold text-sm ${t.c}`}>{t.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded border font-mono ${t.bc}`}>{t.badge}</span>
              </div>
              <p className="text-slate-400 text-xs font-medium mb-1">{t.role}</p>
              <p className="text-slate-600 text-xs leading-relaxed">{t.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
