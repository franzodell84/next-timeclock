import Image from "next/image";
import Link from "next/link";
import { UserLogs } from "@prisma/client";
import prisma from "@/lib/prisma";
import UserLog from "./components/UserLog";
import UserLogItem from "./components/UserLogItem";
import { FaGripHorizontal } from "react-icons/fa";

const UserLogsList = ({ userlogs }: { userlogs: UserLogs[] }) => {
  return (
    <div
      className="flex flex-col justify-start items-start divide-y 
    divide-dashed flex-1"
    >
      {userlogs.map((userlog) => (
        <UserLogItem key={userlog.id} {...userlog} />
      ))}
    </div>
  );
};

export default async function Home() {
  const currentDate = new Date();
  const users = await prisma.user.findMany();
  const userLogs = await prisma.userLogs.findMany();

  return (
    <main>
      <div className="flex w-full py-3">
        <Link className="link" href="/users">
          Manage Users
        </Link>
      </div>
      <div className="flex w-full">
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-3/12 p-5">
          <h3>Please sign in below</h3>
          <UserLog users={users} />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-9/12 p-5 align-top">
          <h3>Logs for this week</h3>
          <div className="flex justify-between items-center p-2 w-full align-top">
            <div className="flex flex-row justify-center items-center gap-3">
              Name
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
              In/Out
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
              Time
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
              Date
            </div>
            <div className="flex flex-row justify-center items-center gap-3">
              Notes
            </div>
            <div className="flex items-center justify-center gap-2">&nbsp;</div>
          </div>
          {userLogs.length > 0 ? (
            <UserLogsList userlogs={userLogs} />
          ) : (
            "No Data"
          )}
        </div>
      </div>
    </main>
  );
}
