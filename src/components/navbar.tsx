import { cn } from '@/utils/cn';

type ClassName = {
  root?: string | string[];
  nav?: string | string[];
};

interface NavbarProps {
  brand: React.ReactNode;
  classNames?: ClassName;
}

export const Navbar = ({
  brand,
  children,
  classNames,
}: React.PropsWithChildren<NavbarProps>) => (
  <header
    className={cn(
      'w-full bg-white px-6 py-5 shadow-sm md:px-36',
      classNames?.root
    )}
  >
    <nav
      className={cn(
        'mx-auto flex items-center justify-between',
        classNames?.nav
      )}
    >
      {brand}
      {children}
    </nav>
  </header>
);
