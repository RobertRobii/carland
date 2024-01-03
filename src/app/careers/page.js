"use client";

import CareerForm from "../components/CareerForm";
import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";

import { useState } from "react";

const Career = () => {
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

      <section className={`${isDarkMode ? "bg-stone-900" : "bg-white"}`}>
        <CareerForm isDarkMode={isDarkMode} />
        <Copyright isDarkMode={isDarkMode} />
      </section>
    </main>
  );
};

export default Career;
