# Rich Text → Markdown Converter

Convert rich text to clean Markdown format in real time. Type formatted content in the editor and see the Markdown output instantly.

## Features

- **Rich text editing** — Format text with headings, bold, italic, lists, links, blockquotes, and more using [Quill](https://quilljs.com/)
- **Live conversion** — Markdown updates as you type
- **Split-pane layout** — Side-by-side view with line numbers on the output
- **Copy to clipboard** — One-click copy of the generated Markdown
- **Dark mode** — Theme toggle with smooth transitions
- **Client-side only** — No server required; conversion runs in the browser

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- [Next.js 16](https://nextjs.org/) — React framework
- [React Quill New](https://github.com/VaguelySerious/react-quill) — Rich text editor
- [Turndown](https://github.com/mixmark-io/turndown) — HTML to Markdown conversion
- [Tailwind CSS](https://tailwindcss.com/) — Styling
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [next-themes](https://github.com/pacocoursey/next-themes) — Theme switching

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Build for production     |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## License

MIT
