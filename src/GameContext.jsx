// Central Firebase RTDB connection + game state for all pages
// No game codes — always uses the single fixed key 'active'
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { db } from './firebase'
import { ref, set, update, onValue, get, push } from 'firebase/database'

const GameCtx = createContext(null)

const FIXED_CODE = 'active'   // single game slot — no join codes needed

const TEAM_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#6366f1', '#ec4899', '#14b8a6',
]

export function GameProvider({ children }) {
  const [gameState, setGameState] = useState(null)
  const [myTeamId,  setMyTeamId]  = useState(null)
  const unsubRef = useRef(null)

  // ── Subscribe ─────────────────────────────────────────────────────────────
  const subscribe = useCallback(() => {
    if (unsubRef.current) unsubRef.current()
    const gameRef = ref(db, `games/${FIXED_CODE}`)
    unsubRef.current = onValue(gameRef, (snap) => {
      if (snap.exists()) setGameState(snap.val())
    })
  }, [])

  useEffect(() => () => { if (unsubRef.current) unsubRef.current() }, [])

  // ── Actions ───────────────────────────────────────────────────────────────

  const createGame = async (roundId) => {
    await set(ref(db, `games/${FIXED_CODE}`), {
      status:        'lobby',
      roundId,
      questionIndex: 0,
      createdAt:     Date.now(),
    })
    subscribe()
  }

  const joinGame = async (teamName) => {
    const snap = await get(ref(db, `games/${FIXED_CODE}`))
    if (!snap.exists()) throw new Error('Игра не найдена. Попробуй позже.')
    const game = snap.val()
    if (game.status !== 'lobby') throw new Error('Игра уже началась.')

    const usedColors = Object.values(game.teams || {}).map(t => t.color)
    const color = TEAM_COLORS.find(c => !usedColors.includes(c))
              || TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)]

    const teamRef = push(ref(db, `games/${FIXED_CODE}/teams`))
    const teamId  = teamRef.key
    await set(teamRef, { name: teamName, color, score: 0 })

    setMyTeamId(teamId)
    subscribe()
    return { teamId, color }
  }

  // secs: timer duration in seconds (caller decides based on round type)
  const startRound = (secs = 120) =>
    update(ref(db, `games/${FIXED_CODE}`), {
      status:        'question',
      questionIndex: 0,   // always reset to first question
      timerEnd:      Date.now() + secs * 1000,
      answers:       null,
    })

  const revealAnswers = () =>
    update(ref(db, `games/${FIXED_CODE}`), { status: 'reveal' })

  // Multi-question: score current question qi, advance to qi+1
  const nextQuestion = async (round, qi) => {
    const snap = await get(ref(db, `games/${FIXED_CODE}`))
    const game  = snap.val()
    const q     = round.questions[qi]
    const teams = { ...(game.teams || {}) }

    // Write scores for this question
    Object.entries(game.answers || {}).forEach(([tid, a]) => {
      if (a.answer === q.correctAnswer)
        teams[tid] = { ...teams[tid], score: (teams[tid]?.score || 0) + q.points }
    })

    await update(ref(db, `games/${FIXED_CODE}`), {
      status:        'question',
      questionIndex: qi + 1,
      timerEnd:      Date.now() + (round.questionTimerSeconds || 60) * 1000,
      answers:       null,
      teams,
    })
  }

  const startBonus = (secs = 45) =>
    update(ref(db, `games/${FIXED_CODE}`), {
      status:       'bonus',
      timerEnd:     Date.now() + secs * 1000,
      bonusAnswers: null,
    })

  const revealBonus = () =>
    update(ref(db, `games/${FIXED_CODE}`), { status: 'bonus_reveal' })

  // showLeaderboard: scores the final question/bonus, then goes to leaderboard
  const showLeaderboard = async (round) => {
    const snap = await get(ref(db, `games/${FIXED_CODE}`))
    const game  = snap.val()
    const teams = { ...(game.teams || {}) }

    if (round.isMultiQuestion) {
      // Score the last question (current questionIndex)
      const qi = game.questionIndex ?? 0
      const q  = round.questions[qi]
      if (q) {
        Object.entries(game.answers || {}).forEach(([tid, a]) => {
          if (a.answer === q.correctAnswer)
            teams[tid] = { ...teams[tid], score: (teams[tid]?.score || 0) + q.points }
        })
      }
    } else {
      // Single-question scoring: main question + bonus
      Object.entries(game.answers || {}).forEach(([tid, a]) => {
        if (a.answer === round.correctAnswer)
          teams[tid] = { ...teams[tid], score: (teams[tid]?.score || 0) + round.points }
      })
      Object.entries(game.bonusAnswers || {}).forEach(([tid, a]) => {
        if (round.bonus && a.answer === round.bonus.correctAnswer)
          teams[tid] = { ...teams[tid], score: (teams[tid]?.score || 0) + round.bonusPoints }
      })
    }

    await update(ref(db, `games/${FIXED_CODE}`), { status: 'leaderboard', teams })
  }

  const restartRound = () =>
    update(ref(db, `games/${FIXED_CODE}`), {
      status:        'lobby',
      answers:       null,
      bonusAnswers:  null,
      timerEnd:      null,
      questionIndex: 0,
    })

  // Advance to a different round without wiping team scores
  const setRound = (roundId) =>
    update(ref(db, `games/${FIXED_CODE}`), {
      roundId,
      status:        'lobby',
      questionIndex: 0,
      answers:       null,
      bonusAnswers:  null,
      timerEnd:      null,
    })

  const submitAnswer = (teamId, answer, isBonus = false) => {
    const path = isBonus
      ? `games/${FIXED_CODE}/bonusAnswers/${teamId}`
      : `games/${FIXED_CODE}/answers/${teamId}`
    return set(ref(db, path), { answer, submittedAt: Date.now() })
  }

  return (
    <GameCtx.Provider value={{
      gameState, myTeamId,
      createGame, joinGame, subscribe,
      startRound, revealAnswers, startBonus, revealBonus,
      showLeaderboard, restartRound, submitAnswer,
      nextQuestion, setRound,
    }}>
      {children}
    </GameCtx.Provider>
  )
}

export const useGame = () => useContext(GameCtx)
