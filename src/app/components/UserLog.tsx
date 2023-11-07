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
/*
const UserLogItemType = ({ inout }: { inout: string }) => {
const UserLog = () => {
*/
const UserLog = ({ users }: UsersProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleTitleChange = () => {
    //setTitle(event.target.value);
  };

  const handleContentChange = () => {
    //setContent(event.target.value);
  };

  const handleSubmit = async () => {
    // event.preventDefault();

    try {
      await fetch("/api/add-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      router.refresh();
    } catch (error) {
      console.error(error);
    }

    setTitle("");
    setContent("");
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="user">Name:</label>
          <select
            className="select-sm select-bordered w-full max-w-xs"
            name="user"
            id="user"
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
            required
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label htmlFor="inout">In/Out:</label>
          <select
            className="select-sm select-bordered w-full max-w-xs"
            name="inout"
            id="inout"
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
          <textarea className="textarea-sm" id="notes" />
        </div>
        <button type="submit" className="btn btn-primary w-full ">
          Submit
        </button>
      </form>
    </main>
  );
};

export default UserLog;
