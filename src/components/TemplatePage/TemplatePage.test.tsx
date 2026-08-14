import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { TemplatePage } from '.';

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route element={<div>Home</div>} path="/" />
        <Route element={<TemplatePage />} path="/:id" />
      </Routes>
    </MemoryRouter>,
  );
}

describe('TemplatePage', () => {
  it('renders the form and preview for a known template', () => {
    renderAt('/tos');

    expect(
      screen.getAllByRole('heading', { level: 1, name: 'Terms of Service' }),
    ).toHaveLength(2); // page heading + document preview heading
    expect(screen.getByLabelText('Company / Website Name')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Copy as Plain Text' }),
    ).toBeInTheDocument();
  });

  it('redirects to home for an unknown template id', () => {
    renderAt('/not-a-real-template');

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('updates the preview when a field changes', async () => {
    const user = userEvent.setup();
    renderAt('/tos');

    await user.type(
      screen.getByLabelText('Company / Website Name'),
      'Acme Inc.',
    );

    expect(screen.getAllByText(/Acme Inc\./).length).toBeGreaterThan(0);
  });

  it.each(['Copy as Plain Text', 'Copy as Markdown', 'Copy as HTML'] as const)(
    'copies the output when "%s" is clicked and required fields are filled',
    async (label) => {
      const user = userEvent.setup();
      const writeText = vi
        .spyOn(navigator.clipboard, 'writeText')
        .mockResolvedValue(undefined);
      renderAt('/tos');

      await user.type(
        screen.getByLabelText('Company / Website Name'),
        'Acme Inc.',
      );
      await user.type(
        screen.getByLabelText('Website URL'),
        'https://example.com',
      );
      await user.type(
        screen.getByLabelText('Contact Email'),
        'contact@example.com',
      );
      await user.type(screen.getByLabelText('Effective Date'), '2024-01-01');
      await user.type(
        screen.getByLabelText('Governing Law'),
        'State of Delaware',
      );
      await user.click(screen.getByRole('button', { name: label }));

      expect(writeText).toHaveBeenCalled();
    },
  );

  it('does not copy when required fields are empty', async () => {
    const user = userEvent.setup();
    const writeText = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined);
    renderAt('/tos');

    await user.click(
      screen.getByRole('button', { name: 'Copy as Plain Text' }),
    );

    expect(writeText).not.toHaveBeenCalled();
  });
});
