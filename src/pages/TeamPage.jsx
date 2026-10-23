import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useGame } from '../GameContext'
import { ROUNDS } from '../data/rounds'
import TimerRing from '../components/TimerRing'

const OPTION_COLORS = {
  A: 'from-indigo-600 to-indigo-700 border-indigo-500',
  B: 'from-pink-600 to-pink-700 border-pink-500',
  C: 'from-amber-500 to-amber-600 border-amber-400',
  D: 'from-emerald-600 to-emerald-700 border-emerald-500',
}

const OPTION_RING = {
  A: 'ring-indigo-500',
  B: 'ring-pink-500',
  C: 'ring-amber-400',
  D: 'ring-emerald-500',
}

const round = ROUNDS[0]

export default function TeamPage() {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const { gameState, myTeamId, subscribe, submitAnswer } = useGame()

  const [myAnswer,       setMyAnswer]       = useState(null)
  const [myBonusAnswer,  setMyBonusAnswer]  = useState(null)
  const [submitted,      setSubmitted]      = useState(false)
  const [bonusSubmitted, setBonusSubmitted] = useState(false)

  // Subscribe on mount (covers page refresh — fixed game slot, no code needed)
  useEffect(() => { subscribe() }, [])

  // Reset answer state whenever a new question starts
  // questionIndex changes each time presenter calls nextQuestion()
  useEffect(() => {
    if (gameState?.status === 'question') {
      setMyAnswer(null)
      setSubmitted(false)
    }
    if (gameState?.status === 'bonus') {
      setMyBonusAnswer(null)
      setBonusSubmitted(false)
    }
  }, [gameState?.status, gameState?.questionIndex])   // ← questionIndex added

  const effectiveTeamId = myTeamId || teamId

  const handleAnswer = (optionId) => {
    if (submitted || gameState?.status !== 'question') return
    setMyAnswer(optionId)
    setSubmitted(true)
    submitAnswer(effectiveTeamId, optionId, false)
  }

  const handleBonus = (optionId) => {
    if (bonusSubmitted || gameState?.status !== 'bonus') return
    setMyBonusAnswer(optionId)
    setBonusSubmitted(true)
    submitAnswer(effectiveTeamId, optionId, true)
  }

  const g = gameState
  const myTeam = g?.teams?.[effectiveTeamId]

  // ── Connecting ─────────────────────────────────────────────────────────────
  if (!g || !myTeam) {
    return (
      <div className="min-h-screen bg-eu-dark flex flex-col items-center justify-center p-6">
        <div className="text-4xl mb-4 animate-pulse">🏛️</div>
        <p className="text-white text-lg font-bold">Connecting to game…</p>
        <button onClick={() => navigate('/join')} className="mt-8 text-white/30 text-sm hover:text-white/60">
          ← Re-join
        </button>
      </div>
    )
  }

  const teamColor = myTeam?.color || '#fff'
  const teamName  = myTeam?.name  || 'Your Team'

  // Multi-question helpers — used across all states
  const isMultiQ = round.isMultiQuestion ?? false
  const qi       = Math.min(g.questionIndex ?? 0, isMultiQ ? round.questions.length - 1 : 0)
  const totalQ   = isMultiQ ? round.questions.length : 1
  const currentQ = isMultiQ ? round.questions[qi] : round  // shape: { question, options, correctAnswer, points, law, explanation }

  // ── Team header (shown in all states) ──────────────────────────────────────
  const Header = () => (
    <div className="flex items-center gap-3 px-4 py-3 bg-black/30 border-b border-white/10 backdrop-blur">
      <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: teamColor }} />
      <span className="text-white font-bold flex-1">{teamName}</span>
      {myTeam?.score > 0 && (
        <span className="text-eu-gold font-black text-sm">{myTeam.score} pts</span>
      )}
    </div>
  )

  // ── LOBBY ──────────────────────────────────────────────────────────────────
  if (g.status === 'lobby') {
    const totalTeams = Object.keys(g.teams || {}).length
    return (
      <div className="min-h-screen bg-eu-dark flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-black text-white mb-2">You're in!</h2>
          <p className="text-white/50 mb-8">Waiting for the round to start…</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-8 py-5 mb-6">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Your team</p>
            <div className="flex items-center gap-3 justify-center">
              <div className="w-5 h-5 rounded-full" style={{ backgroundColor: teamColor }} />
              <p className="text-white font-black text-2xl">{teamName}</p>
            </div>
          </div>
          {isMultiQ && (
            <div className="bg-eu-gold/10 border border-eu-gold/30 rounded-2xl px-6 py-4 mb-6 max-w-xs">
              <p className="text-eu-gold font-bold text-sm">{totalQ} questions · {currentQ.points} pts each</p>
              <p className="text-white/50 text-xs mt-1">{round.questionTimerSeconds}s per question</p>
            </div>
          )}
          <p className="text-white/30 text-sm">{totalTeams} team{totalTeams !== 1 ? 's' : ''} joined</p>
          <div className="mt-8 flex gap-2">
            {[0,1,2,3].map(i => (
              <div key={i} className="w-2 h-2 rounded-full bg-white/20 animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  // ── QUESTION ───────────────────────────────────────────────────────────────
  if (g.status === 'question') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header />

        {/* Timer + question + progress */}
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-start gap-4">
            <TimerRing timerEnd={g.timerEnd} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                {isMultiQ ? (
                  <>
                    <span className="bg-eu-gold/20 text-eu-gold text-xs font-black px-2 py-0.5 rounded-full uppercase">
                      Q{qi + 1}/{totalQ}
                    </span>
                    <span className="text-white/40 text-xs">+{currentQ.points} pts</span>
                  </>
                ) : (
                  <p className="text-eu-gold text-xs font-bold uppercase tracking-wider">
                    Round {round.number} · {round.points} pts
                  </p>
                )}
              </div>
              <p className="text-white font-bold text-lg leading-snug">{currentQ.question}</p>
            </div>
          </div>
        </div>

        {/* Answer options */}
        <div className="flex-1 px-4 pb-6">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
              <div className="text-5xl">✅</div>
              <p className="text-white font-bold text-xl">Answer submitted!</p>
              <div className={`bg-gradient-to-br ${OPTION_COLORS[myAnswer]} border rounded-2xl
                               px-8 py-4 ring-4 ${OPTION_RING[myAnswer]} w-full max-w-xs`}>
                <p className="text-white font-black text-2xl text-center">{myAnswer}</p>
                <p className="text-white/80 text-sm text-center mt-1">
                  {currentQ.options.find(o => o.id === myAnswer)?.text}
                </p>
              </div>
              <p className="text-white/40 text-sm">Waiting for other teams…</p>
            </div>
          ) : (
            <div className={`grid gap-3 h-full ${isMultiQ ? 'grid-cols-2' : 'grid-cols-2'}`}>
              {currentQ.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswer(opt.id)}
                  className={`bg-gradient-to-br ${OPTION_COLORS[opt.id]} border rounded-2xl p-4
                              flex flex-col items-center justify-center gap-2
                              active:scale-95 transition-transform`}>
                  <span className="text-white font-black text-4xl">{opt.id}</span>
                  <span className="text-white font-bold text-sm text-center leading-tight">{opt.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── REVEAL ─────────────────────────────────────────────────────────────────
  if (g.status === 'reveal') {
    const correctAnswer = currentQ.correctAnswer
    const isCorrect     = myAnswer === correctAnswer
    const didAnswer     = !!myAnswer
    const correctText   = currentQ.options.find(o => o.id === correctAnswer)?.text

    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-5">

          {didAnswer ? (
            <>
              <div className="text-7xl">{isCorrect ? '🎉' : '😬'}</div>
              <div>
                <p className={`text-4xl font-black mb-1 ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? 'Correct!' : 'Not quite'}
                </p>
                <p className="text-white/50">
                  {isCorrect
                    ? `+${currentQ.points} points`
                    : `Correct answer was ${correctAnswer}`}
                </p>
              </div>
              <div className={`rounded-2xl px-6 py-4 border w-full max-w-sm
                ${isCorrect ? 'bg-emerald-500/15 border-emerald-500' : 'bg-white/5 border-white/10'}`}>
                <p className={`font-bold text-lg ${isCorrect ? 'text-emerald-300' : 'text-white'}`}>
                  {correctAnswer}: {correctText}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl">⏱️</div>
              <p className="text-white font-bold text-2xl">Time's up!</p>
              <p className="text-white/50">You didn't submit an answer</p>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 w-full max-w-sm">
                <p className="text-eu-gold font-bold">
                  Correct: {correctAnswer} — {correctText}
                </p>
              </div>
            </>
          )}

          {/* Explanation — shown for multi-question rounds on phone */}
          {isMultiQ && currentQ.explanation && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 w-full max-w-sm text-left mt-2">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-eu-gold/20 text-eu-gold text-xs font-black px-2 py-0.5 rounded-full uppercase">
                  {currentQ.law}
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{currentQ.explanation}</p>
            </div>
          )}

          {isMultiQ ? (
            <p className="text-white/30 text-sm">
              {qi < totalQ - 1 ? `Question ${qi + 2} of ${totalQ} coming up…` : 'Round almost done!'}
            </p>
          ) : (
            <p className="text-white/30 text-sm">Watch the screen for the explanation</p>
          )}
        </div>
      </div>
    )
  }

  // ── BONUS ──────────────────────────────────────────────────────────────────
  if (g.status === 'bonus') {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header />
        <div className="px-5 pt-5 pb-3">
          <div className="flex items-start gap-3">
            <TimerRing timerEnd={g.timerEnd} />
            <div>
              <span className="bg-eu-gold/20 text-eu-gold text-xs font-black uppercase px-2 py-0.5 rounded-full">
                ⭐ Bonus · {round.bonusPoints} pts
              </span>
              <p className="text-white font-bold mt-2 leading-snug">{round.bonus.question}</p>
            </div>
          </div>
        </div>
        <div className="flex-1 px-4 pb-6 mt-2">
          {bonusSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
              <div className="text-5xl">✅</div>
              <p className="text-white font-bold text-xl">Bonus submitted!</p>
              <div className={`bg-gradient-to-br ${OPTION_COLORS[myBonusAnswer]} border rounded-2xl px-8 py-4 ring-4 ${OPTION_RING[myBonusAnswer]}`}>
                <p className="text-white font-black text-2xl text-center">{myBonusAnswer}</p>
                <p className="text-white/80 text-sm text-center mt-1">
                  {round.bonus.options.find(o => o.id === myBonusAnswer)?.text}
                </p>
              </div>
              <p className="text-white/40 text-sm">Waiting for other teams…</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {round.bonus.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleBonus(opt.id)}
                  className={`bg-gradient-to-br ${OPTION_COLORS[opt.id]} border rounded-2xl p-4
                              flex items-center gap-4 w-full
                              active:scale-98 transition-transform`}>
                  <span className="text-white font-black text-3xl w-10">{opt.id}</span>
                  <span className="text-white font-bold text-base text-left leading-snug">{opt.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // ── BONUS REVEAL ───────────────────────────────────────────────────────────
  if (g.status === 'bonus_reveal') {
    const isCorrect = myBonusAnswer === round.bonus.correctAnswer
    const didAnswer = !!myBonusAnswer
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-6">
          <span className="bg-eu-gold/20 text-eu-gold text-xs font-black uppercase px-3 py-1 rounded-full">
            ⭐ Bonus Result
          </span>
          {didAnswer ? (
            <>
              <div className="text-7xl">{isCorrect ? '🌟' : '😅'}</div>
              <p className={`text-4xl font-black ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct!' : 'Not quite'}
              </p>
              <p className="text-white/50">
                {isCorrect ? `+${round.bonusPoints} bonus points` : `Correct was ${round.bonus.correctAnswer}`}
              </p>
            </>
          ) : (
            <>
              <div className="text-6xl">⏱️</div>
              <p className="text-white font-bold text-2xl">No bonus answer</p>
            </>
          )}
          <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 w-full max-w-sm">
            <p className="text-eu-gold font-bold text-sm mb-2">
              {round.bonus.correctAnswer}: {round.bonus.options.find(o => o.id === round.bonus.correctAnswer)?.text}
            </p>
            <p className="text-white/60 text-xs leading-relaxed">{round.bonus.explanation}</p>
          </div>
          <p className="text-white/30 text-sm">Watch the screen for leaderboard</p>
        </div>
      </div>
    )
  }

  // ── LEADERBOARD ────────────────────────────────────────────────────────────
  if (g.status === 'leaderboard') {
    const sorted = Object.entries(g.teams || {})
      .map(([id, t]) => ({ id, ...t }))
      .sort((a, b) => (b.score || 0) - (a.score || 0))
    const myRank  = sorted.findIndex(t => t.id === effectiveTeamId) + 1
    const myScore = myTeam?.score || 0

    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col p-5 gap-4">

          {/* My result */}
          <div className={`rounded-2xl p-5 border text-center
            ${myRank === 1 ? 'bg-eu-gold/15 border-eu-gold' : 'bg-white/5 border-white/10'}`}>
            <div className="text-5xl mb-2">
              {myRank === 1 ? '🥇' : myRank === 2 ? '🥈' : myRank === 3 ? '🥉' : `#${myRank}`}
            </div>
            <p className={`font-black text-2xl ${myRank === 1 ? 'text-eu-gold' : 'text-white'}`}>{teamName}</p>
            <p className="text-white/60 text-sm mt-1">{myScore} points total</p>
          </div>

          {/* Full board */}
          <div className="flex flex-col gap-2">
            {sorted.map((t, i) => (
              <div key={t.id}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl border
                  ${t.id === effectiveTeamId
                    ? 'bg-white/10 border-white/30'
                    : 'bg-white/5 border-white/10'}`}>
                <span className="text-white/40 w-6 text-sm text-center">
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                </span>
                <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: t.color }} />
                <span className={`flex-1 font-bold ${t.id === effectiveTeamId ? 'text-white' : 'text-white/70'}`}>
                  {t.name}
                </span>
                <span className={`font-black tabular-nums ${i === 0 ? 'text-eu-gold' : 'text-white'}`}>
                  {t.score || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // fallback
  return (
    <div className="min-h-screen bg-eu-dark flex items-center justify-center">
      <p className="text-white/40">Loading...</p>
    </div>
  )
}
