import { NextRequest, NextResponse } from 'next/server'
import { Octokit } from 'octokit'

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { sha, message } = await req.json()
  if (!sha) return NextResponse.json({ error: 'Missing sha' }, { status: 400 })

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
  const owner = process.env.GITHUB_OWNER!
  const repo = process.env.GITHUB_REPO!
  const branch = process.env.GITHUB_BRANCH || 'main'

  // Get the current HEAD commit
  const { data: ref } = await octokit.rest.git.getRef({ owner, repo, ref: `heads/${branch}` })
  const currentSha = ref.object.sha

  // Get the target commit's tree
  const { data: targetCommit } = await octokit.rest.git.getCommit({ owner, repo, commit_sha: sha })

  // Create a new commit on top of current HEAD that uses the target tree
  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner,
    repo,
    message: message || `Revert to ${sha.substring(0, 7)} via admin dashboard`,
    tree: targetCommit.tree.sha,
    parents: [currentSha],
  })

  // Update the branch to point to the new commit
  await octokit.rest.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha,
  })

  return NextResponse.json({ ok: true, newSha: newCommit.sha })
}
