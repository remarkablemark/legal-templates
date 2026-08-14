import { markdownToHtml } from 'src/utils/markdownToHtml';

/** Converts Markdown source into plain text, stripping HTML/Markdown syntax. */
export function markdownToPlainText(markdown: string): string {
  const html = markdownToHtml(markdown)
    .replace(/>\s+</g, '><')
    .replace(/<\/(?:h[1-6]|p)>/gi, '\n\n')
    .replace(/<\/(?:div|li|tr)>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n');

  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body.textContent;

  return text.replace(/\n{3,}/g, '\n\n').trim();
}
