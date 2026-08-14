import { render, screen } from '@testing-library/react';

import { App } from '.';

describe('App component', () => {
  it('renders the home page at the root route', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Legal Templates' }),
    ).toBeInTheDocument();
  });
});
