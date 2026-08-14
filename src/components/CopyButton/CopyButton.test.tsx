import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CopyButton } from '.';

describe('CopyButton', () => {
  it('copies the text returned by getText and shows feedback', async () => {
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined);
    const getText = vi.fn().mockReturnValue('Hello world');

    render(<CopyButton label="Copy as Text" getText={getText} />);

    const button = screen.getByRole('button', { name: 'Copy as Text' });
    await user.click(button);

    await waitFor(() => {
      expect(button).toHaveTextContent('Copied!');
    });
    expect(writeText).toHaveBeenCalledWith('Hello world');

    await waitFor(
      () => {
        expect(button).toHaveTextContent('Copy as Text');
      },
      { timeout: 3000 },
    );
  });

  it('does not copy when validate returns false', async () => {
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined);
    const getText = vi.fn().mockReturnValue('Hello world');
    const validate = vi.fn().mockReturnValue(false);

    render(
      <CopyButton getText={getText} label="Copy as Text" validate={validate} />,
    );

    await user.click(screen.getByRole('button', { name: 'Copy as Text' }));

    expect(validate).toHaveBeenCalled();
    expect(writeText).not.toHaveBeenCalled();
  });
});
