'use client'
import { useState, useRef, useEffect } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Message = { role: 'user' | 'assistant'; content: string }
type FileChange = { file: string; content: unknown }
type Commit = { sha: string; shortSha: string; message: string; author: string; date: string; url: string }
type Deployment = { id: string; url: string; state: string; created: number; commitMessage: string; commitSha: string }

// ─── Auth Gate ────────────────────────────────────────────────────────────────
function AuthGate({ onAuth }: { onAuth: (pw: string) => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pw.trim()) {
      onAuth(pw)
    } else {
      setError(true)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1923] flex items-center justify-center px-4">
      <div className="bg-[#1a2535] rounded-2xl p-10 w-full max-w-sm border border-white/10 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#D99726] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
          </div>
          <h1 className="text-white text-xl font-bold">Admin Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Advokatfirmaet Holthe & Co AS</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={pw}
            onChange={(e) => { setPw(e.target.value); setError(false) }}
            placeholder="Passord"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#D99726] transition-colors"
          />
          {error && <p className="text-red-400 text-xs">Feil passord.</p>}
          <button type="submit" className="w-full bg-[#D99726] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#B87E1E] transition-colors">
            Logg inn
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Chat Tab ─────────────────────────────────────────────────────────────────
function ChatTab({ password }: { password: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingChanges, setPendingChanges] = useState<FileChange[]>([])
  const [publishing, setPublishing] = useState(false)
  const [publishStatus, setPublishStatus] = useState<'idle' | 'ok' | 'error'>('idle')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setPendingChanges([])
    setPublishStatus('idle')

    try {
      const res = await fetch('/api/admin/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
        body: JSON.stringify({ messages: newMessages }),
      })

      let data: { text?: string; fileChanges?: FileChange[]; error?: string } = {}
      try {
        data = await res.json()
      } catch {
        data = { error: `Serveren returnerte et tomt svar (HTTP ${res.status}). Sjekk at ANTHROPIC_API_KEY er satt i Vercel.` }
      }

      if (!res.ok || data.error) {
        const errorMsg = res.status === 401
          ? 'Feil passord eller manglende tilgang (401).'
          : data.error ?? `Feil fra serveren (${res.status})`
        setMessages([...newMessages, { role: 'assistant', content: `⚠️ ${errorMsg}` }])
      } else {
        setMessages([...newMessages, { role: 'assistant', content: data.text ?? '' }])
        if (data.fileChanges && data.fileChanges.length > 0) setPendingChanges(data.fileChanges)
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Nettverksfeil'
      setMessages([...newMessages, { role: 'assistant', content: `⚠️ Kunne ikke nå serveren: ${msg}` }])
    } finally {
      setLoading(false)
    }
  }

  async function publishChanges() {
    setPublishing(true)
    const res = await fetch('/api/admin/commit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({
        changes: pendingChanges,
        message: `Website update via admin dashboard`,
      }),
    })
    setPublishing(false)
    setPublishStatus(res.ok ? 'ok' : 'error')
    if (res.ok) setPendingChanges([])
  }

  const suggestions = [
    'Endre hero-overskriften til noe mer engasjerende',
    'Legg til en ny tjeneste i selskapsrett-seksjonen',
    'Oppdater kontaktinformasjonen',
    'Forbedre SEO-beskrivelsen for forsiden',
  ]

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-[#D99726]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 fill-[#D99726]" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <h2 className="text-white text-lg font-semibold mb-2">Claude er klar</h2>
            <p className="text-white/40 text-sm mb-8">Fortell meg hva du vil endre på nettsiden</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              {suggestions.map((s) => (
                <button key={s} onClick={() => setInput(s)} className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white/60 text-xs text-left hover:text-white/80 transition-all">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl rounded-2xl px-5 py-4 text-sm leading-relaxed ${
              m.role === 'user'
                ? 'bg-[#D99726] text-white'
                : 'bg-white/5 border border-white/10 text-white/80'
            }`}>
              <pre className="whitespace-pre-wrap font-sans">{m.content}</pre>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-[#D99726] animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
              <span className="text-white/40 text-xs">Claude jobber...</span>
            </div>
          </div>
        )}

        {/* Pending changes banner */}
        {pendingChanges.length > 0 && (
          <div className="bg-[#D99726]/10 border border-[#D99726]/30 rounded-2xl p-5">
            <p className="text-[#D99726] font-semibold text-sm mb-2">
              {pendingChanges.length} fil{pendingChanges.length > 1 ? 'er' : ''} klar til publisering:
            </p>
            {pendingChanges.map((c) => (
              <p key={c.file} className="text-white/60 text-xs mb-1">• {c.file}</p>
            ))}
            <div className="flex gap-3 mt-4">
              <button
                onClick={publishChanges}
                disabled={publishing}
                className="bg-[#D99726] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#B87E1E] transition-colors disabled:opacity-60"
              >
                {publishing ? 'Publiserer...' : '🚀 Publiser endringer'}
              </button>
              <button onClick={() => setPendingChanges([])} className="bg-white/5 text-white/60 px-5 py-2 rounded-lg text-sm hover:bg-white/10 transition-colors">
                Avbryt
              </button>
            </div>
            {publishStatus === 'ok' && <p className="text-green-400 text-xs mt-3">✅ Publisert! Vercel deployer automatisk.</p>}
            {publishStatus === 'error' && <p className="text-red-400 text-xs mt-3">❌ Noe gikk galt. Sjekk GitHub-tilkoblingen.</p>}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-6 pb-6">
        <form onSubmit={sendMessage} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Fortell Claude hva du vil endre..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#D99726] transition-colors"
          />
          <button type="submit" disabled={loading || !input.trim()} className="bg-[#D99726] text-white px-5 py-3 rounded-xl font-semibold text-sm hover:bg-[#B87E1E] transition-colors disabled:opacity-50">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Version History Tab ──────────────────────────────────────────────────────
function HistoryTab({ password }: { password: string }) {
  const [commits, setCommits] = useState<Commit[]>([])
  const [loading, setLoading] = useState(true)
  const [rolling, setRolling] = useState<string | null>(null)
  const [status, setStatus] = useState<string>('')

  useEffect(() => {
    fetch('/api/admin/commits', { headers: { 'x-admin-password': password } })
      .then((r) => r.json())
      .then((d) => { setCommits(d.commits || []); setLoading(false) })
  }, [password])

  async function rollback(sha: string, message: string) {
    if (!confirm(`Vil du rulle tilbake til: "${message}"?`)) return
    setRolling(sha)
    setStatus('')
    const res = await fetch('/api/admin/rollback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
      body: JSON.stringify({ sha }),
    })
    setRolling(null)
    setStatus(res.ok ? '✅ Rullet tilbake! Vercel deployer automatisk.' : '❌ Feil ved tilbakerulling.')
  }

  return (
    <div className="px-6 py-6">
      <h2 className="text-white text-lg font-semibold mb-1">Versjonshistorikk</h2>
      <p className="text-white/40 text-sm mb-6">Klikk «Gjenopprett» for å rulle tilbake til et tidligere tidspunkt.</p>
      {status && <p className={`mb-4 text-sm font-medium ${status.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{status}</p>}

      {loading ? (
        <div className="text-white/40 text-sm">Laster...</div>
      ) : (
        <div className="space-y-3">
          {commits.map((c, i) => (
            <div key={c.sha} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {i === 0 && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Live</span>}
                  <span className="font-mono text-[#D99726] text-xs">{c.shortSha}</span>
                </div>
                <p className="text-white/80 text-sm truncate">{c.message}</p>
                <p className="text-white/30 text-xs mt-0.5">
                  {c.author} · {new Date(c.date).toLocaleString('nb-NO')}
                </p>
              </div>
              {i > 0 && (
                <button
                  onClick={() => rollback(c.sha, c.message)}
                  disabled={rolling === c.sha}
                  className="flex-shrink-0 bg-white/5 hover:bg-[#D99726]/20 border border-white/10 hover:border-[#D99726]/40 text-white/60 hover:text-[#D99726] text-xs px-4 py-2 rounded-lg transition-all disabled:opacity-50"
                >
                  {rolling === c.sha ? '...' : 'Gjenopprett'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Deploy Tab ───────────────────────────────────────────────────────────────
function DeployTab({ password }: { password: string }) {
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/deploy', { headers: { 'x-admin-password': password } })
      .then((r) => r.json())
      .then((d) => { setDeployments(d.deployments || []); setLoading(false) })
  }, [password])

  const stateColor: Record<string, string> = {
    READY: 'text-green-400',
    BUILDING: 'text-yellow-400',
    ERROR: 'text-red-400',
    CANCELED: 'text-gray-400',
  }

  return (
    <div className="px-6 py-6">
      <h2 className="text-white text-lg font-semibold mb-1">Deployment Status</h2>
      <p className="text-white/40 text-sm mb-6">Siste Vercel-deployments. Oppdateres automatisk ved push til GitHub.</p>

      {loading ? (
        <div className="text-white/40 text-sm">Laster...</div>
      ) : (
        <div className="space-y-3">
          {deployments.map((d, i) => (
            <a key={d.id} href={d.url} target="_blank" rel="noopener noreferrer"
              className="block bg-white/5 border border-white/10 hover:border-white/20 rounded-xl p-4 transition-all">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  {i === 0 && <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">Siste</span>}
                  <span className={`text-sm font-semibold ${stateColor[d.state] || 'text-white/60'}`}>{d.state}</span>
                </div>
                <span className="text-white/30 text-xs">{new Date(d.created).toLocaleString('nb-NO')}</span>
              </div>
              <p className="text-white/60 text-xs truncate">{d.commitMessage || 'No commit message'}</p>
              <p className="text-white/30 text-xs mt-0.5">{d.url}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Main Admin Dashboard ─────────────────────────────────────────────────────
export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null)
  const [tab, setTab] = useState<'chat' | 'history' | 'deploy'>('chat')

  if (!password) return <AuthGate onAuth={setPassword} />

  const tabs: { id: typeof tab; label: string; icon: string }[] = [
    { id: 'chat', label: 'Rediger innhold', icon: '✏️' },
    { id: 'history', label: 'Versjonshistorikk', icon: '🕐' },
    { id: 'deploy', label: 'Deployment', icon: '🚀' },
  ]

  return (
    <div className="min-h-screen bg-[#0f1923] flex flex-col">
      {/* Header */}
      <header className="bg-[#1a2535] border-b border-white/8 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#D99726] rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">H</span>
          </div>
          <div>
            <h1 className="text-white text-sm font-semibold">Admin Dashboard</h1>
            <p className="text-white/30 text-xs">Holthe & Co AS</p>
          </div>
        </div>
        <a href="/" target="_blank" className="text-white/40 text-xs hover:text-white/70 transition-colors flex items-center gap-1">
          Vis nettside ↗
        </a>
      </header>

      {/* Tabs */}
      <div className="bg-[#1a2535] border-b border-white/8 px-6 flex gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-3 text-xs font-medium border-b-2 transition-all ${
              tab === t.id
                ? 'text-[#D99726] border-[#D99726]'
                : 'text-white/40 border-transparent hover:text-white/60'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {tab === 'chat' && <ChatTab password={password} />}
        {tab === 'history' && <div className="flex-1 overflow-y-auto"><HistoryTab password={password} /></div>}
        {tab === 'deploy' && <div className="flex-1 overflow-y-auto"><DeployTab password={password} /></div>}
      </div>
    </div>
  )
}
