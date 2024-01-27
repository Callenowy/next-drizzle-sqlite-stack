import { z } from 'zod';

export const emailSchema = z
  .string()
  .min(1, { message: 'Email field has to be filled.' })
  .email('Please provide a valid email address.');

export type EmailSchema = z.infer<typeof emailSchema>;
