import { useState } from 'react';

const COPIED_FEEDBACK_DURATION_MS = 2000;

export interface CopyButtonProps {
  label: string;
  getText: () => string;
  /** Optional check run before copying; if it returns `false`, the copy is aborted. */
  validate?: () => boolean;
}

export function CopyButton({ label, getText, validate }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleClick() {
    if (validate && !validate()) {
      return;
    }

    await navigator.clipboard.writeText(getText());
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, COPIED_FEEDBACK_DURATION_MS);
  }

  return (
    <button
      className="cursor-pointer rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-center text-sm font-medium text-slate-800 shadow-xs transition-all hover:border-slate-800 focus:border-slate-800 focus:bg-slate-50 active:border-slate-800 active:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-500 dark:focus:border-slate-500 dark:focus:bg-slate-800 dark:active:border-slate-500 dark:active:bg-slate-800"
      onClick={() => void handleClick()}
      type="button"
    >
      {copied ? 'Copied!' : label}
    </button>
  );
}
