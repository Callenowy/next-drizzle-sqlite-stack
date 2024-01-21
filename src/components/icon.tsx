import { forwardRef } from 'react';

import { cn } from '@/utils/cn';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  id: string;
  sprite?: string;
}

const Icon = forwardRef<SVGSVGElement, IconProps>(
  ({ className, id, sprite, ...props }, ref) => {
    return (
      <svg viewBox="0 0 64 48" className={cn(className)} ref={ref} {...props}>
        <use href={`${sprite}#${id}`} />
      </svg>
    );
  }
);

Icon.displayName = 'Icon';

export { Icon };
