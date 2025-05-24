"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submitButton";
import { signUp } from "@/lib/auth";
import { error } from "console";
import React, { useActionState } from "react";

const SignUpForm = () => {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action}>
      <div className="flex flex-col gap-2">
        {state?.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Kael Invoker"></Input>
        </div>
        {state?.error?.name && (
          <p className="text-sm text-red-500">{state.error.name}</p>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="invoker@dota2.com"
          ></Input>
        </div>
        {state?.error?.email && (
          <p className="text-sm text-red-500">{state.error.name}</p>
        )}

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password"></Input>
        </div>
        {state?.error?.password && (
          <div className="text-sm text-red-500">
            <ul>
              {state.error.password.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          </div>
        )}
        <SubmitButton>Sign Up</SubmitButton>
      </div>
    </form>
  );
};

export default SignUpForm;
