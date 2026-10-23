import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../GameContext'
import { ROUNDS } from '../data/rounds'
import TimerRing from '../components/TimerRing'

const OPTION_COLORS = {
  A: { bar: 'bg-indigo-500', text: 'text-indigo-300' },
  B: { bar: 'bg-pink-500',   text: 'text-pink-300'   },
  C: { bar: 'bg-amber-500',  text: 'text-amber-300'  },
  D: { bar: 'bg-emerald-500',text: 'text-emerald-300' },
}

const round = ROUNDS[0]

export default function PresenterPage() {
  const navigate = useNavigate()
  const { gameCode, gameState, createGame,
    startRound, revealAnswers, startBonus, revealBonus,
    showLeaderboard, restartRound } = useGame()
  const [creating, setCreating] = useState(false)
  const [created,  setCreated]  = useState(false)
  const [createErr, setCreateErr] = useState(null)

  useEffect(() => {
    if (created) return
    setCreating(true)
    setCreateErr(null)
    createGame(round.id)
      .then(() => { setCreated(true); setCreating(false) })
      .catch((err) => { setCreating(false); setCreateErr(err?.message || 'Firebase error') })
  }, [])

  if (createErr) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-4xl mb-4">🔥</div>
          <p className="text-red-400 font-semibold mb-2">Firebase connection failed</p>
          <p className="text-white/40 text-sm font-mono break-all mb-6">{createErr}</p>
          <p className="text-white/30 text-xs mb-4">
            Скорее всего не задеплоены правила БД.<br/>
            Открой Firebase Console → Realtime Database → Rules → вставь:
          </p>
          <pre className="bg-white/5 text-green-300 text-xs text-left rounded p-3 mb-6">
{`{
  "rules": {
    "games": {
      "$code": {
        ".read": true,
        ".write": true
      }
    }
  }
}`}
          </pre>
          <button
            onClick={() => { setCreateErr(null); setCreated(false); setCreating(true);
              createGame(round.id)
                .then(() => { setCreated(true); setCreating(false) })
                .catch((err) => { setCreating(false); setCreateErr(err?.message || 'Firebase error') }) }}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (creating || !gameCode) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⚙️</div>
          <p className="text-white/60">Creating game...</p>
        </div>
      </div>
    )
  }

  const g = gameState
  if (!g) return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <p className="text-white/40">Connecting...</p>
    </div>
  )

  const teamList   = Object.entries(g.teams).map(([id, t]) => ({ id, ...t }))
  const teamCount  = teamList.length
  const ansCount   = Object.keys(g.answers).length
  const bonusCount = Object.keys(g.bonusAnswers).length
  const allIn      = teamCount > 0 && ansCount >= teamCount
  const allBonusIn = teamCount > 0 && bonusCount >= teamCount

  const dist = (ans) => {
    const c = { A:0, B:0, C:0, D:0 }
    Object.values(ans).forEach(a => { if (a.answer) c[a.answer]++ })
    return c
  }

  // ── LOBBY ─────────────────────────────────────────────────────────────────
  if (g.status === 'lobby') {
    const joinUrl = `${window.location.origin}/join`
    return (
      <div className="min-h-screen bg-eu-dark flex flex-col p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-white/40 text-sm uppercase tracking-widest">Brussels Tribunal</p>
            <h1 className="text-3xl font-black text-white">Round {round.number}: {round.title}</h1>
          </div>
          <div className="flex gap-2">
            {round.laws.map(l => (
              <span key={l} className="bg-eu-gold/20 text-eu-gold text-xs font-bold px-3 py-1 rounded-full">{l}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-8 flex-1">
          {/* Big game code */}
          <div className="flex-1 card flex flex-col items-center justify-center text-center min-h-64">
            <p className="text-white/50 text-sm uppercase tracking-widest mb-2">Students — open in browser:</p>
            <p className="text-eu-gold font-mono text-xl mb-1">{joinUrl}</p>
            <p className="text-white/30 text-sm mb-8">then enter this code:</p>
            <div className="bg-eu-gold text-eu-dark font-black text-7xl tracking-[0.2em]
                            px-10 py-5 rounded-3xl shadow-2xl shadow-yellow-500/20 mb-4">
              {gameCode}
            </div>
            <p className="text-white/30 text-sm">Show this on the projector</p>
          </div>

          {/* Teams + start */}
          <div className="w-72 flex flex-col gap-4">
            <div className="card">
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                Teams Joined
                <span className="bg-white/10 text-white/60 text-xs px-2 py-0.5 rounded-full">{teamCount}</span>
              </h3>
              {teamCount === 0 ? (
                <p className="text-white/30 text-sm text-center py-4">Waiting for teams...</p>
              ) : (
                <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                  {teamList.map(t => (
                    <div key={t.id} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/5">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                      <span className="text-white font-semibold text-sm">{t.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => startRound(gameCode)} disabled={teamCount === 0} className="btn-primary text-xl py-5">
              ▶ Start Round {round.number}
            </button>
            {teamCount === 0 && <p className="text-white/30 text-xs text-center">Need at least 1 team to start</p>}
          </div>
        </div>
      </div>
    )
  }

  // ── QUESTION ──────────────────────────────────────────────────────────────
  if (g.status === 'question') {
    const d = dist(g.answers)
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1 pr-4">
            <p className="text-white/40 text-xs uppercase tracking-widest">Round {round.number} · {round.theme}</p>
            <p className="text-white font-bold text-lg">{round.question}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white/40 text-xs">Answers in</p>
              <p className="text-white font-black text-2xl">{ansCount}/{teamCount}</p>
            </div>
            <TimerRing timerEnd={g.timerEnd} large />
          </div>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          {/* Scenario image */}
          <div className="flex-1 rounded-2xl overflow-hidden bg-white/5 border border-white/10 relative">
            <img src={round.scenario.imageUrl} alt={round.scenario.title} className="w-full h-full object-contain" />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
              <p className="text-white font-bold">{round.scenario.title}</p>
              <p className="text-white/60 text-sm">{round.scenario.imageCaption}</p>
            </div>
          </div>

          {/* Live bars */}
          <div className="w-72 flex flex-col gap-4">
            <div className="card flex-1">
              <p className="text-white/50 text-xs uppercase tracking-wider mb-4">Live responses</p>
              <div className="flex flex-col gap-4">
                {round.options.map(opt => {
                  const count = d[opt.id] || 0
                  const pct   = teamCount > 0 ? Math.round(count / teamCount * 100) : 0
                  const col   = OPTION_COLORS[opt.id]
                  return (
                    <div key={opt.id} className="flex flex-col gap-1">
                      <div className="flex justify-between">
                        <span className={`font-bold text-sm ${col.text}`}>{opt.id}. {opt.text}</span>
                        <span className="text-white/60 text-sm font-mono">{count}</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full answer-bar ${col.bar}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <button onClick={() => revealAnswers(gameCode)}
              className={`py-4 text-lg font-bold rounded-xl transition-all
                ${allIn ? 'bg-eu-gold text-eu-dark hover:bg-yellow-300 shadow-lg shadow-yellow-500/20'
                        : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'}`}>
              {allIn ? '✓ All Answered — Reveal' : '⏭ Reveal Now'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── REVEAL ────────────────────────────────────────────────────────────────
  if (g.status === 'reveal') {
    const d = dist(g.answers)
    const maxC = Math.max(...Object.values(d), 1)
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white">
            ✅ Correct: <span className="text-eu-gold">{round.correctAnswer}</span>
            {' — '}
            <span className="text-emerald-400">{round.options.find(o => o.id === round.correctAnswer)?.text}</span>
          </h2>
          <div className="flex gap-3">
            <button onClick={() => startBonus(gameCode)} className="btn-secondary">⭐ Bonus</button>
            <button onClick={() => showLeaderboard(gameCode, round)} className="btn-primary">🏆 Leaderboard</button>
          </div>
        </div>

        <div className="flex gap-6 flex-1 min-h-0">
          <div className="flex-1 card">
            <div className="flex flex-col gap-4">
              {round.options.map(opt => {
                const count = d[opt.id] || 0
                const pct = Math.round(count / maxC * 100)
                const isCorrect = opt.id === round.correctAnswer
                const col = OPTION_COLORS[opt.id]
                return (
                  <div key={opt.id}
                    className={`rounded-xl p-4 border ${isCorrect ? 'bg-emerald-500/15 border-emerald-500' : 'bg-white/5 border-white/10'}`}>
                    <div className="flex items-start gap-3 mb-2">
                      <span className={`w-9 h-9 rounded-lg flex items-center justify-center font-black text-white flex-shrink-0 ${col.bar}`}>
                        {opt.id}
                      </span>
                      <div className="flex-1">
                        <p className={`font-bold ${isCorrect ? 'text-emerald-300' : 'text-white'}`}>
                          {opt.text} {isCorrect && '✓'}
                        </p>
                        <p className="text-white/40 text-sm">{opt.subtext}</p>
                      </div>
                      <span className="text-white font-black text-xl">{count}</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full answer-bar ${isCorrect ? 'bg-emerald-500' : col.bar}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="w-80 flex flex-col gap-4">
            <div className="card flex-1 overflow-y-auto">
              <p className="text-eu-gold font-black text-lg mb-4">{round.reveal.title}</p>
              <div className="flex flex-col gap-4">
                {round.reveal.points.map((pt, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-xl flex-shrink-0">{pt.icon}</span>
                    <div>
                      <span className="text-eu-gold text-xs font-bold uppercase tracking-wider block mb-1">{pt.law}</span>
                      <p className="text-white/80 text-sm leading-relaxed">{pt.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => restartRound(gameCode)} className="btn-secondary text-sm">🔄 Restart Round</button>
          </div>
        </div>
      </div>
    )
  }

  // ── BONUS ─────────────────────────────────────────────────────────────────
  if (g.status === 'bonus') {
    const d = dist(g.bonusAnswers)
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="bg-eu-gold/20 text-eu-gold text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
              ⭐ Bonus — {round.bonusPoints} pts
            </span>
            <p className="text-white font-bold text-xl mt-2">{round.bonus.question}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white/40 text-xs">Answers in</p>
              <p className="text-white font-black text-2xl">{bonusCount}/{teamCount}</p>
            </div>
            <TimerRing timerEnd={g.timerEnd} large />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 flex-1 mb-4">
          {round.bonus.options.map(opt => {
            const count = d[opt.id] || 0
            const pct = teamCount > 0 ? Math.round(count / teamCount * 100) : 0
            const col = OPTION_COLORS[opt.id]
            return (
              <div key={opt.id} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-white ${col.bar}`}>{opt.id}</span>
                  <p className="text-white font-bold flex-1">{opt.text}</p>
                  <span className="text-white font-black text-xl">{count}</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full answer-bar ${col.bar}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>
        <button onClick={() => revealBonus(gameCode)}
          className={`py-4 text-lg font-bold rounded-xl transition-all mx-auto w-72
            ${allBonusIn ? 'bg-eu-gold text-eu-dark' : 'bg-white/10 text-white border border-white/20'}`}>
          {allBonusIn ? '✓ Reveal Bonus' : '⏭ Reveal Now'}
        </button>
      </div>
    )
  }

  // ── BONUS REVEAL ──────────────────────────────────────────────────────────
  if (g.status === 'bonus_reveal') {
    const d = dist(g.bonusAnswers)
    const maxC = Math.max(...Object.values(d), 1)
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-white">
            ✅ Bonus Answer: <span className="text-eu-gold">{round.bonus.correctAnswer}</span>
            {' — '}
            <span className="text-emerald-400">{round.bonus.options.find(o => o.id === round.bonus.correctAnswer)?.text}</span>
          </h2>
          <button onClick={() => showLeaderboard(gameCode, round)} className="btn-primary text-lg py-3 px-8">
            🏆 Show Leaderboard
          </button>
        </div>
        <div className="flex gap-6 flex-1 min-h-0">
          <div className="flex-1 card">
            {round.bonus.options.map(opt => {
              const count = d[opt.id] || 0
              const pct = Math.round(count / maxC * 100)
              const isCorrect = opt.id === round.bonus.correctAnswer
              const col = OPTION_COLORS[opt.id]
              return (
                <div key={opt.id}
                  className={`rounded-xl p-4 border mb-3 ${isCorrect ? 'bg-emerald-500/15 border-emerald-500' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm ${col.bar}`}>{opt.id}</span>
                    <p className={`font-bold flex-1 ${isCorrect ? 'text-emerald-300' : 'text-white'}`}>{opt.text} {isCorrect && '✓'}</p>
                    <span className="text-white font-black">{count}</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full answer-bar ${isCorrect ? 'bg-emerald-500' : col.bar}`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-80 card">
            <p className="text-eu-gold font-black mb-3">Explanation</p>
            <p className="text-white/80 text-sm leading-relaxed">{round.bonus.explanation}</p>
          </div>
        </div>
      </div>
    )
  }

  // ── LEADERBOARD ───────────────────────────────────────────────────────────
  if (g.status === 'leaderboard') {
    const sorted = teamList.sort((a, b) => (b.score || 0) - (a.score || 0))
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <div className="text-7xl mb-4">🏆</div>
            <h1 className="text-5xl font-black text-white mb-2">LEADERBOARD</h1>
            <p className="text-white/40">After Round {round.number}</p>
          </div>
          <div className="flex flex-col gap-3">
            {sorted.map((t, i) => (
              <div key={t.id}
                className={`flex items-center gap-5 p-5 rounded-2xl border animate-slide-up
                  ${i === 0 ? 'bg-eu-gold/15 border-eu-gold' : 'bg-white/5 border-white/10'}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-4xl w-12 text-center">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`}
                </span>
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.color }} />
                <span className={`flex-1 font-black text-2xl ${i === 0 ? 'text-eu-gold' : 'text-white'}`}>{t.name}</span>
                <span className={`font-black text-3xl tabular-nums ${i === 0 ? 'text-eu-gold' : 'text-white'}`}>{t.score || 0}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-8 justify-center">
            <button onClick={() => restartRound(gameCode)} className="btn-secondary">🔄 Play Again</button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
