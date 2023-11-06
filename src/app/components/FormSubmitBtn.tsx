"use client";

import { experimental_useFormStatus } from "react-dom";
import { FaSave, FaSpinner } from "react-icons/fa";

const FormSubmitBtn = ({
  text,
  pendingText,
}: {
  text: string;
  pendingText: string;
}) => {
  const { pending } = experimental_useFormStatus();

  return (
    <button aria-disabled={pending} disabled={pending}>
      {!pending ? (
        <FaSave />
      ) : (
        <div className="animate-spin">
          <FaSpinner />
        </div>
      )}{" "}
      {!pending ? text : pendingText}
    </button>
  );
};

export default FormSubmitBtn;
