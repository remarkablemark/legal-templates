import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { templates } from 'src/templates';

import { HomePage } from '.';

describe('HomePage', () => {
  it('renders a link for every template', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    for (const template of templates) {
      const link = screen.getByRole('link', {
        name: new RegExp(template.title),
      });
      expect(link).toHaveAttribute('href', `/${template.id}`);
    }
  });

  it('shows the legal disclaimer', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    expect(
      screen.getByText(/not constitute legal advice/i),
    ).toBeInTheDocument();
  });
});
