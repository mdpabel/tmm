import { compare, hash } from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (plainTextPassword: string) =>
  await hash(plainTextPassword, saltRounds);

export const compareHashedPassword = async (
  plainTextPassword: string,
  hashedPassword: string
) => await compare(plainTextPassword, hashedPassword);
