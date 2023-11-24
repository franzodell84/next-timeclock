"use client";

import { FaSpinner } from "react-icons/fa";

const initialState = {
  message: null,
};

const SubmitButton = ({
  text,
  disabled,
}: {
  text: string;
  disabled: boolean;
}) => {
  //  const formLoading = isLoading();
  //  const pending = !formLoading;
  const pending = false;

  //console.log(pending);

  return (
    <button className="btn btn-primary w-40" aria-disabled={disabled}>
      {!disabled ? (
        ""
      ) : (
        <div className="animate-spin">
          <FaSpinner />
        </div>
      )}{" "}
      {!disabled ? text : text}
    </button>
  );
};

export default SubmitButton;
