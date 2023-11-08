"use client";

import Link from "next/link";
import prisma from "@/lib/prisma";

import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";

interface IfirstChildProps {
  onChangeSomeStates: Function;
}

type UsersProps = {
  users: User[];
};

const UserLog = ({ users }: UsersProps) => {
  const [logUser, setUser] = useState("");
  const [logUserName, setUserName] = useState("");
  const [logPassword, setPassword] = useState("");
  const [logInOut, setInOut] = useState("");
  const [logNotes, setNotes] = useState("");

  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      console.log(logUser);
      console.log(logPassword);
      console.log(logInOut);
      console.log(logNotes);

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
      });

      router.refresh();

      setUser("");
      setPassword("");
      setInOut("");
      setNotes("");
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
          <select
            className="select-sm select-bordered w-full max-w-xs"
            name="user"
            id="user"
            onChange={(event) => setUser(event.target.value)}
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
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="inout">In/Out:</label>
          <select
            className="select-sm select-bordered w-full max-w-xs"
            name="inout"
            id="inout"
            onChange={(event) => setInOut(event.target.value)}
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
            id="notes"
            onChange={(event) => setNotes(event.target.value)}
          />
        </div>
        <div className="form-control w-full max-w-xs">&nbsp;</div>
        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>
    </main>
  );
};

export default UserLog;
