import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from 'octokit'

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

  const { data } = await octokit.rest.repos.listCommits({
    owner: process.env.GITHUB_OWNER!,
    repo: process.env.GITHUB_REPO!,
    sha: process.env.GITHUB_BRANCH || 'main',
    per_page: 20,
  })

  const commits = data.map((c) => ({
    sha: c.sha,
    shortSha: c.sha.substring(0, 7),
    message: c.commit.message,
    author: c.commit.author?.name || 'Unknown',
    date: c.commit.author?.date || '',
    url: c.html_url,
  }))

  return NextResponse.json({ commits })
}
