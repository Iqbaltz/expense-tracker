import React from "react";
import SubmitForm from "./components/submit-form";

type Props = {};

export default function ExpensePage({}: Props) {
  return (
    <div className="flex justify-center min-h-screen">
      <div className="shadow mt-4 h-fit card">
        <SubmitForm />
      </div>
    </div>
  );
}
