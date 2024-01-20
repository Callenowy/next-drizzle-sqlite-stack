import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

import { Text, type TextProps } from './text';

type Level = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingLevelString = `${Level}`;
type HeadingTagType = `h${Level}`;

const headingVariants = cva('', {
  variants: {
    order: {
      h1: 'text-2xl',
      h2: 'text-xl',
      h3: 'text-lg',
      h4: 'text-md',
      h5: 'text-base',
      h6: 'text-base',
    },
  },
});

interface HeadingProps extends Omit<TextProps, 'asChild'> {
  level: HeadingLevelString;
  order?: HeadingLevelString;
}

export const Heading = ({
  children,
  level = '2',
  order,
  className,
  ...rest
}: HeadingProps) => {
  const Tag: HeadingTagType = `h${level}`;
  const orderStyles: HeadingTagType = `h${order || level}`;

  return (
    <Text
      className={cn(headingVariants({ order: orderStyles, className }))}
      weight="semibold"
      asChild
      {...rest}
    >
      <Tag>{children}</Tag>
    </Text>
  );
};
