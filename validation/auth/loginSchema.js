import { object, string, number } from "yup";

export const loginSchema = object({
  email: string().email().required(),
  password: string().required().min(8),
});
