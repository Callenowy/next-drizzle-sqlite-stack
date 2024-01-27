import { z } from 'zod';

import {
  digit,
  lowercaseLetter,
  maxLength,
  minLength,
  specialCharacter,
  uppercaseLetter,
} from './password.policy';

export const passwordSchema = z
  .string()
  .min(minLength, `Password must be at least ${minLength} characters long.`)
  .max(maxLength, `Password must be no more than ${maxLength} characters long`)
  .superRefine((val, ctx) => {
    if (!lowercaseLetter.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Password must contain at least one lowercase letter`,
      });
    }
    if (!uppercaseLetter.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Password must contain at least one uppercase letter`,
      });
    }
    if (!specialCharacter.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Password must contain at least one special character`,
      });
    }
    if (!digit.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Password must contain at least one digit`,
      });
    }
    return val;
  });

export type PasswordSchema = z.infer<typeof passwordSchema>;
