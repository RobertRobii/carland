"use client";

import { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import SecondaryHeader from "../components/SecondaryHeader";
import Loading from "../components/Loading";

const Register = () => {
  const [isDarkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
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
            className={`h-screen ${isDarkMode ? "bg-stone-900" : "bg-white"}`}
          >
            <RegisterForm isDarkMode={isDarkMode} />
          </section>
        </>
      )}
    </main>
  );
};

export default Register;
