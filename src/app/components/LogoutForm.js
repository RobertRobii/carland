"use client";

import { signOut } from "next-auth/react";

const LogoutForm = () => {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="btn btn-sm bg-accent w-28 mt-6"
      >
        Sign Out
      </button>
    </div>
  );
};

export default LogoutForm;
