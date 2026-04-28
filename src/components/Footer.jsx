import { Github } from 'lucide-react'
export default function Footer() {
  return (
    <footer className="border-t border-slate-800/40 py-12 px-4 text-center">
      <h2 className="text-2xl font-black mb-2 orange-text">地下城堡3 AI Agent</h2>
      <p className="text-slate-500 text-sm mb-6">mimo-v2.5-pro · ADB · OCR · Python · 个人项目</p>
      <a href="https://github.com/mzl2233/dxc3-agent" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white rounded-xl transition-all hover:scale-105 text-sm">
        <Github size={16} /> GitHub
      </a>
      <p className="mt-8 text-slate-700 text-xs">⚠️ 仅供学习研究，使用自动化脚本可能违反游戏服务条款</p>
    </footer>
  )
}
