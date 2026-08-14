export type FieldType =
  'checkbox' | 'date' | 'email' | 'select' | 'text' | 'url';

interface BaseField {
  /** Unique key used both as the form state key and the Mustache placeholder name. */
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  type: FieldType;
}

export interface TextField extends BaseField {
  type: 'email' | 'text' | 'url';
}

export interface DateField extends BaseField {
  type: 'date';
}

export interface SelectField extends BaseField {
  options: { label: string; value: string }[];
  type: 'select';
}

export interface CheckboxField extends BaseField {
  type: 'checkbox';
}

export type Field = CheckboxField | DateField | SelectField | TextField;

export type FieldValues = Record<string, boolean | string>;

export interface TemplateConfig {
  /** Unique identifier used in the route path, e.g. `tos`. */
  id: string;
  title: string;
  description: string;
  /** Additional fields specific to this template, appended after the shared base fields. */
  fields: Field[];
  /** Raw Markdown source containing `{{placeholder}}` tokens and Mustache sections. */
  markdown: string;
}
