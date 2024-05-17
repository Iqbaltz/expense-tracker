import React from "react";
import SubmitForm from "./components/submit-form";

type Props = {};

export default function ExpensePage({}: Props) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="card mt-4 bg-neutral/30 h-fit">
        <SubmitForm />
      </div>
    </div>
  );
}
