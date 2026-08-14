import type { Field, SelectField, TextField } from 'src/types/template.types';

/**
 * Fields shared by every template: company/website identity, contact, and
 * effective date. Templates append their own extra fields after these.
 */
export const baseFields: Field[] = [
  {
    name: 'companyName',
    label: 'Company / Website Name',
    type: 'text',
    placeholder: 'Acme Inc.',
    required: true,
  },
  {
    name: 'websiteUrl',
    label: 'Website URL',
    type: 'url',
    placeholder: 'https://example.com',
    required: true,
  },
  {
    name: 'contactEmail',
    label: 'Contact Email',
    type: 'email',
    placeholder: 'privacy@example.com',
    required: true,
  },
  {
    name: 'effectiveDate',
    label: 'Effective Date',
    type: 'date',
    required: true,
  },
];

/**
 * Jurisdiction select field for templates with jurisdiction-specific clauses
 * (Privacy Policy, Cookie Policy). Drives Mustache conditional sections for
 * GDPR (`isEu`) and CCPA (`isCalifornia`) disclosures.
 */
export const jurisdictionField: SelectField = {
  name: 'jurisdiction',
  label: 'Primary Jurisdiction',
  type: 'select',
  options: [
    { label: 'United States (CCPA)', value: 'california' },
    { label: 'European Union (GDPR)', value: 'eu' },
    { label: 'Other', value: 'other' },
  ],
};

/**
 * Plain governing-law text field for templates without jurisdiction-specific
 * conditional clauses.
 */
export const governingLawField: TextField = {
  name: 'governingLaw',
  label: 'Governing Law',
  type: 'text',
  placeholder: 'State of Delaware, United States',
  required: true,
};
