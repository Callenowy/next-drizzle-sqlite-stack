import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Input } from './input';

describe('Input', () => {
  describe('renders as expected - Component API', () => {
    it('render input component successfully', () => {
      render(<Input />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should spread extra props onto the input element', () => {
      render(<Input data-testid="test-id" id="input-1" />);

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'input-1');
    });

    it('respects the disabled prop', () => {
      render(<Input disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('respects the readonly prop', () => {
      render(<Input readOnly />);

      expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
    });

    it('respects the defaultValue prop', () => {
      render(<Input id="input-1" defaultValue="This is default text" />);

      expect(screen.getByRole('textbox')).toHaveValue('This is default text');
    });

    it('respects the value prop', () => {
      const onChange = vi.fn();

      render(<Input value="This is text" onChange={onChange} />);

      expect(screen.getByRole('textbox')).toHaveValue('This is text');
    });

    it('respects the placeholder prop', () => {
      render(<Input placeholder="Placeholder text" />);

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });

    it('should spread the default type attributes', () => {
      render(<Input />);

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });
  });

  describe('behaves as expected - Component API', () => {
    it('respects onChange handler', async () => {
      const onChange = vi.fn();

      const inputValue = 'custom input value';
      const valueLength = inputValue.length;

      render(<Input onChange={onChange} />);

      await userEvent.type(screen.getByRole('textbox'), inputValue);
      expect(screen.getByRole('textbox')).toHaveValue(inputValue);
      expect(onChange).toHaveBeenCalledTimes(valueLength);
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object) as HTMLInputElement,
        })
      );
    });

    it('respects onClick handler', async () => {
      const onClick = vi.fn();

      render(<Input onClick={onClick} />);

      await userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.any(Object) as HTMLInputElement,
        })
      );
    });

    it('should not call `onClick` when the `<input>` is clicked but disabled', async () => {
      const onClick = vi.fn();

      render(<Input onClick={onClick} disabled />);

      await userEvent.click(screen.getByRole('textbox'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('respects readOnly prop', async () => {
      const onChange = vi.fn();
      const onClick = vi.fn();

      const inputValue = 'custom input value';

      render(<Input onClick={onClick} onChange={onChange} readOnly />);

      await userEvent.click(screen.getByRole('textbox'));
      expect(onClick).toHaveBeenCalledTimes(1);

      await userEvent.type(screen.getByRole('textbox'), inputValue);
      expect(screen.getByRole('textbox')).not.toHaveValue(inputValue);
      expect(onChange).toHaveBeenCalledTimes(0);
    });
  });
});
