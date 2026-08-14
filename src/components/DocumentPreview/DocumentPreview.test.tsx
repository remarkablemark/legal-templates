import { render, screen } from '@testing-library/react';

import { DocumentPreview } from '.';

describe('DocumentPreview', () => {
  it('renders interpolated markdown as HTML', () => {
    render(<DocumentPreview markdown="# Acme Inc. Terms" />);

    expect(
      screen.getByRole('heading', { level: 1, name: 'Acme Inc. Terms' }),
    ).toBeInTheDocument();
  });
});
