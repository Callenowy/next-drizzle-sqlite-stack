import Link from 'next/link';
import Image from 'next/image';

import type { UrlObject } from 'url';

type Url = string | UrlObject;

type BrandProps = {
  href?: Url;
  alias: string;
};

export const Brand = ({ alias, href = '/' }: BrandProps) => (
  <Link href={href}>
    <Image
      src="/developer-logo.svg"
      alt="An image representing the The Stack App logo"
      aria-hidden="true"
      width={72}
      height={32}
      priority
    />
    <span className="sr-only">{alias}</span>
  </Link>
);
