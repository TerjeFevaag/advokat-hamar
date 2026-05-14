import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projectId = process.env.VERCEL_PROJECT_ID
  const token = process.env.VERCEL_TOKEN
  const teamId = process.env.VERCEL_TEAM_ID

  const url = teamId
    ? `https://api.vercel.com/v6/deployments?projectId=${projectId}&teamId=${teamId}&limit=5`
    : `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=5`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  const data = await res.json()

  const deployments = (data.deployments || []).map((d: {
    uid: string
    url: string
    state: string
    created: number
    meta?: { githubCommitMessage?: string; githubCommitSha?: string }
  }) => ({
    id: d.uid,
    url: `https://${d.url}`,
    state: d.state,
    created: d.created,
    commitMessage: d.meta?.githubCommitMessage || '',
    commitSha: d.meta?.githubCommitSha?.substring(0, 7) || '',
  }))

  return NextResponse.json({ deployments })
}

export async function POST(req: NextRequest) {
  // Trigger a manual redeploy
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const projectId = process.env.VERCEL_PROJECT_ID
  const token = process.env.VERCEL_TOKEN
  const teamId = process.env.VERCEL_TEAM_ID

  const url = teamId
    ? `https://api.vercel.com/v13/deployments?teamId=${teamId}&forceNew=1`
    : `https://api.vercel.com/v13/deployments?forceNew=1`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: projectId }),
  })

  const data = await res.json()
  return NextResponse.json({ ok: true, deployment: data })
}
