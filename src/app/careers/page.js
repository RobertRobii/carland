"use client";

import CareerForm from "../components/CareerForm";
import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";
import Loading from "../components/Loading";

import { useState, useEffect } from "react";

const Career = () => {
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
      className={`max-w-[1920px] ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } mx-auto relative overflow-hidden`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <SecondaryHeader
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <section
            className={`${
              isDarkMode ? "bg-stone-900" : "bg-white"
            } transition-all duration-300`}
          >
            <CareerForm isDarkMode={isDarkMode} />
            <Copyright isDarkMode={isDarkMode} />
          </section>
        </>
      )}
    </main>
  );
};

export default Career;
