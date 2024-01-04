"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";
import RentalCard from "../components/RentalCard";
import Loading from "../components/Loading";

const Account = () => {
  const { data: session } = useSession();

  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const savedDarkMode = isLocalStorageAvailable
    ? localStorage.getItem("darkMode")
    : null;
  const initialDarkMode = savedDarkMode ? savedDarkMode === "true" : false;

  const [isDarkMode, setDarkMode] = useState(initialDarkMode);
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);

    if (isLocalStorageAvailable) {
      localStorage.setItem("darkMode", checked ? "true" : "false");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <main
      className={`max-w-[1920px] h-screen ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } mx-auto relative`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <section
            className={`${
              isDarkMode ? "bg-stone-900" : "bg-white"
            } transition-all duration-300`}
          >
            <SecondaryHeader
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
            <div className="container mx-auto h-full pt-20 xl:pt-10">
              <div className="text-center xl:w-full xl:text-left mt-16">
                <h1
                  className={`h1 ${isDarkMode ? "text-white" : "text-black"}`}
                >
                  Hello{" "}
                  <span className="text-accent">{session?.user?.name}!</span>
                </h1>
                <p className="text-secondary text-xl">
                  Welcome to your account!
                </p>
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
                  <RentalCard
                    isDarkMode={isDarkMode}
                    userEmail={session?.user?.email}
                  />
                </div>
              </div>
            </div>
            <Copyright isDarkMode={isDarkMode} />
          </section>
        </>
      )}
    </main>
  );
};

export default Account;
