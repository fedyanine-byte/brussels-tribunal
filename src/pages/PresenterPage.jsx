import { useState, useEffect } from 'react'
import { useGame } from '../GameContext'
import { ROUNDS } from '../data/rounds'
import TimerRing from '../components/TimerRing'

// Answer option colour scheme
const OPT = {
  A: { bar: 'bg-indigo-500',  text: 'text-indigo-300',  badge: 'bg-indigo-500' },
  B: { bar: 'bg-pink-500',    text: 'text-pink-300',    badge: 'bg-pink-500'   },
  C: { bar: 'bg-amber-500',   text: 'text-amber-300',   badge: 'bg-amber-500'  },
  D: { bar: 'bg-emerald-500', text: 'text-emerald-300', badge: 'bg-emerald-500' },
}

const BASE = import.meta.env.BASE_URL
const round = ROUNDS[0]

// Count answers from a Firebase object (null-safe)
const dist = (ans) => {
  const c = { A: 0, B: 0, C: 0, D: 0 }
  Object.values(ans || {}).forEach(a => { if (a?.answer) c[a.answer]++ })
  return c
}

export default function PresenterPage() {
  const {
    gameState, createGame,
    startRound, revealAnswers, startBonus, revealBonus,
    showLeaderboard, restartRound,
  } = useGame()

  const [creating,   setCreating]   = useState(false)
  const [created,    setCreated]    = useState(false)
  const [createErr,  setCreateErr]  = useState(null)

  useEffect(() => {
    if (created) return
    setCreating(true)
    setCreateErr(null)
    createGame(round.id)
      .then(() => { setCreated(true); setCreating(false) })
      .catch((err) => { setCreating(false); setCreateErr(err?.message || 'Firebase error') })
  }, [])

  // ── Firebase error screen ──────────────────────────────────────────────────
  if (createErr) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center max-w-lg px-6">
          <div className="text-5xl mb-4">🔥</div>
          <p className="text-red-400 font-bold text-2xl mb-2">Firebase not responding</p>
          <p className="text-white/40 text-sm font-mono break-all mb-6">{createErr}</p>
          <p className="text-white/30 text-sm mb-3">
            Firebase Console → Realtime Database → Rules:
          </p>
          <pre className="bg-white/5 text-green-300 text-xs text-left rounded-xl p-4 mb-6">
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
            onClick={() => {
              setCreateErr(null); setCreating(true)
              createGame(round.id)
                .then(() => { setCreated(true); setCreating(false) })
                .catch(err => { setCreating(false); setCreateErr(err?.message || 'Firebase error') })
            }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold">
            Retry
          </button>
        </div>
      </div>
    )
  }

  // ── Loading ────────────────────────────────────────────────────────────────
  if (creating || !gameState) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-spin">⚙️</div>
          <p className="text-white/60 text-xl">Creating game…</p>
        </div>
      </div>
    )
  }

  // ── Common derived state ───────────────────────────────────────────────────
  const g          = gameState
  const teamList   = Object.entries(g.teams || {}).map(([id, t]) => ({ id, ...t }))
  const teamCount  = teamList.length
  const ansCount   = Object.keys(g.answers || {}).length
  const bonusCount = Object.keys(g.bonusAnswers || {}).length
  const allIn      = teamCount > 0 && ansCount >= teamCount
  const allBonusIn = teamCount > 0 && bonusCount >= teamCount

  const joinUrl = `${window.location.origin}${BASE}join`

  // ── LOBBY ──────────────────────────────────────────────────────────────────
  if (g.status === 'lobby') {
    return (
      <div className="min-h-screen bg-eu-dark flex flex-col p-10">

        {/* Top bar */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-white/40 text-base uppercase tracking-widest">Brussels Tribunal</p>
            <h1 className="text-5xl font-black text-white mt-1">Round {round.number}: {round.title}</h1>
          </div>
          <div className="flex gap-3">
            {round.laws.map(l => (
              <span key={l} className="bg-eu-gold/20 text-eu-gold text-2xl font-black px-6 py-2 rounded-full">{l}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-8 flex-1 min-h-0">

          {/* Scenario image — fills entire left column, caption overlay */}
          <div className="flex-1 rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative min-h-0">
            <img
              src={`${BASE}${round.scenario.imageUrl}`}
              alt={round.scenario.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent px-8 py-6">
              <p className="text-eu-gold font-black text-2xl mb-2">{round.scenario.title}</p>
              <p className="text-white/80 text-lg leading-relaxed line-clamp-3">{round.scenario.text}</p>
            </div>
          </div>

          {/* Right column: QR + teams + start */}
          <div className="w-88 flex flex-col gap-5" style={{ width: '22rem' }}>

            {/* QR code join box */}
            <div className="card flex flex-col items-center gap-3">
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Scan to join</p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(joinUrl)}&bgcolor=FFFFFF&color=000000&margin=8`}
                alt="QR Code"
                className="w-44 h-44 rounded-xl"
              />
              <p className="text-eu-gold font-mono text-sm font-bold break-all text-center leading-snug">{joinUrl}</p>
              <p className="text-white/30 text-xs">Enter your team name</p>
            </div>

            {/* Team list */}
            <div className="card flex-1 overflow-y-auto">
              <h3 className="text-white font-black text-2xl mb-4 flex items-center gap-3">
                Teams
                <span className="bg-white/10 text-white/60 text-lg px-3 py-0.5 rounded-full">{teamCount}</span>
              </h3>
              {teamCount === 0 ? (
                <p className="text-white/30 text-lg text-center py-8">Waiting for teams…</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {teamList.map(t => (
                    <div key={t.id} className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5">
                      <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                      <span className="text-white font-bold text-xl">{t.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Start button */}
            <button
              onClick={() => startRound()}
              disabled={teamCount === 0}
              className="py-7 text-3xl font-black rounded-2xl bg-eu-gold text-eu-dark
                         hover:bg-yellow-300 transition-all shadow-xl shadow-yellow-500/20
                         disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none">
              ▶ Start Round {round.number}
            </button>
            {teamCount === 0 && (
              <p className="text-white/30 text-sm text-center -mt-3">Need at least 1 team</p>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ── QUESTION ──────────────────────────────────────────────────────────────
  if (g.status === 'question') {
    const d = dist(g.answers)
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-6 gap-4">

        {/* Question + timer row — full width, compact */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <div className="flex-1">
            <p className="text-white/40 text-sm uppercase tracking-widest mb-1">
              Round {round.number} · {round.theme}
            </p>
            <p className="text-white font-black text-4xl leading-tight">{round.question}</p>
          </div>
          <div className="flex items-center gap-5 flex-shrink-0">
            <div className="text-center">
              <p className="text-white/40 text-xs uppercase tracking-wider">Answers</p>
              <p className="text-white font-black text-6xl tabular-nums leading-none">{ansCount}/{teamCount}</p>
            </div>
            <TimerRing timerEnd={g.timerEnd} large />
          </div>
        </div>

        {/* IMAGE (hero, ~65%) + compact answer list (right, ~35%) */}
        <div className="flex gap-5 flex-1 min-h-0">

          {/* Scenario image — DOMINATES */}
          <div className="flex-1 rounded-3xl overflow-hidden bg-white/5 border border-white/10 relative">
            <img
              src={`${BASE}${round.scenario.imageUrl}`}
              alt={round.scenario.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6">
              <p className="text-white font-bold text-2xl">{round.scenario.title}</p>
              <p className="text-white/60 text-base">{round.scenario.imageCaption}</p>
            </div>
          </div>

          {/* Right column — compact answer list + reveal */}
          <div className="w-72 flex flex-col gap-3 flex-shrink-0">
            {round.options.map(opt => {
              const count = d[opt.id] || 0
              const pct   = teamCount > 0 ? Math.round(count / teamCount * 100) : 0
              const col   = OPT[opt.id]
              return (
                <div key={opt.id} className="bg-white/5 rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center
                                     font-black text-white text-lg flex-shrink-0 ${col.badge}`}>{opt.id}</span>
                    <span className="text-white/80 font-semibold text-sm flex-1 leading-snug">{opt.text}</span>
                    <span className="text-white font-black text-2xl tabular-nums">{count}</span>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full answer-bar ${col.bar}`}
                         style={{ width: `${pct}%` }} />
                  </div>
                </div>
              )
            })}

            <button
              onClick={() => revealAnswers()}
              className={`mt-auto py-5 text-xl font-black rounded-2xl transition-all
                ${allIn
                  ? 'bg-eu-gold text-eu-dark hover:bg-yellow-300 shadow-lg shadow-yellow-500/20'
                  : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20'
                }`}>
              {allIn ? '✓ Reveal' : '⏭ Reveal now'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── REVEAL ────────────────────────────────────────────────────────────────
  if (g.status === 'reveal') {
    const d = dist(g.answers)
    const correctOpt = round.options.find(o => o.id === round.correctAnswer)

    // Projected standings: current score + points if correct this round
    const projectedTeams = teamList
      .map(t => {
        const got = g.answers?.[t.id]?.answer === round.correctAnswer
        return { ...t, gained: got ? round.points : 0, projected: (t.score || 0) + (got ? round.points : 0) }
      })
      .sort((a, b) => b.projected - a.projected)

    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-6 gap-4">

        {/* Correct answer banner — compact top bar */}
        <div className="bg-emerald-500/15 border-2 border-emerald-500 rounded-2xl px-6 py-4
                        flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-0.5">✅ Correct Answer</p>
            <p className="text-white font-black text-4xl">
              {round.correctAnswer} — {correctOpt?.text}
            </p>
          </div>
          <div className="flex gap-3">
            {round.bonus && (
              <button onClick={() => startBonus()}
                className="bg-eu-gold/20 border-2 border-eu-gold text-eu-gold
                           text-lg font-black px-6 py-3 rounded-xl hover:bg-eu-gold/30 transition-all">
                ⭐ Bonus
              </button>
            )}
            <button onClick={() => showLeaderboard(round)}
              className="bg-eu-gold text-eu-dark text-lg font-black px-6 py-3
                         rounded-xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-500/20">
              🏆 Full Leaderboard
            </button>
            <button onClick={() => restartRound()}
              className="bg-white/10 text-white/60 text-lg font-bold px-4 py-3
                         rounded-xl border border-white/20 hover:bg-white/20 transition-all">
              🔄
            </button>
          </div>
        </div>

        {/* Explanation + LIVE RANKINGS side by side */}
        <div className="flex gap-5 flex-1 min-h-0">

          {/* Explanation — primary, large text */}
          <div className="flex-1 card overflow-y-auto">
            <p className="text-eu-gold font-black text-3xl mb-5">{round.reveal.title}</p>
            <div className="flex flex-col gap-6">
              {round.reveal.points.map((pt, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-3xl flex-shrink-0 mt-1">{pt.icon}</span>
                  <div>
                    <span className="text-eu-gold text-xs font-black uppercase tracking-widest block mb-1">{pt.law}</span>
                    <p className="text-white text-2xl leading-relaxed">{pt.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Live standings — visible immediately, no button press needed */}
          <div className="w-80 flex flex-col gap-3 flex-shrink-0">
            <p className="text-white/50 text-sm font-bold uppercase tracking-wider">
              🏆 Standings after Round {round.number}
            </p>
            {projectedTeams.map((t, i) => (
              <div key={t.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl border-2
                  ${i === 0 ? 'bg-eu-gold/15 border-eu-gold' : 'bg-white/5 border-white/10'}`}>
                <span className="text-2xl w-8 text-center flex-shrink-0">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : <span className="text-white/40 text-lg">{i+1}</span>}
                </span>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                <span className={`flex-1 font-bold text-base truncate ${i === 0 ? 'text-eu-gold' : 'text-white'}`}>
                  {t.name}
                </span>
                <div className="text-right flex-shrink-0">
                  <p className={`font-black text-xl tabular-nums ${i === 0 ? 'text-eu-gold' : 'text-white'}`}>
                    {t.projected}
                  </p>
                  {t.gained > 0 && (
                    <p className="text-emerald-400 text-xs font-bold">+{t.gained}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Answer distribution — compact */}
            <div className="mt-2 bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/40 text-xs uppercase tracking-wider mb-3">Answer distribution</p>
              {round.options.map(opt => {
                const count = d[opt.id] || 0
                const pct   = teamCount > 0 ? Math.round(count / teamCount * 100) : 0
                const isCorrect = opt.id === round.correctAnswer
                const col = OPT[opt.id]
                return (
                  <div key={opt.id} className="flex items-center gap-2 mb-2">
                    <span className={`w-6 h-6 rounded-md flex items-center justify-center
                                     font-black text-white text-xs flex-shrink-0 ${col.badge}`}>{opt.id}</span>
                    <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${isCorrect ? 'bg-emerald-500' : col.bar}`}
                           style={{ width: `${pct}%` }} />
                    </div>
                    <span className={`font-black text-base tabular-nums w-5 text-right
                      ${isCorrect ? 'text-emerald-400' : 'text-white/60'}`}>{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── BONUS ─────────────────────────────────────────────────────────────────
  if (g.status === 'bonus') {
    const d = dist(g.bonusAnswers)
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-8 gap-6">

        <div className="flex items-start justify-between">
          <div>
            <span className="bg-eu-gold/20 text-eu-gold text-xl font-black uppercase
                             tracking-wider px-5 py-2 rounded-full">
              ⭐ Bonus — {round.bonusPoints} pts
            </span>
            <p className="text-white font-black text-5xl mt-4 leading-tight">{round.bonus.question}</p>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0 pt-2">
            <div className="text-center">
              <p className="text-white/40 text-sm uppercase tracking-wider">Answers</p>
              <p className="text-white font-black text-6xl tabular-nums">{bonusCount}/{teamCount}</p>
            </div>
            <TimerRing timerEnd={g.timerEnd} large />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 flex-1">
          {round.bonus.options.map(opt => {
            const count = d[opt.id] || 0
            const pct   = teamCount > 0 ? Math.round(count / teamCount * 100) : 0
            const col   = OPT[opt.id]
            return (
              <div key={opt.id} className="card flex flex-col justify-between">
                <div className="flex items-center gap-4 mb-4">
                  <span className={`w-12 h-12 rounded-xl flex items-center justify-center
                                   font-black text-white text-2xl ${col.badge}`}>{opt.id}</span>
                  <p className="text-white font-bold text-2xl flex-1">{opt.text}</p>
                  <span className="text-white font-black text-4xl tabular-nums">{count}</span>
                </div>
                <div className="h-6 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full answer-bar ${col.bar}`}
                       style={{ width: `${pct}%` }} />
                </div>
              </div>
            )
          })}
        </div>

        <button
          onClick={() => revealBonus()}
          className={`py-5 text-2xl font-black rounded-2xl transition-all mx-auto w-80
            ${allBonusIn
              ? 'bg-eu-gold text-eu-dark hover:bg-yellow-300 shadow-lg shadow-yellow-500/20'
              : 'bg-white/10 text-white border-2 border-white/20 hover:bg-white/20'}`}>
          {allBonusIn ? '✓ Reveal Bonus' : '⏭ Reveal Now'}
        </button>
      </div>
    )
  }

  // ── BONUS REVEAL ──────────────────────────────────────────────────────────
  if (g.status === 'bonus_reveal') {
    const d    = dist(g.bonusAnswers)
    const maxC = Math.max(...Object.values(d), 1)
    const correctOpt = round.bonus.options.find(o => o.id === round.bonus.correctAnswer)
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col p-8 gap-6">

        <div className="bg-emerald-500/15 border-2 border-emerald-500 rounded-3xl p-7
                        flex items-center justify-between flex-shrink-0">
          <div>
            <p className="text-emerald-400 text-lg font-bold uppercase tracking-widest mb-1">✅ Bonus Answer</p>
            <p className="text-white font-black text-5xl">
              {round.bonus.correctAnswer} — {correctOpt?.text}
            </p>
          </div>
          <button onClick={() => showLeaderboard(round)}
            className="bg-eu-gold text-eu-dark text-xl font-black px-8 py-5
                       rounded-2xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-500/20">
            🏆 Show Leaderboard
          </button>
        </div>

        <div className="flex gap-8 flex-1 min-h-0">
          <div className="flex-1 card overflow-y-auto">
            <p className="text-eu-gold font-black text-3xl mb-6">Explanation</p>
            <p className="text-white text-2xl leading-relaxed">{round.bonus.explanation}</p>
          </div>

          <div className="w-80 flex flex-col gap-3 flex-shrink-0">
            <p className="text-white/40 text-sm uppercase tracking-wider mb-1">Results</p>
            {round.bonus.options.map(opt => {
              const count = d[opt.id] || 0
              const pct   = Math.round(count / maxC * 100)
              const isCorrect = opt.id === round.bonus.correctAnswer
              const col = OPT[opt.id]
              return (
                <div key={opt.id}
                  className={`rounded-2xl p-4 border-2
                    ${isCorrect ? 'bg-emerald-500/15 border-emerald-500' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center
                                     font-black text-white text-base ${col.badge}`}>{opt.id}</span>
                    <p className={`font-bold flex-1 text-base ${isCorrect ? 'text-emerald-300' : 'text-white/70'}`}>
                      {opt.text} {isCorrect && '✓'}
                    </p>
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
      </div>
    )
  }

  // ── LEADERBOARD ───────────────────────────────────────────────────────────
  if (g.status === 'leaderboard') {
    const sorted = [...teamList].sort((a, b) => (b.score || 0) - (a.score || 0))
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-10">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <div className="text-8xl mb-4">🏆</div>
            <h1 className="text-7xl font-black text-white mb-2">LEADERBOARD</h1>
            <p className="text-white/40 text-2xl">After Round {round.number}</p>
          </div>
          <div className="flex flex-col gap-4">
            {sorted.map((t, i) => (
              <div key={t.id}
                className={`flex items-center gap-6 p-6 rounded-3xl border-2 animate-slide-up
                  ${i === 0
                    ? 'bg-eu-gold/15 border-eu-gold'
                    : 'bg-white/5 border-white/10'}`}
                style={{ animationDelay: `${i * 0.1}s` }}>
                <span className="text-5xl w-16 text-center">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`}
                </span>
                <div className="w-5 h-5 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                <span className={`flex-1 font-black text-4xl ${i === 0 ? 'text-eu-gold' : 'text-white'}`}>
                  {t.name}
                </span>
                <span className={`font-black text-5xl tabular-nums ${i === 0 ? 'text-eu-gold' : 'text-white'}`}>
                  {t.score || 0}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <button onClick={() => restartRound()}
              className="bg-white/10 text-white text-xl font-bold px-8 py-4
                         rounded-2xl border border-white/20 hover:bg-white/20 transition-all">
              🔄 Play Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
