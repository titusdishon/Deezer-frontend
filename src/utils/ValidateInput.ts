import { VALIDEMAIL } from "./Constants";

export const validateEmail = (email: string) => {
  return VALIDEMAIL.test(email);
};