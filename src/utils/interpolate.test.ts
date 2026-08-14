import { interpolate } from 'src/utils/interpolate';

describe('interpolate', () => {
  it('substitutes simple placeholders', () => {
    const result = interpolate('Hello, {{companyName}}!', {
      companyName: 'Acme Inc.',
    });

    expect(result).toBe('Hello, Acme Inc.!');
  });

  it('renders a conditional section when the checkbox value is true', () => {
    const markdown = '{{#usesCookies}}We use cookies.{{/usesCookies}}';

    expect(interpolate(markdown, { usesCookies: true })).toBe(
      'We use cookies.',
    );
    expect(interpolate(markdown, { usesCookies: false })).toBe('');
  });

  it('adds isEu when jurisdiction is "eu"', () => {
    const markdown =
      '{{#isEu}}GDPR applies.{{/isEu}}{{#isCalifornia}}CCPA applies.{{/isCalifornia}}';

    expect(interpolate(markdown, { jurisdiction: 'eu' })).toBe('GDPR applies.');
  });

  it('adds isCalifornia when jurisdiction is "california"', () => {
    const markdown =
      '{{#isEu}}GDPR applies.{{/isEu}}{{#isCalifornia}}CCPA applies.{{/isCalifornia}}';

    expect(interpolate(markdown, { jurisdiction: 'california' })).toBe(
      'CCPA applies.',
    );
  });

  it('does not add jurisdiction flags when jurisdiction is absent', () => {
    const markdown =
      '{{#isEu}}GDPR applies.{{/isEu}}{{#isCalifornia}}CCPA applies.{{/isCalifornia}}';

    expect(interpolate(markdown, { companyName: 'Acme Inc.' })).toBe('');
  });

  it('leaves a single blank line around a standalone section in both states', () => {
    const markdown = [
      'Before.',
      '',
      '{{#excludesDigitalGoods}}',
      '## Digital Goods',
      '',
      'Non-refundable.',
      '',
      '{{/excludesDigitalGoods}}',
      'After.',
    ].join('\n');

    expect(interpolate(markdown, { excludesDigitalGoods: false })).toBe(
      'Before.\n\nAfter.',
    );
    expect(interpolate(markdown, { excludesDigitalGoods: true })).toBe(
      'Before.\n\n## Digital Goods\n\nNon-refundable.\n\nAfter.',
    );
  });

  it('renumbers headings sequentially when a middle section is hidden', () => {
    const markdown = [
      '## 1. First',
      '{{#showSecond}}',
      '## 2. Second',
      '{{/showSecond}}',
      '## 3. Third',
    ].join('\n');

    expect(interpolate(markdown, { showSecond: false })).toBe(
      '## 1. First\n## 2. Third',
    );
    expect(interpolate(markdown, { showSecond: true })).toBe(
      '## 1. First\n## 2. Second\n## 3. Third',
    );
  });
});
