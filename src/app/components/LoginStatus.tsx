import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Link from "next/link";
import LogoutButton from "./LogoutButton";

export const LoginStatus = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div>
        <Link className="link no-underline" href="/login">
          Admin Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      {session.user.email} &nbsp;|&nbsp;
      <LogoutButton />
    </div>
  );
};
