import Link from "next/link";
import { UserLogs } from "@prisma/client";
import { FaPencilAlt } from "react-icons/fa";
// import ExpenseDeleteButton from './ExpenseDeleteButton';
import UserLogItemType from "./UserLogItemType";
import { timestampToTime } from "@/lib/utils";
import { timestampToDate } from "@/lib/utils";

interface UserLogProps {
  userlog: UserLogs;
}

const UserLogItem = ({
  id,
  fullname,
  inout,
  notes,
  timestamp,
  createdAt,
  updatedAt,
  userId,
}: UserLogs) => {
  return (
    <div className="flex justify-between items-center p-2 w-full">
      <div className="flex flex-row justify-right items-right gap-3">
        {fullname}
      </div>
      <div className="flex flex-row justify-center items-center gap-3">
        <UserLogItemType inout={inout} />
      </div>
      <div className="flex flex-row justify-right items-right gap-3">
        {timestampToTime(timestamp)}
      </div>
      <div className="flex flex-row justify-right items-right gap-3">
        {timestampToDate(timestamp)}
      </div>
      <div className="flex flex-row justify-right items-right gap-3">
        {notes}
      </div>
      {/* Actions Button */}
      <div className="flex items-center justify-center gap-2">
        {/* Edit button 
        <Link href={`/edit/${id}`}><FaPencilAlt />
        </Link>
    */}
      </div>
    </div>
  );
};

export default UserLogItem;
