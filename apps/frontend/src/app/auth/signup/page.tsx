import Link from "next/link";
import React from "react";
import SignUpForm from "./signUpForm";

const SignUpPage = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-96 flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold mb-4">Sign Up Page</h1>

      <SignUpForm />
    </div>
  );
};

export default SignUpPage;
