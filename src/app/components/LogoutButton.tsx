"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      className=""
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: "/",
        })
      }
    >
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
