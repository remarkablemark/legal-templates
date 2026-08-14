import type { Field, FieldValues } from 'src/types/template.types';

/** Builds the initial form state for a list of fields. */
export function getDefaultValues(fields: Field[]): FieldValues {
  const values: FieldValues = {};

  for (const field of fields) {
    if (field.type === 'checkbox') {
      values[field.name] = false;
    } else if (field.type === 'select') {
      values[field.name] = field.options[0]?.value ?? '';
    } else {
      values[field.name] = '';
    }
  }

  return values;
}
