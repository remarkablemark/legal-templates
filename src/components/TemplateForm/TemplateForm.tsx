import type { Field, FieldValues } from 'src/types/template.types';

const inputClassName =
  'w-full rounded-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-800 shadow-xs focus:border-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-slate-500';

export interface TemplateFormProps {
  fields: Field[];
  values: FieldValues;
  onChange: (name: string, value: boolean | string) => void;
  ref?: React.Ref<HTMLFormElement>;
}

export function TemplateForm({
  fields,
  values,
  onChange,
  ref,
}: TemplateFormProps) {
  function handleChange(field: Field) {
    return (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        field.type === 'checkbox' && event.target instanceof HTMLInputElement
          ? event.target.checked
          : event.target.value;

      onChange(field.name, value);
    };
  }

  return (
    <form
      ref={ref}
      className="flex flex-col gap-4"
      aria-label="Document details"
    >
      {fields.map((field, index) => {
        const autoFocus = index === 0;

        if (field.type === 'checkbox') {
          return (
            <label
              key={field.name}
              className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300"
            >
              <input
                autoFocus={autoFocus}
                checked={Boolean(values[field.name])}
                className="size-4 rounded border-slate-300 dark:border-slate-700"
                onChange={handleChange(field)}
                type="checkbox"
              />
              {field.label}
            </label>
          );
        }

        if (field.type === 'select') {
          return (
            <label
              key={field.name}
              className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300"
            >
              {field.label}
              <select
                autoFocus={autoFocus}
                className={inputClassName}
                onChange={handleChange(field)}
                required={field.required}
                value={String(values[field.name] ?? '')}
              >
                {field.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          );
        }

        return (
          <label
            key={field.name}
            className="flex flex-col gap-1 text-sm text-slate-700 dark:text-slate-300"
          >
            {field.label}
            <input
              autoFocus={autoFocus}
              className={inputClassName}
              onChange={handleChange(field)}
              placeholder={field.placeholder}
              required={field.required}
              type={field.type}
              value={String(values[field.name] ?? '')}
            />
          </label>
        );
      })}
    </form>
  );
}
