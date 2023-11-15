"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button className="" onClick={() => signOut()}>
      <span>Logout</span>
    </button>
  );
};

export default LogoutButton;
