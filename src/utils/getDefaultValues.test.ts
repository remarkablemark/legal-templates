import type { Field } from 'src/types/template.types';
import { getDefaultValues } from 'src/utils/getDefaultValues';

describe('getDefaultValues', () => {
  it('defaults text-like fields to an empty string', () => {
    const fields: Field[] = [
      { name: 'companyName', label: 'Company', type: 'text' },
      { name: 'websiteUrl', label: 'Website', type: 'url' },
      { name: 'contactEmail', label: 'Email', type: 'email' },
      { name: 'effectiveDate', label: 'Date', type: 'date' },
    ];

    expect(getDefaultValues(fields)).toEqual({
      companyName: '',
      websiteUrl: '',
      contactEmail: '',
      effectiveDate: '',
    });
  });

  it('defaults checkbox fields to false', () => {
    const fields: Field[] = [
      { name: 'usesCookies', label: 'Uses cookies', type: 'checkbox' },
    ];

    expect(getDefaultValues(fields)).toEqual({ usesCookies: false });
  });

  it('defaults select fields to the first option', () => {
    const fields: Field[] = [
      {
        name: 'jurisdiction',
        label: 'Jurisdiction',
        type: 'select',
        options: [
          { label: 'EU', value: 'eu' },
          { label: 'Other', value: 'other' },
        ],
      },
    ];

    expect(getDefaultValues(fields)).toEqual({ jurisdiction: 'eu' });
  });

  it('defaults a select field with no options to an empty string', () => {
    const fields: Field[] = [
      { name: 'empty', label: 'Empty', type: 'select', options: [] },
    ];

    expect(getDefaultValues(fields)).toEqual({ empty: '' });
  });
});
