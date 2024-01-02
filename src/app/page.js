"use client";

import { useState } from "react";

import About from "./components/About";
import BackToTopBtn from "./components/BackToTopBtn";
import Cars from "./components/Cars";
import Cta from "./components/Cta";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonial from "./components/Testimonial";
import Why from "./components/Why";

export default function Home() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <main
      className={`max-w-[1920px] ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } mx-auto relative overflow-hidden transition-all duration-300`}
    >
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <Hero isDarkMode={isDarkMode} />
      <Cars isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Why isDarkMode={isDarkMode} />
      <Testimonial isDarkMode={isDarkMode} />
      <Cta isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
      <BackToTopBtn isDarkMode={isDarkMode} />
    </main>
  );
}
