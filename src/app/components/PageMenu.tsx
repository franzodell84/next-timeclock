import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import Link from "next/link";
import { LoginStatus } from "./LoginStatus";

export const PageMenu = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flex flex-row flex-nowrap p-2">
      <div>
        <ul className="flex flex-row gap-4">
          <li className="px-4 py-2 bg-gray-600 rounded-md text-white">
            <Link className="link no-underline" href="/">
              Timeclock
            </Link>
          </li>
          {session?.user && (
            <li className="px-4 py-2 bg-gray-600 rounded-md text-white">
              <Link className="link no-underline" href="/users">
                Manage Users
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="flex md:flex md:flex-grow flex-row-reverse space-x-1">
        <ul className="flex flex-row gap-4">
          <li className="px-4 py-2 bg-gray-600 rounded-md text-white">
            <LoginStatus />
          </li>
        </ul>
      </div>
    </div>
  );
};
