import { useState, useEffect } from 'react'

export const useTimer = (timerEnd) => {
  const [secondsLeft, setSecondsLeft] = useState(null)

  useEffect(() => {
    if (!timerEnd) {
      setSecondsLeft(null)
      return
    }

    const tick = () => {
      const remaining = Math.max(0, Math.ceil((timerEnd - Date.now()) / 1000))
      setSecondsLeft(remaining)
    }

    tick()
    const interval = setInterval(tick, 200) // update 5x/second for smoothness
    return () => clearInterval(interval)
  }, [timerEnd])

  const isExpired = secondsLeft === 0
  const isUrgent = secondsLeft !== null && secondsLeft <= 10
  const isWarning = secondsLeft !== null && secondsLeft <= 20 && secondsLeft > 10
  const pct = timerEnd ? Math.max(0, Math.min(100, ((timerEnd - Date.now()) / 1000) * (100 / 60))) : 100

  return { secondsLeft, isExpired, isUrgent, isWarning, pct }
}
