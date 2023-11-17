"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import SubmitButton from "./SubmitButton";
import Dialog from "./Dialog";

//import { isLoading } from "@/store/flags";

type UsersProps = {
  users: User[];
};

//const formLoading = isLoading();

const UserLog = ({ users }: UsersProps) => {
  const [logUser, setUser] = useState("");
  const [logPassword, setPassword] = useState("");
  const [logInOut, setInOut] = useState("");
  const [logNotes, setNotes] = useState("");
  const [isLoading, setLoading] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(
        JSON.stringify({
          logUser,
          logPassword,
          logInOut,
          logNotes,
        })
      );

      await fetch("/api/add-log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          logUser,
          logPassword,
          logInOut,
          logNotes,
        }),
      })
        .then((response) => {
          console.log(response.status);

          if (response.status == 401) {
            router.push("/?showDialog=y");
            router.refresh();
          } else {
            setUser("");
            setPassword("");
            setInOut("");
            setNotes("");

            router.refresh();
            router.push("/");
          }
        })
        .catch((err) => console.error("Error: " + err));

      //formLoading.setLoadFalse();
    } catch (error) {
      console.error(error);
    }
  };

  async function onClose() {
    console.log("Modal has closed");

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/");
    }
  }

  async function onOk() {
    console.log("Ok was clicked");

    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/");
    }
  }

  return (
    <main>
      <Dialog title="Log Error" onClose={onClose} onOk={onOk}>
        <p>User Email / Password is incorrect.</p>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="user">Name:</label>
          <select
            className="select-sm select-bordered w-full max-w-xs"
            name="user"
            id="user"
            value={logUser}
            onChange={(e) => setUser(e.target.value)}
            required
          >
            <option value="">...</option>
            {users &&
              users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="password">Password:</label>
          <input
            className="input-sm input-bordered w-full max-w-xs"
            type="password"
            id="password"
            autoComplete="true"
            value={logPassword}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="inout">In/Out:</label>
          <select
            className="select-sm select-bordered w-full max-w-xs"
            name="inout"
            id="inout"
            value={logInOut}
            onChange={(e) => setInOut(e.target.value)}
            required
          >
            <option value="">...</option>
            <option value="break">break</option>
            <option value="in">in</option>
            <option value="lunch">lunch</option>
            <option value="out">out</option>
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="notes">Notes:</label>
          <textarea
            className="textarea-sm"
            name="notes"
            value={logNotes}
            placeholder=""
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <div className="flex flex-row gap-3 justify-center items-center mt-5">
          <SubmitButton text={"Submit"} pendingText={"Saving..."} />
        </div>
      </form>
    </main>
  );
};

export default UserLog;
