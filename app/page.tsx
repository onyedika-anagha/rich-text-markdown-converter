import dynamic from 'next/dynamic'

const HtmlToMarkdownConverter = dynamic(
  () => import('@/components/html-to-markdown-converter'),
  { ssr: false }
)

export const metadata = {
  title: 'Rich Text to Markdown Converter',
  description: 'Convert Rich Text to clean Markdown format instantly. Free, fast, and no server required.',
  keywords: 'Rich Text, markdown, converter, online tool',
}

export default function Home() {
  return <HtmlToMarkdownConverter />
}
