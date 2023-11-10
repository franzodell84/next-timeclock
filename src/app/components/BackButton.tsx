"use client";

import { FaSpinner } from "react-icons/fa";
import { useRouter } from "next/navigation";
//import { isLoading } from "@/store/flags";

const initialState = {
  message: null,
};

const BackButton = ({
  text,
  pendingText,
}: {
  text: string;
  pendingText: string;
}) => {
  //  const formLoading = isLoading();
  //  const pending = !formLoading;
  const router = useRouter();
  const pending = false;

  console.log(pending);

  return (
    <button
      className="btn btn-secondary  w-40"
      aria-disabled={pending}
      disabled={pending}
      onClick={() => router.back()}
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

export default BackButton;
