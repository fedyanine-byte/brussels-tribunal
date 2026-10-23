// Central Firebase RTDB connection + game state for all pages
import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { db } from './firebase'
import { ref, set, update, onValue, get, push } from 'firebase/database'

const GameCtx = createContext(null)

const TEAM_COLORS = [
  '#ef4444', '#f97316', '#eab308', '#22c55e',
  '#06b6d4', '#6366f1', '#ec4899', '#14b8a6',
]

const generateCode = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)]
  return code
}

export function GameProvider({ children }) {
  const [gameCode,  setGameCode]  = useState(null)
  const [gameState, setGameState] = useState(null)
  const [myTeamId,  setMyTeamId]  = useState(null)
  const unsubRef = useRef(null)

  // ── Subscribe to a game ───────────────────────────────────────────────────
  const subscribe = useCallback((code) => {
    if (unsubRef.current) unsubRef.current()
    setGameCode(code)
    const gameRef = ref(db, `games/${code}`)
    unsubRef.current = onValue(gameRef, (snap) => {
      if (snap.exists()) setGameState(snap.val())
    })
  }, [])

  useEffect(() => () => { if (unsubRef.current) unsubRef.current() }, [])

  // ── Actions ───────────────────────────────────────────────────────────────

  const createGame = async (roundId) => {
    const code = generateCode()
    await set(ref(db, `games/${code}`), {
      status:       'lobby',
      roundId,
      teams:        {},
      answers:      {},
      bonusAnswers: {},
      timerEnd:     null,
      createdAt:    Date.now(),
    })
    subscribe(code)
    return code
  }

  const joinGame = async (code, teamName) => {
    const snap = await get(ref(db, `games/${code}`))
    if (!snap.exists()) throw new Error('Игра не найдена. Проверь код.')
    const game = snap.val()
    if (game.status !== 'lobby') throw new Error('Игра уже началась.')

    const usedColors = Object.values(game.teams || {}).map(t => t.color)
    const color = TEAM_COLORS.find(c => !usedColors.includes(c)) || TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)]

    const teamRef = push(ref(db, `games/${code}/teams`))
    const teamId  = teamRef.key
    await set(teamRef, { name: teamName, color, score: 0 })

    setMyTeamId(teamId)
    subscribe(code)
    return { teamId, color }
  }

  const startRound = (code, secs = 60) =>
    update(ref(db, `games/${code}`), {
      status:   'question',
      timerEnd: Date.now() + secs * 1000,
      answers:  {},
    })

  const revealAnswers = (code) =>
    update(ref(db, `games/${code}`), { status: 'reveal' })

  const startBonus = (code, secs = 45) =>
    update(ref(db, `games/${code}`), {
      status:       'bonus',
      timerEnd:     Date.now() + secs * 1000,
      bonusAnswers: {},
    })

  const revealBonus = (code) =>
    update(ref(db, `games/${code}`), { status: 'bonus_reveal' })

  const showLeaderboard = async (code, round) => {
    const snap = await get(ref(db, `games/${code}`))
    const game  = snap.val()
    const teams = { ...(game.teams || {}) }

    // Score main question
    Object.entries(game.answers || {}).forEach(([tid, a]) => {
      if (a.answer === round.correctAnswer)
        teams[tid] = { ...teams[tid], score: (teams[tid]?.score || 0) + round.points }
    })
    // Score bonus
    Object.entries(game.bonusAnswers || {}).forEach(([tid, a]) => {
      if (round.bonus && a.answer === round.bonus.correctAnswer)
        teams[tid] = { ...teams[tid], score: (teams[tid]?.score || 0) + round.bonusPoints }
    })

    await update(ref(db, `games/${code}`), { status: 'leaderboard', teams })
  }

  const restartRound = (code) =>
    update(ref(db, `games/${code}`), {
      status:       'lobby',
      answers:      {},
      bonusAnswers: {},
      timerEnd:     null,
    })

  const submitAnswer = (code, teamId, answer, isBonus = false) => {
    const path = isBonus
      ? `games/${code}/bonusAnswers/${teamId}`
      : `games/${code}/answers/${teamId}`
    return set(ref(db, path), { answer, submittedAt: Date.now() })
  }

  return (
    <GameCtx.Provider value={{
      gameCode, gameState, myTeamId,
      createGame, joinGame, subscribe,
      startRound, revealAnswers, startBonus, revealBonus,
      showLeaderboard, restartRound, submitAnswer,
    }}>
      {children}
    </GameCtx.Provider>
  )
}

export const useGame = () => useContext(GameCtx)
