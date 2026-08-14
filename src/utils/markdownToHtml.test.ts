import { markdownToHtml } from 'src/utils/markdownToHtml';

describe('markdownToHtml', () => {
  it('converts a heading to HTML', () => {
    expect(markdownToHtml('# Title')).toBe('<h1>Title</h1>\n');
  });

  it('converts a paragraph to HTML', () => {
    expect(markdownToHtml('Hello world')).toBe('<p>Hello world</p>\n');
  });
});
