import { object, string, number } from "yup";

export const userConfirmationSchema = object({
  email: string().email().required(),
  code: number().required(),
});
