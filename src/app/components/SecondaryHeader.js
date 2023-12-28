"use client";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { SearchContext } from "../context/search";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useSession } from "next-auth/react";

const SecondaryHeader = () => {
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
        header ? "bg-white shadow-md py-2" : "bg-transparent shadow-none py-4"
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
          } flex flex-col w-full bg-white gap-y-6 overflow-hidden font-bold xl:font-medium xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150 text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case`}
        >
          <div className="flex items-center">
            <FaAngleDoubleLeft className="text-accent mr-1" />
            <Link href="/" className="text-accent">
              Back to Home
            </Link>
            {session ? (
              <>
                <a href="/account" className="cursor-pointer text-accent ml-6">
                  My Account
                </a>
                <FaAngleDoubleRight className="text-accent ml-1" />
              </>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default SecondaryHeader;
