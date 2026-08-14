import { markdownToPlainText } from 'src/utils/markdownToPlainText';

describe('markdownToPlainText', () => {
  it('strips heading syntax', () => {
    expect(markdownToPlainText('# Title')).toBe('Title');
  });

  it('joins paragraphs with blank lines', () => {
    expect(markdownToPlainText('First paragraph.\n\nSecond paragraph.')).toBe(
      'First paragraph.\n\nSecond paragraph.',
    );
  });

  it('converts list items to newline-separated text', () => {
    expect(markdownToPlainText('- one\n- two')).toBe('one\ntwo');
  });
});
