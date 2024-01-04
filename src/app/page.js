"use client";

import { useState, useEffect } from "react";

import About from "./components/About";
import BackToTopBtn from "./components/BackToTopBtn";
import Cars from "./components/Cars";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";
import Why from "./components/Why";
import Loading from "./components/Loading";

export default function Home() {
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
      } mx-auto relative overflow-hidden transition-all duration-300`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <Hero isDarkMode={isDarkMode} />
          <Cars isDarkMode={isDarkMode} />
          <About isDarkMode={isDarkMode} />
          <Why isDarkMode={isDarkMode} />
          <Testimonial isDarkMode={isDarkMode} />
          <Footer isDarkMode={isDarkMode} />
          <BackToTopBtn isDarkMode={isDarkMode} />
        </>
      )}
    </main>
  );
}
