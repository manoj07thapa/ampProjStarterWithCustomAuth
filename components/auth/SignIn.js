import React, { useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginSchema } from "../../validation/auth/loginSchema";

function SignIn() {
  const router = useRouter();

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = async (values, actions) => {
    console.log("Values", values);
    const { email, password } = values;
    try {
      const user = await Auth.signIn({
        username: email,
        password,
      });
      router.push("/");
    } catch (error) {
      console.log("error signing up:", error);
    }
  };
  return (
    <div className="mt-7 max-w-md mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
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
            <label htmlFor="password w-full">
              <span className="block text-lg font-semibold text-gray-500 mb-2">
                Password
              </span>
              <Field
                name="password"
                type="password"
                id="password"
                className={`${
                  errors.password
                    ? "ring-1 ring-red-500 placeholder-gray-300 w-full  border-red-500 rounded-md shadow  focus:outline-none"
                    : "rounded-md placeholder-gray-300 w-full  focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                }`}
              />

              <div className="text-red-500 text-xs mt-1">
                {errors.password && errors.password}
              </div>
            </label>
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/auth/forgotPassword">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot your password?
                  </a>
                </Link>
              </div>
            </div>

            <div className="mt-4  text-right ">
              <button
                type="submit"
                className="uppercase tracking-wider focus:outline-none px-4 py-2 bg-indigo-600 hover:bg-gray-700 text-medium text-white rounded-md w-full"
              >
                SignIn
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignIn;
