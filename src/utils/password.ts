import bcrypt from "bcrypt"

const SALT_ROUNDS = 12

export const hashPassword = (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export const comparePassword = (plain: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(plain, hashed)
}