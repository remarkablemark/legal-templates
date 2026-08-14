import Mustache from 'mustache';
import type { FieldValues } from 'src/types/template.types';

/**
 * Builds the Mustache view from raw form values, adding derived boolean
 * flags for jurisdiction-specific conditional sections (GDPR/CCPA).
 */
function buildView(values: FieldValues): Record<string, boolean | string> {
  const view: Record<string, boolean | string> = { ...values };

  if (typeof values.jurisdiction === 'string') {
    view.isEu = values.jurisdiction === 'eu';
    view.isCalifornia = values.jurisdiction === 'california';
  }

  return view;
}

/**
 * Renumbers `## N. Heading` sections sequentially so hidden conditional
 * sections don't leave gaps in the numbering (e.g. 1, 3, 4 becomes 1, 2, 3).
 */
function renumberHeadings(markdown: string): string {
  let sectionNumber = 0;

  return markdown.replace(
    /^## \d+\./gm,
    () => `## ${String(++sectionNumber)}.`,
  );
}

/**
 * Interpolates `{{placeholder}}` tokens and `{{#field}}...{{/field}}`
 * conditional sections in the given Markdown template using Mustache.
 */
export function interpolate(markdown: string, values: FieldValues): string {
  return renumberHeadings(Mustache.render(markdown, buildView(values)));
}
