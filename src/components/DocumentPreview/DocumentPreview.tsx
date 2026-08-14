import { markdownToHtml } from 'src/utils/markdownToHtml';

export interface DocumentPreviewProps {
  markdown: string;
}

export function DocumentPreview({ markdown }: DocumentPreviewProps) {
  return (
    <div
      className="max-w-none rounded-md border border-slate-300 bg-white p-6 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-6"
      // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml -- markdown is authored in this repo, not user-supplied
      dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
    />
  );
}
