'use client'

import { useCallback, useMemo, useRef } from 'react'
import { cn } from '@/lib/utils'

interface EditorPaneProps {
  label: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

export function EditorPane({ label, children, actions, className }: EditorPaneProps) {
  return (
    <div
      className={cn(
        'flex flex-col border-r border-border last:border-r-0',
        className
      )}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {actions}
      </div>
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  )
}

const LINE_HEIGHT = 1.5

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  className?: string
}

export function CodeEditor({
  value,
  onChange,
  placeholder,
  readOnly = false,
  className,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const lines = useMemo(
    () => (value || '').split('\n'),
    [value]
  )
  const lineCount = Math.max(lines.length, 1)
  const contentHeight = lineCount * LINE_HEIGHT

  const handleScroll = useCallback(() => {
    const textarea = textareaRef.current
    const lineNumbers = lineNumbersRef.current
    if (textarea && lineNumbers) {
      lineNumbers.scrollTop = textarea.scrollTop
    }
  }, [])

  const handleLineNumbersWheel = useCallback(
    (e: React.WheelEvent) => {
      textareaRef.current?.scrollBy({ top: e.deltaY })
    },
    []
  )

  return (
    <div className={cn('flex flex-1 min-w-0 font-mono text-sm overflow-hidden', className)}>
      <div
        ref={lineNumbersRef}
        onWheel={handleLineNumbersWheel}
        className="shrink-0 w-12 overflow-y-auto py-3 pr-3 pl-3 text-right text-muted-foreground/70 border-r border-border bg-muted/20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-hidden
      >
        <div style={{ minHeight: `${contentHeight}em` }}>
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i} className="leading-normal h-[1.5em]">
              {i + 1}
            </div>
          ))}
        </div>
      </div>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onScroll={handleScroll}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck={false}
        className={cn(
          'flex-1 min-w-0 resize-none bg-transparent py-3 px-4 text-foreground overflow-auto',
          'placeholder:text-muted-foreground/50',
          'focus:outline-none focus:ring-0 border-0',
          'leading-normal block',
          readOnly && 'cursor-default'
        )}
        style={{ tabSize: 4 }}
      />
    </div>
  )
}
