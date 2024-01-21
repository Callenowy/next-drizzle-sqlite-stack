import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from './button';

type ButtonTypeProp = React.ButtonHTMLAttributes<HTMLButtonElement>['type'];

const sizePropMap = [
  ['sm', 'h-8 px-6 text-xs'],
  ['md', 'h-12 px-7 text-base'],
  ['lg', 'h-16 px-8 text-md'],
] as const;

const variantPropMap = [
  ['filled', 'text-white'],
  ['outline', 'border bg-transparent hover:text-white active:text-white'],
] as const;

const colorPropMap = [
  ['blue', 'active:bg-blue-700'],
  ['black', 'hover:bg-neutral-700'],
] as const;

const compoundVariantPropMap = [
  ['filled', 'blue', 'bg-blue-600 hover:bg-blue-500 focus:bg-blue-600'],
  [
    'filled',
    'black',
    'bg-neutral-800  focus:bg-neutral-800 active:bg-neutral-950',
  ],
  ['outline', 'blue', 'border-blue-600 text-blue-600 hover:bg-blue-600'],
  [
    'outline',
    'black',
    'border-neutral-800 text-neutral-800  active:bg-neutral-800',
  ],
] as const;

describe('Button', () => {
  describe('render as expected - Component API', () => {
    it('render the button component successfully', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('allow passing HTML nodes through the `children` prop', () => {
      render(
        <Button>
          <span>button</span>
        </Button>
      );

      expect(screen.getByText('button')).toBeInTheDocument();
    });

    it('should spread extra props onto the button element', () => {
      const buttonTestId = 'button-test-id';
      const buttonId = 'button-id';

      render(
        <Button data-testid={buttonTestId} id={buttonId}>
          Button
        </Button>
      );

      expect(screen.getByTestId(buttonTestId)).toBeInTheDocument();
      expect(screen.getByTestId(buttonTestId)).toHaveAttribute('id', buttonId);
    });

    it('should add a custom className', () => {
      render(<Button className="custom-class">Button</Button>);

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('respects the `disabled` prop', () => {
      render(<Button disabled>Button</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should render with the button role', () => {
      render(<Button>test</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it.each<ButtonTypeProp>(['button', 'submit', 'reset'])(
      'should respects the `type` prop with `%s` value',
      type => {
        render(<Button type={type}>Button</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('type', type);
      }
    );

    it('should render as link with `href` prop', () => {
      render(
        <Button asChild>
          <a href="https://example.com">Link</a>
        </Button>
      );

      expect(screen.getByRole('link')).toBeInTheDocument();
    });
  });

  describe('behaves as expected - Component API', () => {
    it('should call the `onClick` handler', async () => {
      const onClick = vi.fn();

      render(<Button onClick={onClick}>Button</Button>);

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'click',
        })
      );
    });

    it('should not call the `onClick` handler when disabled', async () => {
      const onClick = vi.fn();

      render(
        <Button disabled onClick={onClick}>
          Button
        </Button>
      );

      await userEvent.click(screen.getByRole('button'));

      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('should handle ref', () => {
      const ref = createRef<HTMLButtonElement>();

      render(
        <Button ref={ref} id="refButton">
          Button
        </Button>
      );

      expect(ref.current).toBe(screen.getByRole('button'));
      expect(ref.current).toHaveAttribute('id', 'refButton');
    });
  });

  describe('display as expected - CSS API', () => {
    it('should render with default classNames', () => {
      render(<Button>Button</Button>);

      expect(screen.getByRole('button')).toHaveClass(
        'inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-blue-600 text-white active:bg-blue-700 h-12 px-7 text-base bg-blue-600 hover:bg-blue-500 focus:bg-blue-600'
      );
    });

    it('respects `fluid` prop', () => {
      render(<Button fluid>Button</Button>);

      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it.each(sizePropMap)(
      'should respects `size` prop with `%s` value',
      (size, expected) => {
        render(<Button size={size}>Button</Button>);

        expect(screen.getByRole('button')).toHaveClass(expected);
      }
    );

    it.each(variantPropMap)(
      'should respects `variant` prop with `%s` value',
      (variant, expected) => {
        render(<Button variant={variant}>Button</Button>);

        expect(screen.getByRole('button')).toHaveClass(expected);
      }
    );

    it.each(colorPropMap)(
      'should respects `color` prop with `%s` value',
      (color, expected) => {
        render(<Button color={color}>Button</Button>);

        expect(screen.getByRole('button')).toHaveClass(expected);
      }
    );

    it.each(compoundVariantPropMap)(
      'should respects compound variants with `%s` and `%s` values',
      (variant, color, expected) => {
        render(
          <Button variant={variant} color={color}>
            Button
          </Button>
        );

        expect(screen.getByRole('button')).toHaveClass(expected);
      }
    );
  });
});
