import { useNavigate } from 'react-router-dom'

const EU_STARS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * 2 * Math.PI - Math.PI / 2
  return { x: 50 + 38 * Math.cos(angle), y: 50 + 38 * Math.sin(angle) }
})

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-eu-dark flex flex-col items-center justify-center p-6">
      {/* EU Flag emblem */}
      <div className="mb-8">
        <svg viewBox="0 0 100 100" className="w-24 h-24 drop-shadow-2xl">
          <circle cx="50" cy="50" r="50" fill="#003399" />
          {EU_STARS.map((s, i) => (
            <text key={i} x={s.x} y={s.y} textAnchor="middle" dominantBaseline="middle"
              fontSize="10" fill="#FFCC00" style={{ userSelect: 'none' }}>★</text>
          ))}
        </svg>
      </div>

      {/* Title */}
      <h1 className="text-5xl font-black text-white tracking-tight mb-1 text-center">
        BRUSSELS TRIBUNAL
      </h1>
      <p className="text-eu-gold text-lg font-semibold mb-2 text-center tracking-widest uppercase">
        Digital Law · Live Game
      </p>
      <p className="text-white/40 text-sm mb-12 text-center">
        GDPR · DMA · DSA · AI Act
      </p>

      {/* Mode selector */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button
          onClick={() => navigate('/presenter')}
          className="flex-1 bg-eu-gold text-eu-dark font-black text-xl py-5 px-8
                     rounded-2xl hover:bg-yellow-300 active:scale-95 transition-all
                     shadow-lg shadow-yellow-500/20 flex flex-col items-center gap-1"
        >
          <span className="text-3xl">📽️</span>
          <span>HOST GAME</span>
          <span className="font-normal text-sm opacity-60">Presenter / Projector</span>
        </button>

        <button
          onClick={() => navigate('/join')}
          className="flex-1 bg-white/10 text-white font-black text-xl py-5 px-8
                     rounded-2xl hover:bg-white/20 active:scale-95 transition-all
                     border-2 border-white/20 flex flex-col items-center gap-1"
        >
          <span className="text-3xl">📱</span>
          <span>JOIN GAME</span>
          <span className="font-normal text-sm opacity-60">Student / Team</span>
        </button>
      </div>

      <p className="text-white/20 text-xs mt-10">
        Lecture 8 · Riga Stradiņš University · Digital Economy
      </p>
    </div>
  )
}
