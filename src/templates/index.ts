import acceptableUsePolicyMarkdown from 'src/templates/acceptable-use-policy.md?raw';
import {
  baseFields,
  governingLawField,
  jurisdictionField,
} from 'src/templates/baseFields';
import cookiePolicyMarkdown from 'src/templates/cookie-policy.md?raw';
import disclaimerMarkdown from 'src/templates/disclaimer.md?raw';
import eulaMarkdown from 'src/templates/eula.md?raw';
import privacyPolicyMarkdown from 'src/templates/privacy-policy.md?raw';
import refundPolicyMarkdown from 'src/templates/refund-policy.md?raw';
import tosMarkdown from 'src/templates/tos.md?raw';
import type { TemplateConfig } from 'src/types/template.types';

export const templates: TemplateConfig[] = [
  {
    id: 'tos',
    title: 'Terms of Service',
    description: 'Set the rules for using your website or app.',
    fields: [...baseFields, governingLawField],
    markdown: tosMarkdown,
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Explain how you collect, use, and share personal data.',
    fields: [
      ...baseFields,
      jurisdictionField,
      {
        name: 'collectsPersonalData',
        label: 'Collects personal data',
        type: 'checkbox',
      },
      { name: 'usesCookies', label: 'Uses cookies', type: 'checkbox' },
      { name: 'usesAnalytics', label: 'Uses analytics', type: 'checkbox' },
      {
        name: 'hasUserAccounts',
        label: 'Has user accounts',
        type: 'checkbox',
      },
      {
        name: 'processesPayments',
        label: 'Processes payments',
        type: 'checkbox',
      },
      {
        name: 'hasChildrenUsers',
        label: 'May have users under 13',
        type: 'checkbox',
      },
    ],
    markdown: privacyPolicyMarkdown,
  },
  {
    id: 'cookie-policy',
    title: 'Cookie Policy',
    description: 'Disclose the cookies and tracking technologies you use.',
    fields: [
      ...baseFields,
      jurisdictionField,
      {
        name: 'usesAnalyticsCookies',
        label: 'Uses analytics cookies',
        type: 'checkbox',
      },
      {
        name: 'usesAdvertisingCookies',
        label: 'Uses advertising cookies',
        type: 'checkbox',
      },
    ],
    markdown: cookiePolicyMarkdown,
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    description: 'Limit your liability for the information you provide.',
    fields: [
      ...baseFields,
      governingLawField,
      {
        name: 'hasExternalLinks',
        label: 'Links to external websites',
        type: 'checkbox',
      },
    ],
    markdown: disclaimerMarkdown,
  },
  {
    id: 'eula',
    title: 'End-User License Agreement',
    description: 'Define the terms for using your software.',
    fields: [
      ...baseFields,
      governingLawField,
      {
        name: 'softwareName',
        label: 'Software Name',
        type: 'text',
        placeholder: 'Acme App',
        required: true,
      },
    ],
    markdown: eulaMarkdown,
  },
  {
    id: 'refund-policy',
    title: 'Refund Policy',
    description: 'Explain your terms for refunds and returns.',
    fields: [
      ...baseFields,
      governingLawField,
      {
        name: 'refundWindowDays',
        label: 'Refund Window (days)',
        type: 'text',
        placeholder: '30',
        required: true,
      },
      {
        name: 'excludesDigitalGoods',
        label: 'Excludes accessed digital goods',
        type: 'checkbox',
      },
    ],
    markdown: refundPolicyMarkdown,
  },
  {
    id: 'acceptable-use-policy',
    title: 'Acceptable Use Policy',
    description: 'Set rules for how people may use your service.',
    fields: [
      ...baseFields,
      governingLawField,
      {
        name: 'allowsUserContent',
        label: 'Allows user-generated content',
        type: 'checkbox',
      },
    ],
    markdown: acceptableUsePolicyMarkdown,
  },
];

export function getTemplate(id: string): TemplateConfig | undefined {
  return templates.find((template) => template.id === id);
}
