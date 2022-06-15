import React from "react";
import { Formik, Field, Form } from "formik";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { userConfirmationSchema } from "../../validation/auth/userConfirmationSchema";

function ConfirmUser() {
  const router = useRouter();

  const initialValues = {
    email: "",
    code: "",
  };

  const onSubmit = async (values, actions) => {
    console.log("Values", values);
    const { email, code } = values;
    const username = email;
    try {
      await Auth.confirmSignUp(username, code);

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
        validationSchema={userConfirmationSchema}
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

            <div className="mt-2  text-right ">
              <button
                type="submit"
                className="uppercase tracking-wider focus:outline-none px-4 py-2 bg-gray-900 hover:bg-gray-700 text-medium text-white rounded-md w-full"
              >
                ConfirmUser
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ConfirmUser;
