'use client'

import { useCallback, useMemo, useState } from 'react'
import { Copy, Settings, Trash2, Undo2, Redo2 } from 'lucide-react'
import { Editor } from './editor'
import { EditorPane, CodeEditor } from './editor-pane'
import { Button } from './ui/button'
import { AnimatedThemeToggler } from './ui/animated-theme-toggler'
import { htmlToMarkdown } from '@/lib/html-to-markdown'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

export default function HtmlToMarkdownConverter() {
  const [html, setHtml] = useState('')
  const markdown = useMemo(() => htmlToMarkdown(html), [html])

  const copyMarkdown = useCallback(async () => {
    if (!markdown) {
      toast.info('Nothing to copy')
      return
    }
    try {
      await navigator.clipboard.writeText(markdown)
      toast.success('Markdown copied to clipboard')
    } catch {
      toast.error('Failed to copy')
    }
  }, [markdown])

  const clearHtml = useCallback(() => {
    setHtml('')
    toast.info('Cleared')
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="shrink-0 flex h-12 items-center justify-between px-4 border-b border-border bg-muted/20">
        <h1 className="font-medium text-sm tracking-tight text-foreground">
          Rich Text → Markdown
        </h1>
        <AnimatedThemeToggler
          className={cn(
            "rounded-md p-2 hover:bg-accent transition-colors",
            "text-muted-foreground hover:text-foreground"
          )}
          aria-label="Toggle theme"
        />
      </header>

      <main className="flex-1 flex min-h-0">
        <div className="flex-1 flex min-w-0">
          <EditorPane
            label="Rich Text"
            className="flex-1 min-w-0"
            actions={
              <div className="flex items-center gap-0.5">
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Settings"
                >
                  <Settings className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Undo"
                >
                  <Undo2 className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Redo"
                >
                  <Redo2 className="size-3.5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Clear"
                  onClick={clearHtml}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            }
          >
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden [&_.ql-toolbar]:shrink-0 [&_.ql-container]:flex-1 [&_.ql-container]:min-h-0 [&_.ql-editor]:min-h-[200px]">
              <Editor
                value={html}
                onChange={setHtml}
                placeholder="Type rich text here..."
                className="flex flex-col flex-1 min-h-0 [&_.ql-editor]:flex-1"
              />
            </div>
          </EditorPane>

          <EditorPane
            label="Markdown"
            className="flex-1 min-w-0"
            actions={
              <Button
                variant="ghost"
                size="xs"
                onClick={copyMarkdown}
                disabled={!markdown}
                className="gap-1.5 text-muted-foreground hover:text-foreground"
              >
                <Copy className="size-3.5" />
                Copy
              </Button>
            }
          >
            <CodeEditor
              value={markdown}
              placeholder="Markdown output will appear here..."
              readOnly
            />
          </EditorPane>
        </div>
      </main>
    </div>
  )
}
