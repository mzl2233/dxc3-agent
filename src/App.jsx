import Hero from './components/Hero.jsx'
import AgentLoop from './components/AgentLoop.jsx'
import MimoDemo from './components/MimoDemo.jsx'
import Modules from './components/Modules.jsx'
import RunLog from './components/RunLog.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#07080f] text-slate-100 overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 20% 20%, rgba(88,28,220,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(246,200,96,0.04) 0%, transparent 60%)' }} />
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
