import React from "react";
import { Formik, Field, Form } from "formik";
import { Auth } from "aws-amplify";
import { useRouter } from "next/router";
import { signUpSchema } from "../../validation/auth/signUpSchema";

function SignUpForm() {
  const router = useRouter();
  const initialValues = {
    fullname: "",
    email: "",
    password: "",
    phoneNumber: 977,
  };

  const onSubmit = async (values, actions) => {
    console.log("Actions", actions);
    const { email, password, phoneNumber, fullname } = values;
    try {
      const { user } = await Auth.signUp({
        username: email,
        password,
        attributes: {
          name: fullname,
          phone_number: phoneNumber, // optional - E.164 number convention
          // other custom attributes
        },
      });
      router.push("/auth/confirmUser");
      console.log(user);
    } catch (error) {
      console.log("error signing up:", error);
      if (error) {
        actions.setFieldError(error.response.data.params.path, error); //toDO: backend validation
      }
    }
  };
  return (
    <div className="mt-7 max-w-md mx-auto">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={signUpSchema}
      >
        {({ errors, isSubmitting, values }) => (
          <Form>
            <label htmlFor="fullname w-full">
              <span className="block text-lg font-semibold text-gray-500 mb-2">
                Full Name
              </span>
              <Field
                name="fullname"
                type="text"
                id="fullname"
                className={`${
                  errors.fullname
                    ? "ring-1 ring-red-500 placeholder-gray-300 w-full  border-red-500 rounded-md shadow  focus:outline-none"
                    : "rounded-md placeholder-gray-300 w-full  focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                }`}
              />
              <div className="text-red-500 text-xs mt-1">
                {errors.fullname && errors.fullname}
              </div>
            </label>
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
            <label htmlFor="phoneNumber w-full">
              <span className="block text-lg font-semibold text-gray-500 mb-2">
                Phone Number
              </span>
              <Field
                name="phoneNumber"
                id="phoneNumber"
                type="tel"
                className={`${
                  errors.phoneNumber
                    ? "ring-1 ring-red-500 placeholder-gray-300 w-full  border-red-500 rounded-md shadow  focus:outline-none"
                    : "rounded-md placeholder-gray-300 w-full  focus:outline-none focus:border-purple-500 focus:ring-purple-500"
                }`}
              />
              <div className="text-red-500 text-xs mt-1">
                {errors.phoneNumber && errors.phoneNumber}
              </div>
            </label>

            <div className="mt-2  text-right ">
              <button
                type="submit"
                className="uppercase tracking-wider focus:outline-none px-4 py-2 bg-gray-900 hover:bg-gray-700 text-medium text-white rounded-md w-full"
              >
                SignUp
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SignUpForm;
