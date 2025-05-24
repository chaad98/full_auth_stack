"use client";

import React, { PropsWithChildren } from "react";
import { Button } from "./button";
import { useFormStatus } from "react-dom";

type Props = PropsWithChildren;

const SubmitButton = (props: Props) => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} className="w-full mt-5">
      {pending ? "Submitting..." : props.children}
    </Button>
  );
};

export default SubmitButton;
