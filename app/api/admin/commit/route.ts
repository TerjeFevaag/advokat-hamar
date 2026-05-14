import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from 'octokit'

// Commit one or more content file changes to GitHub
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { changes, message } = await req.json()
  // changes: Array<{ file: string; content: object }>
  // e.g. [{ file: 'content/home.json', content: { ... } }]

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!
  const branch = process.env.GITHUB_BRANCH || 'main'

  for (const change of changes) {
    // Get current file SHA (needed for update)
    let fileSha: string | undefined
    try {
      const { data } = await octokit.rest.repos.getContent({ owner, repo, path: change.file })
      if (!Array.isArray(data) && data.type === 'file') {
        fileSha = data.sha
      }
    } catch {
      // File may not exist yet
    }

    const raw = typeof change.content === 'string'
      ? change.content
      : JSON.stringify(change.content, null, 2)
    const contentBase64 = Buffer.from(raw).toString('base64')

    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: change.file,
      message: message || `Update ${change.file} via admin dashboard`,
      content: contentBase64,
      sha: fileSha,
      branch,
    })
  }

  return NextResponse.json({ ok: true })
}
