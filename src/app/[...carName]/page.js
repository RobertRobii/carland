"use client";

import Image from "next/image";
import SecondaryHeader from "../components/SecondaryHeader";
import { cars } from "/data/carsData";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import Copyright from "../components/Copyright";
import LocationSelection from "../components/LocationSelection";
import DateSelection from "../components/DateSelection";
import HoursSelection from "../components/HoursSelection";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import CarReviews from "../components/CarReviews";
import { useMediaQuery } from "react-responsive";

const CarDetails = ({ params }) => {
  const carname = params.carName[1];
  const decodedCarName = decodeURIComponent(carname);

  const [error, setError] = useState("");

  const selectedCar = cars.find((car) => car.name === decodedCarName);

  const mobileMode = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const handleRentCar = () => {
    if (!selectedCar.available) {
      setError("This car is not available");
    }
  };

  return (
    <main className="max-w-[1920px] bg-white mx-auto relative overflow-hidden">
      <SecondaryHeader />
      <section className="bg-white">
        <div className="container mx-auto h-full pt-20">
          <motion.div
            variants={fadeIn("down", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
          >
            <h1 className="mt-16 h2 text-accent uppercase flex justify-center xl:justify-start">
              Car Details
            </h1>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="flex justify-between items-center"
          >
            <Image
              src={selectedCar.image}
              width={380}
              height={284}
              alt="car image"
            />
            {mobileMode ? null : (
              <Image
                src={selectedCar.logo}
                width={380}
                height={284}
                alt="car image"
                className="mr-[100px] sm:hidden md:block"
              />
            )}
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="flex justify-between w-[350px]"
          >
            <div>
              <div className="text-[13px] text-secondary uppercase">
                {selectedCar.type}
              </div>
              <h3 className="text-lg uppercase font-bold">
                {selectedCar.name}
              </h3>
              <div className="mb-1 text-accent font-semibold uppercase">
                {selectedCar.price}€/day
              </div>
              <p className="mb-3 text-secondary">
                Available now:{" "}
                <span className="uppercase font-bold">
                  {selectedCar.available ? "Yes" : "No"}
                </span>
              </p>
            </div>
            <div className="flex jusity-between items-center h-max">
              <h3 className="text-lg font-bold mr-2">{selectedCar.star}</h3>
              <FaStar className="text-accent text-lg" />
            </div>
          </motion.div>

          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
            className="grid grid-cols-2 gap-4 mb-8 xl:flex xl:flex-row"
          >
            {selectedCar.info.map((item, index) => {
              return (
                <div key={index}>
                  <div className="text-[15px] uppercase bg-[#F5F5F5] rounded-lg px-3 py-1">
                    {item.text}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {selectedCar.available && (
            <div>
              {mobileMode ? (
                <motion.div
                  variants={fadeIn("up", 0.8)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="xl:hidden font-medium"
                >
                  <div className="container mx-auto">
                    <div className="flex flex-col gap-y-4">
                      <LocationSelection />
                      <DateSelection />
                      <HoursSelection />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  variants={fadeIn("up", 0.8)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.6 }}
                  className="flex h-full bg-[#F5F5F5] rounded-lg py-3"
                >
                  <LocationSelection />
                  <DateSelection />
                  <HoursSelection />
                </motion.div>
              )}

              <motion.div
                variants={fadeIn("up", 0.8)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.8 }}
              >
                <button
                  onClick={handleRentCar}
                  className="btn btn-sm btn-accent xl:w-[134px] hover:bg-accent-hover mt-6"
                >
                  Rent
                </button>
              </motion.div>
            </div>
          )}

          {error && (
            <p className="flex justify-center items-center w-[220px] bg-accent text-white rounded-lg mt-3 py-1 px-3">
              {error}
            </p>
          )}
        </div>
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.8 }}
        >
          <h2 className="container mx-auto flex justify-center xl:justify-start h2 mt-10 mb-10">
            Reviews for this car
          </h2>
        </motion.div>
        <CarReviews />
        <Copyright />
      </section>
    </main>
  );
};

export default CarDetails;
