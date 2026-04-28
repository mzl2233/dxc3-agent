import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

const CASES = [
  {
    label: '日常任务',
    guide: `日常活动攻略：
1. 点击左侧"日常"入口
2. 领取所有日常任务
3. 执行任务（击败怪物/收集资源）
4. 返回领取奖励
5. 点击"全部领取"`,
    actions: [
      { action: 'tap_zone', target: '日常入口', params: {} },
      { action: 'wait_loading', target: '', params: { time: 1 } },
      { action: 'click', target: '领取任务', params: { retries: 2 } },
      { action: 'tap_zone', target: '执行任务', params: {} },
      { action: 'wait_loading', target: '', params: {} },
      { action: 'tap_zone', target: '领取奖励', params: {} },
      { action: 'click_text', target: '全部领取', params: {} },
      { action: 'tap_zone', target: '确认按钮', params: {} },
    ],
  },
  {
    label: '副本刷怪',
    guide: `黑暗森林副本攻略：
进入副本选择界面，选择黑暗森林。
推荐阵容：战士+法师+牧师。
战斗中开启自动战斗，等待结算。
结算后领取奖励返回。`,
    actions: [
      { action: 'tap_zone', target: '副本入口', params: {} },
      { action: 'click_text', target: '黑暗森林', params: { retries: 2 } },
      { action: 'wait', target: '', params: { time: 0.5 } },
      { action: 'tap_zone', target: '战斗开始', params: {} },
      { action: 'wait_loading', target: '', params: {} },
      { action: 'tap_zone', target: '自动战斗', params: {} },
      { action: 'wait', target: '', params: { time: 30 } },
      { action: 'tap_zone', target: '领取奖励', params: {} },
      { action: 'tap_zone', target: '返回主城', params: {} },
    ],
  },
  {
    label: '主线推进',
    guide: `主线第5章 先祖之墓：
前往先祖之墓区域探索。
与NPC对话触发剧情。
击败守卫BOSS（建议等级40+）。
完成对话后传送回城。`,
    actions: [
      { action: 'tap_zone', target: '主菜单', params: {} },
      { action: 'click_text', target: '主线任务', params: {} },
      { action: 'tap_zone', target: '追踪任务', params: {} },
      { action: 'wait_loading', target: '', params: {} },
      { action: 'tap_zone', target: '跳过对话', params: {} },
      { action: 'wait', target: '', params: { time: 1 } },
      { action: 'tap_zone', target: '战斗开始', params: {} },
      { action: 'wait_loading', target: '', params: {} },
      { action: 'tap_zone', target: '自动战斗', params: {} },
      { action: 'tap_zone', target: '跳过对话', params: {} },
      { action: 'tap_zone', target: '返回主城', params: {} },
    ],
  },
]

const ACTION_COLOR = {
  tap_zone:     'text-yellow-400',
  click:        'text-sky-400',
  click_text:   'text-sky-300',
  wait_loading: 'text-slate-400',
  wait:         'text-slate-500',
  recover:      'text-red-400',
}

export default function MimoDemo() {
  const [active, setActive] = useState(0)
  const c = CASES[active]

  return (
    <section className="py-24 px-4" style={{ background: 'linear-gradient(to bottom, transparent, rgba(88,28,220,0.04), transparent)' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-orange-400 text-xs font-mono uppercase tracking-widest mb-3">核心 AI 组件</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            MIMO 解析演示
          </h2>
          <p className="text-slate-400 text-lg">
            攻略文本 → <span className="text-orange-400 font-mono">mimo-v2.5-pro</span> → 可执行 JSON 动作序列
          </p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {CASES.map((c, i) => (
            <button key={c.label} onClick={() => setActive(i)}
              className={`px-4 py-1.5 rounded-lg text-sm transition-all ${
                active === i ? 'bg-orange-700 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="term">
            <div className="term-bar">
              <div className="dot bg-red-500" /><div className="dot bg-yellow-500" /><div className="dot bg-green-500" />
              <span className="ml-2 text-slate-500 text-xs font-mono">攻略原文 (B站维基)</span>
            </div>
            <div className="p-4 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap min-h-[180px]">
              {c.guide}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-orange-950/30 border border-orange-800/30 rounded-xl">
              <span className="text-orange-400 text-sm">🤖</span>
              <span className="text-orange-300 text-xs font-mono">mimo-v2.5-pro 解析中</span>
              <ChevronRight size={14} className="text-orange-600 ml-auto" />
              <span className="text-orange-400 text-xs font-mono">{c.actions.length} 个动作</span>
            </div>
            <div className="term flex-1">
              <div className="term-bar">
                <div className="dot bg-red-500" /><div className="dot bg-yellow-500" /><div className="dot bg-green-500" />
                <span className="ml-2 text-slate-500 text-xs font-mono">输出 JSON 动作序列</span>
              </div>
              <div className="p-3 space-y-1.5 overflow-auto" style={{ maxHeight: 280 }}>
                {c.actions.map((a, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-mono bg-slate-900/50 rounded-lg px-3 py-1.5 border border-slate-800/50">
                    <span className="text-slate-600 w-4 shrink-0">{i + 1}</span>
                    <span className={`font-semibold shrink-0 ${ACTION_COLOR[a.action] ?? 'text-slate-300'}`}>{a.action}</span>
                    {a.target && <span className="text-slate-300">"{a.target}"</span>}
                    {a.params && Object.keys(a.params).length > 0 && (
                      <span className="text-slate-600 ml-auto">{JSON.stringify(a.params)}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
