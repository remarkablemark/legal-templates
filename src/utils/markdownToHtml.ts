import { marked } from 'marked';

/** Converts Markdown source into an HTML string. */
export function markdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false });
}
