import React from "react";
import SubmitForm from "../components/submit-form";
import EditForm from "./components/edit-form";

type Props = {};

export default function DetailExpense({}: Props) {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="card mt-20 bg-neutral/30 h-fit">
        <EditForm />
      </div>
    </div>
  );
}
