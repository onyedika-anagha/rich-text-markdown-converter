import HtmlToMarkdownConverter from '@/components/html-to-markdown-converter'

export const metadata = {
  title: 'Rich Text to Markdown Converter',
  description: 'Convert Rich Text to clean Markdown format instantly. Free, fast, and no server required.',
  keywords: 'Rich Text, markdown, converter, online tool',
}

export default function Home() {
  return <HtmlToMarkdownConverter />
}
