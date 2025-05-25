import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import Link from "next/link";
import React from "react";

const SignInForm = () => {
  return (
    <form action="">
      <div className="flex flex-col gap-2 w-64">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="sunstrike@invoker.com"
            type="email"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" />
        </div>

        <Link href="/password-reset" className="text-sm underline">
          Forgot password?
        </Link>

        <SubmitButton>Login</SubmitButton>

        <div className="flex justify-between text-sm">
          <p>Dont have an account?</p>
          <Link className="text-sm underline" href="/auth/signup">
            Sign up here
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignInForm;
