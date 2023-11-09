"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import SubmitButton from "./SubmitButton";
//import { isLoading } from "@/store/flags";

type UsersProps = {
  users: User[];
};

//const formLoading = isLoading();

const UserForm = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [admin, setAdmin] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      //formLoading.setLoadTrue();

      //console.log(formLoading);

      await fetch("/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
          email,
          admin,
          disabled,
        }),
      });

      router.refresh();

      setUserName("");
      setPassword("");
      setEmail("");
      setAdmin(false);
      setDisabled(false);

      //formLoading.setLoadFalse();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="user">Name:</label>
          <input
            className="input-sm input-bordered w-full max-w-xs"
            type="text"
            id="userName"
            autoComplete="true"
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="password">Password:</label>
          <input
            className="input-sm input-bordered w-full max-w-xs"
            type="password"
            id="password"
            autoComplete="true"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="email">Email:</label>
          <input
            className="input-sm input-bordered w-full max-w-xs"
            type="text"
            id="email"
            autoComplete="true"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Admin
            </label>
          </div>
          <div className="flex items-center">
            <input
              checked
              id="checked-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Inactive
            </label>
          </div>
        </div>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="flex flex-row gap-3 justify-center items-center mt-5">
          <SubmitButton text={"Save"} pendingText={"Saving..."} />
        </div>
      </form>
    </main>
  );
};

export default UserForm;
