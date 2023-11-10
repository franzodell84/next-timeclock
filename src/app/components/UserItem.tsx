import Link from "next/link";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { User } from "@prisma/client";

const UserItem = ({ userRow }: { userRow: User }) => {
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

        <Link href={`users/delete/${userRow.id}`}>
          <FaTrashAlt />
        </Link>
      </div>
    </div>
  );
};

export default UserItem;
