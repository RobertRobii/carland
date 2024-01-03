"use client";

import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import SecondaryHeader from "../components/SecondaryHeader";

const Register = () => {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <main
      className={`max-w-[1920px] ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } mx-auto relative overflow-hidden`}
    >
      <SecondaryHeader
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <section
        className={`h-screen ${isDarkMode ? "bg-stone-900" : "bg-white"}`}
      >
        <RegisterForm isDarkMode={isDarkMode} />
      </section>
    </main>
  );
};

export default Register;
