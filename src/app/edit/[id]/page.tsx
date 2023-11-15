import Link from "next/link";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import UserForm from "./../../components/UserForm";

const EditUserPage = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findFirst({
    where: { id: params.id },
  });

  return (
    <main>
      <div className="flex w-full">
        <div className="grid flex-grow card place-items-left w-5/12 p-5"></div>
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-4/12 p-5">
          <h3>Update User</h3>
          <UserForm data={user} />
        </div>
        <div className="grid flex-grow card place-items-left w-5/12 p-5"></div>
      </div>
    </main>
  );
};

export default EditUserPage;
