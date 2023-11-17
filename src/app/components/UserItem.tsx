"use client";

import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { User } from "@prisma/client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const UserItem = ({ userRow }: { userRow: User }) => {
  const [deleteId, deleteRow] = useState("");

  const router = useRouter();

  const deleteUserRecord = async () => {
    try {
      const response = await fetch(`/api/delete-user/${deleteId}`, {
        method: "DELETE",
      });

      router.refresh();
    } catch (error) {
      console.error("Error deleting data :", error);
    }
  };

  useEffect(() => {
    if (deleteId != "") {
      if (window.confirm("Are you sure you want to delete this user?"))
        deleteUserRecord();
    }
  }, [deleteId]);

  return (
    <div className="flex justify-between items-center p-2 w-full">
      <div className="flex flex-row w-4/12 justify-right items-right">
        {userRow.name}
      </div>
      <div className="flex flex-row w-3/12 justify-right items-right">
        {userRow.email}
      </div>
      <div className="flex flex-row w-1/12 justify-right items-right">
        {userRow.admin ? "Yes" : "No"}
      </div>
      <div className="flex flex-row w-1/12 justify-right items-right">
        {userRow.disabled ? "Yes" : "No"}
      </div>

      <div className="flex flex-row w-3/12 gap-3 justify-center items-center">
        <Link href={`/edit/${userRow.id}`}>
          <FaPencilAlt />
        </Link>

        <Link href="#" onClick={() => deleteRow(`${userRow.id}`)}>
          <FaTrashAlt />
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
