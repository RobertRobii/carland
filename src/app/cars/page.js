"use client";

import { useState, useEffect } from "react";

import Loading from "../components/Loading";
import Copyright from "../components/Copyright";
import SecondaryHeader from "../components/SecondaryHeader";

import { cars } from "/data/carsData.js";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Menu } from "@headlessui/react";

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

  const [open, setOpen] = useState(false);

  const carBrandsObject = {
    BMW: false,
    Audi: false,
    Mercedes: false,
  };

  const locationsObject = {
    "Brasov, Romania": false,
    "Frankfurt, Germany": false,
    "Madrid, Spain": false,
  };

  const [selectedBrands, setSelectedBrands] = useState(carBrandsObject);
  const [selectedLocations, setSelectedLocations] = useState(locationsObject);

  // Update the selected brands state
  const handleCheckboxChange = (item, setSelectedItems) => {
    setSelectedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  // Count the selected brands
  const selectedBrandsCount =
    Object.values(selectedBrands).filter(Boolean).length;
  // Count the selected locations
  const selectedLocationsCount =
    Object.values(selectedLocations).filter(Boolean).length;

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
                className={`h2 flex justify-center xl:justify-start lg:ml-4 ml-0 ${
                  isDarkMode ? "text-white" : ""
                }`}
              >
                Our cars
              </h1>

              <div className="flex justify-end mb-4 gap-x-4">
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button
                        onClick={() => setOpen(!open)}
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pr-3 py-2 text-sm font-semibold text-gray-900"
                      >
                        Location
                      </Menu.Button>
                    </div>
                    {open && (
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {Object.keys(selectedLocations).map((location) => (
                            <Menu.Item as="div" key={location}>
                              {({ active }) => (
                                <label
                                  className={`flex items-center gap-2 px-4 py-2 text-sm ${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                  onClick={(e) => e.stopPropagation()} // prevent menu from closing
                                >
                                  <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={selectedLocations[location]}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        location,
                                        setSelectedLocations
                                      )
                                    }
                                  />
                                  {location}
                                </label>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    )}
                  </Menu>

                  <p className="bg-gray-200 px-2 rounded-md">
                    {selectedLocationsCount}
                  </p>
                </div>

                <div className="inline-block h-[40px] w-0.5 self-stretch bg-gray-200"></div>

                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button
                        onClick={() => setOpen(!open)}
                        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white pr-3 py-2 text-sm font-semibold text-gray-900"
                      >
                        Car brand
                      </Menu.Button>
                    </div>
                    {open && (
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          {Object.keys(selectedBrands).map((brand) => (
                            <Menu.Item as="div" key={brand}>
                              {({ active }) => (
                                <label
                                  className={`flex items-center gap-2 px-4 py-2 text-sm ${
                                    active
                                      ? "bg-gray-100 text-gray-900"
                                      : "text-gray-700"
                                  }`}
                                  onClick={(e) => e.stopPropagation()} // prevent menu from closing
                                >
                                  <input
                                    type="checkbox"
                                    className="form-checkbox"
                                    checked={selectedBrands[brand]}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        brand,
                                        setSelectedBrands
                                      )
                                    }
                                  />
                                  {brand}
                                </label>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    )}
                  </Menu>
                  <p className="bg-gray-200 px-2 rounded-md">
                    {selectedBrandsCount}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-100 rounded-xl">
                <div className="flex flex-col lg:flex-row justify-start items-center py-6">
                  <p className="lg:border-r mb-4 lg:mb-0 border-gray-300 px-3">
                    Filters
                  </p>
                  <div className="flex flex-col lg:flex-row justify-start items-center gap-y-4 lg:gap-x-4 px-3">
                    <div className="rounded-full px-4 py-1 border bg-white flex justify-center items-center">
                      <p>Option 1</p>
                      <IoMdClose className="ms-3 rounded-full hover:bg-gray-200 cursor-pointer" />
                    </div>
                    <div className="rounded-full px-4 py-1 border bg-white flex justify-center items-center">
                      <p>Option 1</p>
                      <IoMdClose className="ms-3 rounded-full hover:bg-gray-200 cursor-pointer" />
                    </div>
                    <div className="rounded-full px-4 py-1 border bg-white flex justify-center items-center">
                      <p>Option 1</p>
                      <IoMdClose className="ms-3 rounded-full hover:bg-gray-200 cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>

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
                              Available in:{" "}
                              <span className="uppercase">
                                {car.availableCities.map((city, index) => (
                                  <span key={city}>
                                    {city}
                                    {index < car.availableCities.length - 1 &&
                                      ", "}
                                  </span>
                                ))}
                              </span>
                            </p>
                          </div>
                        </div>
                        {/* <div className="flex jusity-between items-center h-max">
                          <h3
                            className={`text-lg font-bold mr-2 ${
                              isDarkMode ? "text-white" : "text-black"
                            }`}
                          >
                            {car.star}
                          </h3>
                          <FaStar className="text-accent text-lg" />
                        </div> */}
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
