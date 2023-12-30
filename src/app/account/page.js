"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BiMenuAltRight, BiX } from "react-icons/bi";
import { SearchContext } from "../context/search";
import { FaAngleDoubleLeft } from "react-icons/fa";
import Copyright from "../components/Copyright";

const Account = () => {
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
    <main className="max-w-[1920px] bg-white mx-auto relative overflow-hidden">
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
              nav
                ? "max-h-max py-8 px-4 xl:py-0 xl:px-0"
                : "max-h-0 xl:max-h-max"
            } flex flex-col w-full bg-white gap-y-6 overflow-hidden font-bold xl:font-medium xl:flex-row xl:w-max xl:gap-x-8 xl:h-max xl:bg-transparent xl:pb-0 transition-all duration-150 text-center xl:text-left uppercase text-sm xl:text-[15px] xl:normal-case`}
          >
            <div className="flex items-center">
              <FaAngleDoubleLeft className="text-accent mr-1" />
              <Link href="/" className="text-accent">
                Back to Home
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <section className=" bg-white">
        <div className="container mx-auto h-full pt-20 xl:pt-10">
          <div className="text-center xl:w-full xl:text-left mt-16">
            <h1 className="h1">
              Hello <span className="text-accent">{session?.user?.name}!</span>
            </h1>
            <p className="text-secondary text-xl">Welcome to your account!</p>
            <button
              onClick={() => signOut()}
              className="btn btn-sm bg-accent w-28 mt-6 hover:bg-accent-hover mx-auto xl:mx-0"
            >
              Sign Out
            </button>
            <p className="text-secondary text-xl mt-14 mb-6">
              See your rental history:
            </p>
            <div className="flex flex-col xl:grid xl:grid-cols-2  w-full">
              <div className="flex flex-col w-[340px] xl:w-[550px] mb-6 rounded-lg border p-8">
                <div className="flex flex-col xl:flex-row xl:justify-between ">
                  <div className="flex flex-col items-center">
                    <Image
                      src={"/images/carSlider/bmw-3series.png"}
                      width={180}
                      height={84}
                      alt="car-image"
                    />
                    <p className="text-secondary">
                      <span className="font-semibold">Car: </span>BMW 3 Series
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-secondary">
                      <span className="font-semibold">Period: </span>24.12.2023
                      - 30.12.2023
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Hours: </span>12:00 -
                      12:00
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Price: </span>34€/day
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Total price: </span>238€
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[340px] xl:w-[550px] mb-6 rounded-lg border p-8">
                <div className="flex flex-col xl:flex-row xl:justify-between ">
                  <div className="flex flex-col items-center">
                    <Image
                      src={"/images/carSlider/golf-7.png"}
                      width={180}
                      height={84}
                      alt="car-image"
                    />
                    <p className="text-secondary">
                      <span className="font-semibold">Car: </span>BMW 3 Series
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-secondary">
                      <span className="font-semibold">Period: </span>24.12.2023
                      - 30.12.2023
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Hours: </span>12:00 -
                      12:00
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Price: </span>34€/day
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Total price: </span>238€
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[340px] xl:w-[550px] mb-6 rounded-lg border p-8">
                <div className="flex flex-col xl:flex-row xl:justify-between ">
                  <div className="flex flex-col items-center">
                    <Image
                      src={"/images/carSlider/vw-tiguan.png"}
                      width={180}
                      height={84}
                      alt="car-image"
                    />
                    <p className="text-secondary">
                      <span className="font-semibold">Car: </span>BMW 3 Series
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-secondary">
                      <span className="font-semibold">Period: </span>24.12.2023
                      - 30.12.2023
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Hours: </span>12:00 -
                      12:00
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Price: </span>34€/day
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Total price: </span>238€
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-[340px] xl:w-[550px] mb-6 rounded-lg border p-8">
                <div className="flex flex-col xl:flex-row xl:justify-between ">
                  <div className="flex flex-col items-center">
                    <Image
                      src={"/images/carSlider/audi-a6.png"}
                      width={180}
                      height={84}
                      alt="car-image"
                    />
                    <p className="text-secondary">
                      <span className="font-semibold">Car: </span>BMW 3 Series
                    </p>
                  </div>
                  <div className="flex flex-col justify-between">
                    <p className="text-secondary">
                      <span className="font-semibold">Period: </span>24.12.2023
                      - 30.12.2023
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Hours: </span>12:00 -
                      12:00
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Price: </span>34€/day
                    </p>
                    <p className="text-secondary">
                      <span className="font-semibold">Total price: </span>238€
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Copyright />
      </section>
    </main>
  );
};

export default Account;
