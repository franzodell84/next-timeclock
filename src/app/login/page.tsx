import Link from "next/link";
import { User } from "@prisma/client";
import prisma from "@/lib/prisma";
import AdminLogin from "././../components/AdminLogin";

const LoginUserPage = async ({ params }: { params: { id: string } }) => {
  const user = await prisma.user.findFirst({
    where: { id: params.id },
  });

  return (
    <main>
      <div className="flex w-full">
        <div className="grid flex-grow card place-items-left w-4/12 p-5"></div>
        <div className="grid flex-grow card bg-base-200 rounded-box place-items-left w-4/12 p-5">
          <h3>Admin Login</h3>
          <AdminLogin />
        </div>
        <div className="grid flex-grow card place-items-left w-4/12 p-5"></div>
      </div>
    </main>
  );
};

export default LoginUserPage;
