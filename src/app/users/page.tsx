import Link from "next/link";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import UserForm from "./../components/UserForm";
import UserItem from "./../components/UserItem";

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <div
      className="flex flex-col justify-start items-start divide-y 
    divide-dashed flex-1"
    >
      {users.map((userRow) => (
        <UserItem key={userRow.id} userRow={userRow} />
      ))}
    </div>
  );
};

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <main>
      <div className="flex w-full">
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-3/12 p-5 align-top">
          <h2 className="text-2l text-left font-bold">Create User</h2>
          <UserForm />
        </div>
        <div className="divider divider-horizontal"></div>
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-9/12 p-5 align-top">
          <h2 className="text-2l text-left font-bold">Users</h2>
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center p-2 w-full align-top">
              <div className="flex flex-row w-4/12 justify-right items-right">
                Name
              </div>
              <div className="flex flex-row w-3/12 justify-right items-right">
                Email
              </div>
              <div className="flex flex-row w-1/12 justify-right items-right">
                Admin
              </div>
              <div className="flex flex-row w-1/12 justify-right items-right">
                Inactive
              </div>
              <div className="flex flex-row w-3/12 justify-right items-right">
                &nbsp;
              </div>
            </div>
            {users.length > 0 ? <UsersList users={users} /> : "No Data"}
          </div>
        </div>
      </div>
    </main>
  );
}
