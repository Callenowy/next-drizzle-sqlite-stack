export const origin = process.env.NEXT_PUBLIC_HOST;
export const protocol =
  process.env.NODE_ENV === 'production' ? 'https' : 'http';
export const host = `${protocol}://${origin}` as const;

export const siteName = 'The Stack' as const;
export const shortDescription =
  'A base implementation of nextjs, drizzle, sqlite stack' as const;
export const description =
  'A base implementation of nextjs, drizzle, sqlite with tailwind and auth' as const;
