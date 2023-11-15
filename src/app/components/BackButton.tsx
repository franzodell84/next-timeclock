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
  backToMain,
}: {
  text: string;
  pendingText: string;
  backToMain: boolean | null;
}) => {
  //  const formLoading = isLoading();
  //  const pending = !formLoading;
  const router = useRouter();
  const pending = false;

  return (
    <button
      className="btn btn-secondary  w-40"
      aria-disabled={pending}
      disabled={pending}
      onClick={backToMain ? () => router.push("/") : () => router.back()}
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
