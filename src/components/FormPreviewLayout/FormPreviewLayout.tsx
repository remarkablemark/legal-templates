import { useId, useImperativeHandle, useState } from 'react';

type Tab = 'form' | 'preview';

export interface FormPreviewLayoutHandle {
  /** Switches to the Form tab, e.g. to reveal an invalid field on mobile. */
  switchToFormTab: () => void;
}

export interface FormPreviewLayoutProps {
  form: React.ReactNode;
  preview: React.ReactNode;
  ref?: React.Ref<FormPreviewLayoutHandle>;
}

const tabClassName = (isActive: boolean) =>
  `flex-1 cursor-pointer rounded-md px-4 py-2 text-sm font-medium transition-all ${
    isActive
      ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
      : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
  }`;

export function FormPreviewLayout({
  form,
  preview,
  ref,
}: FormPreviewLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('form');
  const id = useId();

  useImperativeHandle(ref, () => ({
    switchToFormTab: () => {
      setActiveTab('form');
    },
  }));

  const formTabId = `${id}-form-tab`;
  const formPanelId = `${id}-form-panel`;
  const previewTabId = `${id}-preview-tab`;
  const previewPanelId = `${id}-preview-panel`;

  return (
    <div>
      <div className="mb-4 flex gap-2 md:hidden" role="tablist">
        <button
          aria-controls={formPanelId}
          aria-selected={activeTab === 'form'}
          className={tabClassName(activeTab === 'form')}
          id={formTabId}
          onClick={() => {
            setActiveTab('form');
          }}
          role="tab"
          type="button"
        >
          Form
        </button>
        <button
          aria-controls={previewPanelId}
          aria-selected={activeTab === 'preview'}
          className={tabClassName(activeTab === 'preview')}
          id={previewTabId}
          onClick={() => {
            setActiveTab('preview');
          }}
          role="tab"
          type="button"
        >
          Preview
        </button>
      </div>

      <div className="flex flex-col gap-8 md:flex-row">
        <div
          aria-labelledby={formTabId}
          className={`min-w-0 flex-1 ${activeTab === 'form' ? 'block' : 'hidden'} md:block`}
          id={formPanelId}
          role="tabpanel"
        >
          {form}
        </div>
        <div
          aria-labelledby={previewTabId}
          className={`min-w-0 flex-1 ${activeTab === 'preview' ? 'block' : 'hidden'} md:block`}
          id={previewPanelId}
          role="tabpanel"
        >
          {preview}
        </div>
      </div>
    </div>
  );
}
