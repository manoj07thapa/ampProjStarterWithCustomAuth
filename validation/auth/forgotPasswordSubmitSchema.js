import { object, string, number } from "yup";

export const forgotPasswordSubmitSchema = object({
  email: string().email().required(),
  code: number().required(),
  newPassword: string().required().min(8),
});
