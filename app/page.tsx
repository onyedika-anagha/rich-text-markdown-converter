'use client'
import dynamic from 'next/dynamic'

const HtmlToMarkdownConverter = dynamic(
  () => import('@/components/html-to-markdown-converter'),
  { ssr: false }
)
export default function Home() {
  return <HtmlToMarkdownConverter />
}
