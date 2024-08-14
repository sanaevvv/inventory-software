import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import bcrypt from 'bcryptjs';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const saltAndHashPassword = async (
  password: string | unknown
): Promise<string> => {
  if (typeof password !== 'string') {
    throw new Error('Password must be a string');
  }
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};
