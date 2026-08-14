import { useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { CopyButton } from 'src/components/CopyButton';
import { DocumentPreview } from 'src/components/DocumentPreview';
import { FormPreviewLayout } from 'src/components/FormPreviewLayout';
import { TemplateForm } from 'src/components/TemplateForm';
import { getTemplate } from 'src/templates';
import type { FieldValues, TemplateConfig } from 'src/types/template.types';
import { getDefaultValues } from 'src/utils/getDefaultValues';
import { interpolate } from 'src/utils/interpolate';
import { markdownToHtml } from 'src/utils/markdownToHtml';
import { markdownToPlainText } from 'src/utils/markdownToPlainText';

export function TemplatePage() {
  const { id } = useParams<{ id: string }>();
  /* v8 ignore next -- @preserve: id is always defined when the `/:id` route matches */
  const template = id ? getTemplate(id) : undefined;

  if (!template) {
    return <Navigate replace to="/" />;
  }

  return <TemplateEditor key={template.id} template={template} />;
}

function TemplateEditor({ template }: { template: TemplateConfig }) {
  const [values, setValues] = useState<FieldValues>(() =>
    getDefaultValues(template.fields),
  );
  const formRef = useRef<HTMLFormElement>(null);

  function handleChange(name: string, value: boolean | string) {
    setValues((previous) => ({ ...previous, [name]: value }));
  }

  function validate() {
    /* v8 ignore next -- @preserve: formRef is always attached once mounted */
    return formRef.current?.reportValidity() ?? true;
  }

  const interpolatedMarkdown = interpolate(template.markdown, values);

  return (
    <main className="mx-auto max-w-(--breakpoint-xl) p-8 dark:bg-slate-900 dark:text-slate-100">
      <Link
        className="mb-4 inline-block text-sm text-slate-500 hover:underline dark:text-slate-400"
        to="/"
      >
        ← Back to templates
      </Link>

      <h1 className="mb-6 text-3xl font-bold">{template.title}</h1>

      <FormPreviewLayout
        form={
          <TemplateForm
            ref={formRef}
            fields={template.fields}
            onChange={handleChange}
            values={values}
          />
        }
        preview={
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              <CopyButton
                getText={() => markdownToPlainText(interpolatedMarkdown)}
                label="Copy as Plain Text"
                validate={validate}
              />
              <CopyButton
                getText={() => interpolatedMarkdown}
                label="Copy as Markdown"
                validate={validate}
              />
              <CopyButton
                getText={() => markdownToHtml(interpolatedMarkdown)}
                label="Copy as HTML"
                validate={validate}
              />
            </div>
            <DocumentPreview markdown={interpolatedMarkdown} />
          </div>
        }
      />
    </main>
  );
}
