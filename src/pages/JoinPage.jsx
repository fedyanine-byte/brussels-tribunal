import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGame } from '../GameContext'

export default function JoinPage() {
  const navigate = useNavigate()
  const { joinGame } = useGame()
  const [code, setCode] = useState('')
  const [teamName, setTeamName] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleJoin = async (e) => {
    e.preventDefault()
    setError('')
    const trimCode = code.trim().toUpperCase()
    const trimName = teamName.trim()
    if (!trimCode || trimCode.length !== 6) { setError('Enter the 6-character game code shown on screen.'); return }
    if (!trimName) { setError('Your team needs a name.'); return }
    if (trimName.length > 24) { setError('Team name must be 24 characters or less.'); return }

    setLoading(true)
    try {
      const { teamId } = await joinGame(trimCode, trimName)
      navigate(`/team/${trimCode}/${teamId}`)
    } catch (err) {
      setError(err.message || 'Could not join. Check the code.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-eu-dark flex flex-col items-center justify-center p-6">
      <div className="text-center mb-10">
        <div className="text-5xl mb-3">🏛️</div>
        <h1 className="text-3xl font-black text-white">BRUSSELS TRIBUNAL</h1>
        <p className="text-white/50 mt-1">Enter the game code to join your team</p>
      </div>

      <form onSubmit={handleJoin} className="w-full max-w-sm flex flex-col gap-4">
        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
            Game Code
          </label>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
            maxLength={6}
            placeholder="ABC123"
            className="w-full bg-white/10 border-2 border-white/20 text-white text-3xl
                       font-black tracking-widest text-center rounded-xl px-4 py-4
                       focus:outline-none focus:border-eu-gold placeholder-white/20
                       uppercase caret-eu-gold"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">
            Your Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={e => setTeamName(e.target.value)}
            maxLength={24}
            placeholder="e.g. Legal Eagles"
            className="w-full bg-white/10 border-2 border-white/20 text-white text-xl
                       font-semibold rounded-xl px-4 py-4
                       focus:outline-none focus:border-eu-gold placeholder-white/20"
            autoComplete="off"
          />
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 rounded-xl px-4 py-3 text-sm">
            ⚠️ {error}
          </div>
        )}

        <button type="submit" disabled={loading} className="btn-primary text-lg py-4 mt-2">
          {loading ? '⏳ Joining...' : '→ Join Game'}
        </button>
      </form>

      <button onClick={() => navigate('/')} className="mt-8 text-white/30 text-sm hover:text-white/60 transition-colors">
        ← Back
      </button>
    </div>
  )
}
