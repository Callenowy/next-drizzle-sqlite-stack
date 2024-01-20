import { render, screen } from '@testing-library/react';
import { Card } from './card';

describe('Card', () => {
  it('renders children inside a div with correct styles', () => {
    render(
      <Card data-testid="card">
        <span>Card Content</span>
      </Card>
    );

    expect(screen.getByTestId('card')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toHaveClass(
      'w-full rounded-[10px] bg-white p-8 shadow'
    );
  });
});
