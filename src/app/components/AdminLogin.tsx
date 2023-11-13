"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import BackButton from "./BackButton";
//import { isLoading } from "@/store/flags";

//const formLoading = isLoading();

const AdminLogin = () => {
  const [logUserName, setUserName] = useState("");
  const [logPassword, setPassword] = useState("");
  const [isLoading, setLoading] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(logUserName);
      console.log(logPassword);

      //formLoading.setLoadTrue();

      //console.log(formLoading);

      await fetch("/api/add-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logUserName,
          logPassword,
        }),
      });

      router.refresh();

      setUserName("");
      setPassword("");

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
            id="user"
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

        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="flex flex-row gap-3 justify-center items-center mt-5">
          <SubmitButton text={"Submit"} pendingText={"Saving..."} />
          <BackButton text={"Back"} pendingText={""} />
        </div>
      </form>
    </main>
  );
};

export default AdminLogin;
