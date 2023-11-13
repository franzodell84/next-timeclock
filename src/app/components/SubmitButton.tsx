"use client";

import { FaSpinner } from "react-icons/fa";
//import { isLoading } from "@/store/flags";

const initialState = {
  message: null,
};

const SubmitButton = ({
  text,
  pendingText,
}: {
  text: string;
  pendingText: string;
}) => {
  //  const formLoading = isLoading();
  //  const pending = !formLoading;
  const pending = false;

  //console.log(pending);

  return (
    <button
      className="btn btn-primary w-40"
      aria-disabled={pending}
      disabled={pending}
    >
      {!pending ? (
        ""
      ) : (
        <div className="animate-spin">
          <FaSpinner />
        </div>
      )}{" "}
      {!pending ? text : pendingText}
    </button>
  );
};

export default SubmitButton;
