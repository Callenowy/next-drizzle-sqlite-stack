import Image from 'next/image';

export const Loader = () => (
  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform stroke-current text-blue-400">
    <Image
      src="/svg-sprites/loader.svg"
      alt="Loading..."
      width={80}
      height={80}
      priority
      className="h-20 w-20 animate-spin text-blue-50"
    />
  </div>
);
