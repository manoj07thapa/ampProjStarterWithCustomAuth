import { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { forgotPasswordSubmitSchema } from "../../validation/auth/forgotPasswordSubmitSchema";

function forgotPasswordSubmit() {
  const router = useRouter();

  useEffect(() => {
    async function onAppLoad() {
      const user = await Auth.currentAuthenticatedUser();
      console.log(user);
      if (user) {
        router.push("/");
      }
    }
    onAppLoad();
  }, []);

  const initialValues = {
    email: "",
    code: "",
    newPassword: "",
  };

  const onSubmit = async (values, actions) => {
    console.log("Values", values);
    const { email, code, newPassword } = values;
    const new_password = newPassword;
    const username = email;
    try {
      await Auth.forgotPasswordSubmit(username, code, new_password);

      router.push("/auth/signIn");
    } catch (error) {
      console.log("error ConfirmUserg up:", error);
    }
  };
  return (
    <div className="mt-7 max-w-md mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={forgotPasswordSubmitSchema}
      >
        {({ errors, isSubmitting, values }) => (
          <Form>
            <label htmlFor="email w-full">
              <span className="block text-lg font-semibold text-gray-500 mb-2">
                Email
              </span>
              <Field
                name="email"
                type="text"
                id="email"
                className={`${
                  errors.email
                    ? "ring-1 ring-red-500 placeholder-gray-300 w-full  border-red-500 rounded-md shadow  focus:outline-none"
                    : "rounded-md placeholder-gray-300 w-full  focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                }`}
              />
              <div className="text-red-500 text-xs mt-1">
                {errors.email && errors.email}
              </div>
            </label>
            <label htmlFor="code w-full">
              <span className="block text-lg font-semibold text-gray-500 mb-2">
                Verification Code
              </span>
              <Field
                name="code"
                type="text"
                id="code"
                className={`${
                  errors.code
                    ? "ring-1 ring-red-500 placeholder-gray-300 w-full  border-red-500 rounded-md shadow  focus:outline-none"
                    : "rounded-md placeholder-gray-300 w-full  focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                }`}
              />
              <div className="text-red-500 text-xs mt-1">
                {errors.code && errors.code}
              </div>
            </label>
            <label htmlFor="newPassword w-full">
              <span className="block text-lg font-semibold text-gray-500 mb-2">
                New Password
              </span>
              <Field
                name="newPassword"
                type="password"
                id="newPassword"
                className={`${
                  errors.newPassword
                    ? "ring-1 ring-red-500 placeholder-gray-300 w-full  border-red-500 rounded-md shadow  focus:outline-none"
                    : "rounded-md placeholder-gray-300 w-full  focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                }`}
              />
              <div className="text-red-500 text-xs mt-1">
                {errors.newPassword && errors.newPassword}
              </div>
            </label>

            <div className="mt-2  text-right ">
              <button
                type="submit"
                className="uppercase tracking-wider focus:outline-none px-4 py-2 bg-gray-900 hover:bg-gray-700 text-medium text-white rounded-md w-full"
              >
                Change Password
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default forgotPasswordSubmit;
