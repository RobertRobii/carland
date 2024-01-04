"use client";

import { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import SecondaryHeader from "../components/SecondaryHeader";
import Loading from "../components/Loading";

const Register = () => {
  // Verificăm dacă localStorage este disponibil în mediul actual (în browser)
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  // Verificăm dacă există o valoare salvată în localStorage pentru modul întunecat
  const savedDarkMode = isLocalStorageAvailable
    ? localStorage.getItem("darkMode")
    : null;
  const initialDarkMode = savedDarkMode ? savedDarkMode === "true" : false;

  const [isDarkMode, setDarkMode] = useState(initialDarkMode);
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    // Salvăm starea în localStorage ca string
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
