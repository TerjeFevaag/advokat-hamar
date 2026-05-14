import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import fs from 'fs'
import path from 'path'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Read all content files to give Claude full context
function readAllContent() {
  const contentDir = path.join(process.cwd(), 'content')
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith('.json'))
  const content: Record<string, unknown> = {}
  for (const file of files) {
    const key = file.replace('.json', '')
    content[key] = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf-8'))
  }
  return content
}

function readGlobalsCss() {
  const cssPath = path.join(process.cwd(), 'app', 'globals.css')
  return fs.readFileSync(cssPath, 'utf-8')
}

const SYSTEM_PROMPT = `You are the website editor for Advokatfirma Holthe & Co AS — a prestigious law firm in Hamar, Norway.
You help the firm owner make changes to their live website by editing content and style files.

The website is built in Next.js. You can edit two types of files:
1. JSON files in /content/ — all text content
2. app/globals.css — global CSS styles (font-weight, spacing, animations, etc.)

When the owner asks you to change something, you:
1. Identify which file(s) need to change
2. Show them exactly what will change
3. Return a structured response with the file name and new content

IMPORTANT RULES:
- Always preserve the JSON structure — only change the values, never the keys
- When editing globals.css, always return the FULL file content, not just the changed part
- Write all content in Norwegian (Bokmål) unless asked otherwise
- Keep the firm's professional, trustworthy tone
- The firm's key facts: 25+ years experience, Hamar, skatterett & selskapsrett specialist, Advokatforeningen member

DESIGN / STYLING:
- Colors, shadows, and fonts are controlled via content/theme.json
- Color values must be valid CSS hex codes (e.g. "#1F3451") or rgba strings
- Font weight, spacing, animations and other CSS rules go in app/globals.css
- If the owner asks to change a color, font family, or shadow — edit content/theme.json
- If the owner asks to change font-weight, font-size, spacing, or any other CSS property — edit app/globals.css

RESPONSE FORMAT:
For JSON file changes:
\`\`\`json:content/filename.json
{ ... full JSON content ... }
\`\`\`

For CSS file changes:
\`\`\`css:app/globals.css
/* ... full CSS content ... */
\`\`\`

If no file change is needed (just answering a question), respond normally.`

export async function POST(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get('x-admin-password')
  if (authHeader !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'ANTHROPIC_API_KEY is not set on the server.' }, { status: 500 })
  }

  try {
    const { messages } = await req.json()

    // Inject current content into the first user message
    const allContent = readAllContent()
    const globalsCss = readGlobalsCss()
    const contentContext =
      `\n\nCURRENT WEBSITE CONTENT FILES:\n${JSON.stringify(allContent, null, 2)}` +
      `\n\nCURRENT app/globals.css:\n${globalsCss}`

    const messagesWithContext = messages.map((m: { role: string; content: string }, i: number) =>
      i === 0 && m.role === 'user'
        ? { ...m, content: m.content + contentContext }
        : m
    )

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: messagesWithContext,
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    // Parse JSON file changes
    const fileChanges: Array<{ file: string; content: unknown }> = []
    const jsonRegex = /```json:(content\/[\w-]+\.json)\n([\s\S]*?)```/g
    let match
    while ((match = jsonRegex.exec(text)) !== null) {
      try {
        fileChanges.push({ file: match[1], content: JSON.parse(match[2]) })
      } catch {
        // ignore parse errors
      }
    }

    // Parse CSS file changes
    const cssRegex = /```css:(app\/globals\.css)\n([\s\S]*?)```/g
    while ((match = cssRegex.exec(text)) !== null) {
      fileChanges.push({ file: match[1], content: match[2] })
    }

    return NextResponse.json({ text, fileChanges })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
