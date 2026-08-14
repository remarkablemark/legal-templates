import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

import { FormPreviewLayout, type FormPreviewLayoutHandle } from '.';

describe('FormPreviewLayout', () => {
  it('renders both the form and preview content', () => {
    render(
      <FormPreviewLayout
        form={<div>Form content</div>}
        preview={<div>Preview content</div>}
      />,
    );

    expect(screen.getByText('Form content')).toBeInTheDocument();
    expect(screen.getByText('Preview content')).toBeInTheDocument();
  });

  it('shows the form panel and hides the preview panel by default', () => {
    render(
      <FormPreviewLayout
        form={<div>Form content</div>}
        preview={<div>Preview content</div>}
      />,
    );

    expect(screen.getByRole('tabpanel', { name: 'Form' })).not.toHaveClass(
      'hidden',
    );
    expect(screen.getByRole('tabpanel', { name: 'Preview' })).toHaveClass(
      'hidden',
    );
  });

  it('switches to the preview panel when the Preview tab is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FormPreviewLayout
        form={<div>Form content</div>}
        preview={<div>Preview content</div>}
      />,
    );

    await user.click(screen.getByRole('tab', { name: 'Preview' }));

    expect(screen.getByRole('tabpanel', { name: 'Preview' })).not.toHaveClass(
      'hidden',
    );
    expect(screen.getByRole('tabpanel', { name: 'Form' })).toHaveClass(
      'hidden',
    );
  });

  it('switches back to the form panel when the Form tab is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FormPreviewLayout
        form={<div>Form content</div>}
        preview={<div>Preview content</div>}
      />,
    );

    await user.click(screen.getByRole('tab', { name: 'Preview' }));
    await user.click(screen.getByRole('tab', { name: 'Form' }));

    expect(screen.getByRole('tabpanel', { name: 'Form' })).not.toHaveClass(
      'hidden',
    );
    expect(screen.getByRole('tabpanel', { name: 'Preview' })).toHaveClass(
      'hidden',
    );
  });

  it('switches to the form panel via the imperative handle', async () => {
    const user = userEvent.setup();
    const ref: { current: FormPreviewLayoutHandle | null } = {
      current: null,
    };

    render(
      <FormPreviewLayout
        ref={ref}
        form={<div>Form content</div>}
        preview={<div>Preview content</div>}
      />,
    );

    await user.click(screen.getByRole('tab', { name: 'Preview' }));
    expect(screen.getByRole('tabpanel', { name: 'Form' })).toHaveClass(
      'hidden',
    );

    act(() => {
      ref.current?.switchToFormTab();
    });

    expect(screen.getByRole('tabpanel', { name: 'Form' })).not.toHaveClass(
      'hidden',
    );
  });
});
