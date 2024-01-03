"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { SearchContext } from "../context/search";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useSession } from "next-auth/react";

const SecondaryHeader = ({ isDarkMode, toggleDarkMode }) => {
  const { data: session } = useSession();

  const { setSearchActive } = useContext(SearchContext);

  const [header, setHeader] = useState(false);
  const [nav, setNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setHeader(true);
      } else {
        setHeader(false);
      }

      if (window.scrollY > 800) {
        setSearchActive(true);
      } else {
        setSearchActive(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <header
      className={`${
        header
          ? `${isDarkMode ? "bg-neutral-900" : "bg-white"} shadow-md py-2`
          : "bg-transparent shadow-none py-4"
      } fixed w-full max-w-[1920px] mx-auto z-20 transition-all duration-300`}
    >
      <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <div className="flex justify-between items-center px-4">
          {/* Logo */}
          <Link href={"/"} className="cursor-pointer">
            <Image
              src={"/icons/logo.svg"}
              width={194}
              height={64}
              alt={"logo"}
              priority
            />
          </Link>
          {/* nav open menu */}
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer xl:hidden"
          >
            {nav ? (
              <BiX
                className={`text-4xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              />
            ) : (
              <BiMenuAltRight
                className={`text-4xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              />
            )}
          </div>
        </div>
        {/* nav */}
        <nav
          className={`${
            nav ? "max-h-max py-8 px-4 xl:py-0 xl:px-0" : "max-h-0 xl:max-h-max"
          } flex flex-col w-full ${
            isDarkMode ? "bg-neutral-900" : "bg-white"
          } gap-y-6 overflow-hidden font-bold xl:font-medium xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150 text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case`}
        >
          <div className="flex flex-col gap-y-3 xl:flex-row items-center transition-all duration-300">
            <div className="flex items-center">
              <FaAngleDoubleLeft className="text-accent mr-1" />
              <Link href="/" className="text-accent">
                Back to Home
              </Link>
            </div>

            <div className="flex items-center">
              <DarkModeSwitch
                className="xl:ml-5"
                checked={isDarkMode}
                onChange={toggleDarkMode}
                size={25}
                sunColor="#ed1d24"
                moonColor="#ed1d24"
              />
              <p className="xl:hidden ml-2">
                {isDarkMode ? "Dark" : "Light"} Mode
              </p>
            </div>
            {session && window.location.pathname !== "/account" ? (
              <div className="flex items-center">
                <a
                  href="/account"
                  className="cursor-pointer text-accent xl:ml-6"
                >
                  My Account
                </a>
                <FaAngleDoubleRight className="text-accent ml-1" />
              </div>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default SecondaryHeader;
