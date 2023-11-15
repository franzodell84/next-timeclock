import { SessionProvider } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { FaUserAlt } from "react-icons/fa";
import LogoutButton from "./LogoutButton";
//import LogoutButton from "./LogoutButton";

export const LoginStatus = async () => {
  const session = await getServerSession(authOptions);
  console.log("session:" + session);
  if (!session?.user) {
    //console.log("session:" + session?.user);
    return (
      <div>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    );
  }
  return (
    <div className="mt-2 p-4 border-2 border-teal-500 flex justify-between items-center">
      <div className="flex gap-4">Login Status</div>
      <LogoutButton />
    </div>
  );
};
