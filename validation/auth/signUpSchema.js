import { object, string, number } from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const signUpSchema = object({
  fullname: string().required().min(6).max(25),
  email: string().email().required(),
  password: string().required().min(8),
  phoneNumber: string(),
});
