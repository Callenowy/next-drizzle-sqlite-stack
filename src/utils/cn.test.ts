import { cn } from './cn';

describe('cn', () => {
  it('should return a string with merged class names', () => {
    const result = cn('class1', 'class2', 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('should handle empty inputs', () => {
    const result = cn();
    expect(result).toBe('');
  });

  it('should handle falsy inputs', () => {
    const result = cn('class1', null, undefined, false, 0);
    expect(result).toBe('class1');
  });
});
