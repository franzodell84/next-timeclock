"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";
//import { isLoading } from "@/store/flags";

type UsersProps = {
  data?: User | null;
};

//const formLoading = isLoading();

const UserForm = ({ data }: UsersProps) => {
  const [userId, setUserId] = useState(data ? data?.id : "");
  const [userName, setUserName] = useState(data ? data?.name : "");
  const [password, setPassword] = useState(
    data != null ? (data?.userPassword !== null ? "password_on_file" : "") : ""
  );
  const [email, setEmail] = useState(data ? data?.email : "");
  const [admin, setAdmin] = useState(data ? data?.admin : false);
  const [disabled, setDisabled] = useState(data ? data?.disabled : false);

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log("Saving");
      console.log(userId);
      //formLoading.setLoadTrue();
      if (userId == null || userId == "" || userId == "undefined") {
        setUserId("");
      }

      //console.log(formLoading);
      console.log(
        JSON.stringify({
          userId,
          userName,
          password,
          email,
          admin,
          disabled,
        })
      );
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          userName,
          password,
          email,
          admin,
          disabled,
        }),
      })
        .then((response) => {
          //console.log(response);

          setUserId("");
          setUserName("");
          setPassword("");
          setEmail("");
          setAdmin(false);
          setDisabled(false);

          router.refresh();
          router.push("/users");
        })
        .catch((err) => console.error("Error: " + err));

      console.log(response);

      //formLoading.setLoadFalse();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        {data && <input type="hidden" name="id" defaultValue={data?.id} />}

        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="user">Name:</label>
          <input
            className="input-sm input-bordered w-full max-w-xs"
            type="text"
            id="userName"
            autoComplete="true"
            value={userName}
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
            value={password}
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
            value={email ? email : ""}
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="form-control w-full max-w-xs">
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              checked={admin}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(event) => setAdmin(event.target.checked)}
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Admin
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="checked-checkbox"
              type="checkbox"
              checked={disabled}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              onChange={(event) => setDisabled(event.target.checked)}
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Inactive
            </label>
          </div>
        </div>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="flex flex-row gap-3 justify-center items-center mt-5">
          <SubmitButton text={"Save"} pendingText={"Saving..."} />
          {data && (
            <BackButton text={"Back"} pendingText={""} backToMain={false} />
          )}
        </div>
      </form>
    </main>
  );
};

export default UserForm;
