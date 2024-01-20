import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/utils/cn';
import {
  colorMap,
  sizeMap,
  weightMap,
  alignMap,
  spacingMap,
} from '@/styles/classMappings';

const genTWClass = <T extends Record<string, string>>(
  classMap: T,
  classValue?: string
) => (classValue && classValue in classMap ? classMap[classValue] : undefined);

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'> {
  asChild?: boolean;
  size?: keyof typeof sizeMap;
  weight?: keyof typeof weightMap;
  align?: React.CSSProperties['textAlign'];
  spacing?: keyof typeof spacingMap;
  color?: keyof typeof colorMap;
}

const Text = forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      children,
      className,
      asChild,
      size = 'base',
      weight,
      align,
      spacing,
      color = 'black',
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'p';

    const fontSize = genTWClass(sizeMap, size);
    const fontWeight = genTWClass(weightMap, weight);
    const textAlign = genTWClass(alignMap, align);
    const letterSpacing = genTWClass(spacingMap, spacing);
    const textColor = genTWClass(colorMap, color);

    return (
      <Comp
        ref={ref}
        className={cn(
          fontSize,
          fontWeight,
          textAlign,
          letterSpacing,
          textColor,
          className
        )}
        {...rest}
      >
        {children}
      </Comp>
    );
  }
);

Text.displayName = 'Text';

export { Text };
