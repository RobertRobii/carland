"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";
import RentalCard from "../components/RentalCard";

const Account = () => {
  const { data: session } = useSession();

  return (
    <main className="max-w-[1920px] bg-white mx-auto relative overflow-hidden">
      <section className=" bg-white">
        <SecondaryHeader />
        <div className="container mx-auto h-full pt-20 xl:pt-10">
          <div className="text-center xl:w-full xl:text-left mt-16">
            <h1 className="h1">
              Hello <span className="text-accent">{session?.user?.name}!</span>
            </h1>
            <p className="text-secondary text-xl">Welcome to your account!</p>
            <button
              onClick={() => signOut()}
              className="btn btn-sm bg-accent w-28 mt-6 hover:bg-accent-hover mx-auto xl:mx-0"
            >
              Sign Out
            </button>
            <p className="text-secondary text-xl mt-14 mb-6">
              See your rental history:
            </p>
            <div className="flex flex-col xl:grid xl:grid-cols-2">
              <RentalCard userEmail={session?.user?.email} />
            </div>
          </div>
        </div>
        <Copyright />
      </section>
    </main>
  );
};

export default Account;
