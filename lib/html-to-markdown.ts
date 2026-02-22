import TurndownService from "turndown";

const turndownService = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  fence: "```",
  linkStyle: "inlined",
});

// Remove style/script tags that Quill might produce
turndownService.addRule("removeScriptsAndStyles", {
  filter: ["script", "style"],
  replacement: () => "",
});

export function htmlToMarkdown(html: string): string {
  if (!html || html.trim() === "" || html === "<p><br></p>") {
    return "";
  }
  try {
    return turndownService.turndown(html).trim();
  } catch {
    return html;
  }
}
