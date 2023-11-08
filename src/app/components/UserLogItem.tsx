import Link from "next/link";
import { UserLogs } from "@prisma/client";
import { FaPencilAlt } from "react-icons/fa";
// import ExpenseDeleteButton from './ExpenseDeleteButton';
import UserLogItemType from "./UserLogItemType";
import { timestampToTime } from "@/lib/utils";
import { timestampToDate } from "@/lib/utils";

interface UserLogProps {
  userlog: UserLogs;
  userName: String;
}

const UserLogItem = ({ userlog, userName }: UserLogProps) => {
  return (
    <div className="flex justify-between items-center p-2 w-full">
      <div className="flex flex-row w-2/12 justify-right items-right">
        {userName}
      </div>
      <div className="flex flex-row w-1/12 justify-center items-center">
        <UserLogItemType inout={userlog.inout} />
      </div>
      <div className="flex flex-row w-1/12 justify-right items-right">
        {timestampToTime(userlog.timestamp)}
      </div>
      <div className="flex flex-row w-1/12 justify-right items-right">
        {timestampToDate(userlog.timestamp)}
      </div>
      <div className="flex flex-row w-5/12 justify-right items-right">
        {userlog.notes}
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
