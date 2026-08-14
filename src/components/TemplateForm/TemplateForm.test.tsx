import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { Field, FieldValues } from 'src/types/template.types';

import { TemplateForm } from '.';

const fields: Field[] = [
  {
    name: 'companyName',
    label: 'Company / Website Name',
    type: 'text',
    placeholder: 'Acme Inc.',
  },
  {
    name: 'effectiveDate',
    label: 'Effective Date',
    type: 'date',
  },
  {
    name: 'jurisdiction',
    label: 'Primary Jurisdiction',
    type: 'select',
    options: [
      { label: 'European Union (GDPR)', value: 'eu' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    name: 'usesCookies',
    label: 'Uses cookies',
    type: 'checkbox',
  },
];

function ControlledTemplateForm({
  initialValues,
  onChange,
}: {
  initialValues: FieldValues;
  onChange: (name: string, value: boolean | string) => void;
}) {
  const [values, setValues] = useState(initialValues);

  return (
    <TemplateForm
      fields={fields}
      onChange={(name, value) => {
        setValues((previous) => ({ ...previous, [name]: value }));
        onChange(name, value);
      }}
      values={values}
    />
  );
}

function setup(values: FieldValues) {
  const onChange = vi.fn();
  render(<ControlledTemplateForm initialValues={values} onChange={onChange} />);
  return { onChange };
}

describe('TemplateForm', () => {
  it('renders a labeled text input', () => {
    setup({ companyName: '' });

    expect(screen.getByLabelText('Company / Website Name')).toHaveAttribute(
      'placeholder',
      'Acme Inc.',
    );
  });

  it('renders a labeled date input', () => {
    setup({ effectiveDate: '' });

    const input = screen.getByLabelText('Effective Date');
    expect(input).toHaveAttribute('type', 'date');
  });

  it('renders a select with options', () => {
    setup({ jurisdiction: 'eu' });

    const select = screen.getByLabelText('Primary Jurisdiction');
    expect(select).toHaveValue('eu');
    expect(
      screen.getByRole('option', { name: 'European Union (GDPR)' }),
    ).toBeInTheDocument();
  });

  it('renders a checkbox', () => {
    setup({ usesCookies: false });

    expect(screen.getByLabelText('Uses cookies')).not.toBeChecked();
  });

  it('calls onChange with the typed value for a text field', async () => {
    const user = userEvent.setup();
    const { onChange } = setup({ companyName: '' });

    await user.type(screen.getByLabelText('Company / Website Name'), 'Acme');

    expect(onChange).toHaveBeenLastCalledWith('companyName', 'Acme');
  });

  it('calls onChange with the selected value for a select field', async () => {
    const user = userEvent.setup();
    const { onChange } = setup({ jurisdiction: 'eu' });

    await user.selectOptions(
      screen.getByLabelText('Primary Jurisdiction'),
      'other',
    );

    expect(onChange).toHaveBeenCalledWith('jurisdiction', 'other');
  });

  it('calls onChange with a boolean for a checkbox field', async () => {
    const user = userEvent.setup();
    const { onChange } = setup({ usesCookies: false });

    await user.click(screen.getByLabelText('Uses cookies'));

    expect(onChange).toHaveBeenCalledWith('usesCookies', true);
  });
});
