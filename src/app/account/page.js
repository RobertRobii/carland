"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";
import RentalCard from "../components/RentalCard";
import ReviewsHistory from "../components/ReviewsHistory";
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

  const [isRentalHistoryActive, setRentalHistoryActive] = useState(true);
  const [isReviewHistoryActive, setReviewHistoryActive] = useState(false);

  const handleRentalHistory = () => {
    setRentalHistoryActive(true);
    setReviewHistoryActive(false);
  };

  const handleReviewHistory = () => {
    setReviewHistoryActive(true);
    setRentalHistoryActive(false);
  };

  return (
    <main
      className={`max-w-[1920px] min-h-screen ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } mx-auto`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <section
            className={`${
              isDarkMode ? "bg-stone-900" : "bg-white"
            } transition-all duration-300 min-h-screen`}
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
                <div className="flex flex-col lg:flex-row justify-between max-h-[100px] max-w-[700px] my-10 mx-auto xl:mx-0 xl:max-w-[550px]">
                  {isRentalHistoryActive ? (
                    <button
                      onClick={handleRentalHistory}
                      className="mx-auto lg:mx-0 max-w-[200px] text-white bg-accent text-xl mt-0 mb-4 xl:mb-0 cursor-pointer border border-accent py-2 px-4 rounded-lg hover:bg-white hover:text-accent transition-all duration-300"
                    >
                      Rental history
                    </button>
                  ) : (
                    <button
                      onClick={handleRentalHistory}
                      className="mx-auto lg:mx-0 max-w-[200px] text-accent text-xl mt-0 mb-4 xl:mb-0 cursor-pointer border border-accent py-2 px-4 rounded-lg hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      Rental history
                    </button>
                  )}

                  {isReviewHistoryActive ? (
                    <p
                      onClick={handleReviewHistory}
                      className="mx-auto lg:mx-0 max-w-[200px] text-white bg-accent text-xl mt-0 mb-4 xl:mb-0 cursor-pointer border border-accent hover:border-accent py-2 px-4 rounded-lg hover:bg-white hover:text-accent transition-all duration-300"
                    >
                      Review history
                    </p>
                  ) : (
                    <p
                      onClick={handleReviewHistory}
                      className="mx-auto lg:mx-0 max-w-[200px] text-accent text-xl mt-0 mb-4 xl:mb-0 cursor-pointer border border-accent hover:border-accent py-2 px-4 rounded-lg hover:bg-accent hover:text-white transition-all duration-300"
                    >
                      Review history
                    </p>
                  )}
                </div>
                {isRentalHistoryActive ? (
                  <p className="mb-4">
                    Currently you are viewing rental history!
                  </p>
                ) : (
                  <p className="mb-4">
                    Currently you are viewing review history!
                  </p>
                )}
                <div>
                  {isReviewHistoryActive ? (
                    <ReviewsHistory
                      sDarkMode={isDarkMode}
                      userEmail={session?.user?.email}
                    />
                  ) : (
                    <RentalCard
                      isDarkMode={isDarkMode}
                      userEmail={session?.user?.email}
                    />
                  )}
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
