import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateAuthToken = (payload: object): string => {
  return jwt.sign(JSON.stringify(payload), process.env.SECRET_KEY || "secret");
};

export const generateExpirationDate = (): Date => {
  // Expiration date is in 3 hours from the login date
  return new Date(Date.now() + (60 * 60 * 60 * 60));
};

export const getEncryptedPassword = async (password: string): Promise<string> => {
  return bcrypt.genSalt(parseInt(process.env.SALT || "15")).then(salt => {
    return bcrypt.hash(password, salt);
  });
};

export const isValidPassword = async (plainPassword: string, encryptedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, encryptedPassword);
};
