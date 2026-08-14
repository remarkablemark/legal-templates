import { Link } from 'react-router-dom';
import { templates } from 'src/templates';

export function HomePage() {
  return (
    <main className="mx-auto max-w-(--breakpoint-md) p-8 dark:bg-slate-900 dark:text-slate-100">
      <h1 className="mb-2 text-3xl font-bold">Legal Templates</h1>
      <p className="mb-8 text-slate-600 dark:text-slate-400">
        Generate legal documents for your website or app. Fill out a short form
        and copy the result as plain text, Markdown, or HTML.
      </p>

      <p className="mb-8 rounded-md border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200">
        ⚠️ These templates are provided for informational purposes only and do
        not constitute legal advice. Consult a qualified lawyer before using any
        generated document.
      </p>

      <ul className="flex flex-col gap-4">
        {templates.map((template) => (
          <li key={template.id}>
            <Link
              className="block rounded-md border border-slate-300 p-4 transition-colors hover:border-slate-800 dark:border-slate-700 dark:hover:border-slate-500"
              to={`/${template.id}`}
            >
              <h2 className="text-lg font-semibold">{template.title}</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {template.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
