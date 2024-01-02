"use client";

import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { Link } from "react-scroll";

import { BiMenuAltRight, BiX } from "react-icons/bi";
import { DarkModeSwitch } from "react-toggle-dark-mode";

import { SearchContext } from "../context/search";
import SearchMobile from "./SearchMobile";

const Header = ({ isDarkMode, toggleDarkMode }) => {
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
          ? isDarkMode
            ? "bg-neutral-900 text-white shadow-md py-2"
            : "bg-white shadow-md py-2"
          : isDarkMode
          ? "bg-neutral-900 text-white shadow-none py-4"
          : "bg-transparent shadow-none py-4"
      } fixed w-full max-w-[1920px] mx-auto z-20 transition-all duration-300`}
    >
      <div className="xl:container mx-auto flex flex-col xl:flex-row xl:items-center xl:justify-between">
        <div className="flex justify-between items-center px-4">
          {/* Logo */}
          <Link to="home" smooth={true} spy={true} className="cursor-pointer">
            {isDarkMode ? (
              <Image
                src={"/icons/logo.svg"}
                width={194}
                height={64}
                alt={"logo"}
              />
            ) : (
              <Image
                src={"/icons/logo.svg"}
                width={194}
                height={64}
                alt={"logo"}
              />
            )}
          </Link>
          {/* nav open menu */}
          <div
            onClick={() => setNav(!nav)}
            className="cursor-pointer xl:hidden"
          >
            {nav ? (
              <BiX className="text-4xl" />
            ) : (
              <BiMenuAltRight className="text-4xl" />
            )}
          </div>
        </div>
        {/* nav */}
        <nav
          className={`${
            nav ? "max-h-max py-8 px-4 xl:py-0 xl:px-0" : "max-h-0 xl:max-h-max"
          } flex flex-col w-full ${
            isDarkMode ? "bg-neutral-900 text-white" : "bg-white text-black"
          } gap-y-6 overflow-hidden font-bold xl:font-medium xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150 text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case items-center`}
        >
          <Link
            className="cursor-pointer"
            to="home"
            activeClass="active"
            smooth={true}
            spy={true}
          >
            Home
          </Link>
          <Link
            className="cursor-pointer"
            to="cars"
            activeClass="active"
            smooth={true}
            spy={true}
          >
            Cars
          </Link>
          <Link
            className="cursor-pointer"
            to="about"
            activeClass="active"
            smooth={true}
            spy={true}
          >
            About
          </Link>
          <Link
            className="cursor-pointer"
            to="why"
            activeClass="active"
            smooth={true}
            spy={true}
          >
            Why us
          </Link>
          <Link
            className="cursor-pointer"
            to="testimonial"
            activeClass="active"
            smooth={true}
            spy={true}
          >
            Testimonials
          </Link>
          <Link
            className="cursor-pointer"
            to="contact"
            activeClass="active"
            smooth={true}
            spy={true}
          >
            Contact
          </Link>
          {session ? (
            <a href="/account" className="cursor-pointer">
              My Account
            </a>
          ) : null}
          <DarkModeSwitch
            checked={isDarkMode}
            onChange={toggleDarkMode}
            size={25}
            sunColor="#ed1d24"
            moonColor="#ed1d24"
          />
          <Link
            className={`xl:hidden btn ${
              isDarkMode ? "btn-accent" : "btn-primary"
            }  btn-sm max-w-[164px] mx-auto`}
            to="/"
            activeClass="active"
            smooth={true}
            spy={true}
          >
            See all cars
          </Link>
          <SearchMobile isDarkMode={isDarkMode} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
