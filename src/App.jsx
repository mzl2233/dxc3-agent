import { useEffect, useRef } from 'react'
import Hero from './components/Hero.jsx'
import AgentLoop from './components/AgentLoop.jsx'
import MimoDemo from './components/MimoDemo.jsx'
import Modules from './components/Modules.jsx'
import RunLog from './components/RunLog.jsx'
import Footer from './components/Footer.jsx'

function ParticleCanvas() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    let raf
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const N = 80
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,120,50,0.5)'
        ctx.fill()
      })
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(255,100,40,${0.15 * (1 - d / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="fixed inset-0 pointer-events-none z-0" />
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#060608] text-slate-100 overflow-x-hidden">
      <ParticleCanvas />
      <div className="fixed inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,80,20,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(255,160,30,0.04) 0%, transparent 50%)' }} />
      <div className="relative z-10">
        <Hero />
        <AgentLoop />
        <MimoDemo />
        <RunLog />
        <Modules />
        <Footer />
      </div>
    </div>
  )
}
