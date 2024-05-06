"use client";

import { useState, useEffect } from "react";

import Loading from "../components/Loading";
import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";

import { cars } from "/data/carsData.js";
import { FaStar } from "react-icons/fa";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Cars = () => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const savedDarkMode = isLocalStorageAvailable
    ? localStorage.getItem("darkMode")
    : null;
  const initialDarkMode = savedDarkMode ? savedDarkMode === "true" : false;

  const [loading, setLoading] = useState(true);
  const [isDarkMode, setDarkMode] = useState(initialDarkMode);

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

  const router = useRouter();

  const handleCarDetails = (carName) => {
    router.push(`/cars/${carName}`);
  };

  return (
    <main
      className={`max-w-[1920px] min-h-screen ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } mx-auto`}
    >
      {loading ? (
        <Loading />
      ) : (
        <section
          className={`${
            isDarkMode ? "bg-stone-900" : "bg-white"
          } transition-all duration-300 min-h-screen`}
        >
          <SecondaryHeader
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <div className="container mx-auto h-full pt-20 xl:pt-10">
            <div className="text-center xl:w-full xl:text-left mt-16">
              <h1
                className={`h2 flex justify-center xl:justify-start ${
                  isDarkMode ? "text-white" : ""
                }`}
              >
                Our cars
              </h1>
              <div className="flex justify-center flex-wrap gap-x-10 gap-y-10 py-10">
                {cars.map((car, index) => {
                  return (
                    <div
                      key={index}
                      className="max-w-[385px] mx-auto sm:mx-0 p-4 rounded-lg hover:shadow-xl"
                    >
                      <div className="h-[270px]">
                        <Image
                          src={car.image}
                          width={380}
                          height={284}
                          alt="car-image"
                        />
                      </div>

                      <div className="flex justify-between">
                        <div>
                          <div className="text-[13px] text-secondary uppercase">
                            {car.type}
                          </div>
                          <h3
                            className={`text-lg uppercase font-bold ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {car.name}
                          </h3>
                          <div className="mb-10 font-semibold ">
                            <p className="text-accent uppercase">
                              {car.price}€/day
                            </p>

                            <p className="text-secondary">
                              Available now:{" "}
                              <span className="uppercase">
                                {car.available ? "Yes" : "No"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex jusity-between items-center h-max">
                          <h3
                            className={`text-lg font-bold mr-2 ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {car.star}
                          </h3>
                          <FaStar className="text-accent text-lg" />
                        </div>
                      </div>
                      <div className="flex gap-x-3 xl:gap-x-4 w-max mb-10">
                        {car.info.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="flex flex-col items-center"
                            >
                              <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                                <Image
                                  src={item.icon}
                                  width={24}
                                  height={24}
                                  alt="icon"
                                />
                              </div>
                              <div
                                className={`text-[12px] uppercase ${
                                  isDarkMode ? "text-white" : "text-black"
                                } `}
                              >
                                {item.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <button
                        onClick={() => handleCarDetails(car.name)}
                        className="btn btn-accent btn-lg"
                      >
                        See details
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Copyright isDarkMode={isDarkMode} />
        </section>
      )}
    </main>
  );
};

export default Cars;
