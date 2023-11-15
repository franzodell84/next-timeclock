import Link from "next/link";
import prisma from "@/lib/prisma";
import { UserLogs, User } from "@prisma/client";
import UserLog from "./components/UserLog";
import UserLogItem from "./components/UserLogItem";

type UserLogsWithName = {
  id: String;
  inout: String;
  notes: String;
  timestamp: Number;
  createdAt: Date;
  updatedAt: Date;
  logger: User;
  userId: String;
};

// UserLogs[], replaced w/ any since we're getting error on .logger var

const UserLogsList = ({ userlogs }: { userlogs: any[] }) => {
  return (
    <div
      className="flex flex-col justify-start items-start divide-y 
    divide-dashed flex-1"
    >
      {userlogs.map((userlog) => (
        //  <UserLogItem key={userlog.id} {...userlog} />
        <UserLogItem
          key={userlog.id}
          userlog={userlog}
          userName={userlog.logger?.name}
        />
      ))}
    </div>
  );
};

export default async function Home() {
  const currentDate = new Date();
  const users = await prisma.user.findMany();
  const userLogs = await prisma.userLogs.findMany({
    include: {
      logger: {
        select: { name: true },
      },
    },
  });

  return (
    <main>
      <div className="flex w-full">
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-3/12 p-5 align-top ">
          <span className="text-2l text-left font-bold h-5">
            Please sign in below
          </span>
          <UserLog users={users} />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-9/12 p-5 align-top">
          <h2 className="text-2l text-left font-bold">Logs for this week</h2>
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center p-2 w-full align-top">
              <div className="flex flex-row w-3/12 justify-center items-center font-bold gap-3">
                Name
              </div>
              <div className="flex flex-row w-1/12 justify-center items-center font-bold gap-3">
                In/Out
              </div>
              <div className="flex flex-row w-1/12 justify-center items-center font-bold gap-3">
                Time
              </div>
              <div className="flex flex-row w-1/12 justify-center items-center font-bold  gap-3">
                Date
              </div>
              <div className="flex flex-row w-4/12 justify-center items-center font-bold gap-3">
                Notes
              </div>
              <div className="flex items-center justify-center gap-2">
                &nbsp;
              </div>
            </div>
            {userLogs.length > 0 ? (
              <UserLogsList userlogs={userLogs} />
            ) : (
              <div className="text-center">No Data</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
