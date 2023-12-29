"use client";

import SecondaryHeader from "../components/SecondaryHeader";
import { cars } from "/data/carsData";
import { useState } from "react";
import Copyright from "../components/Copyright";
import LocationSelection from "../components/LocationSelection";
import DateSelection from "../components/DateSelection";
import HoursSelection from "../components/HoursSelection";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import CarReviews from "../components/CarReviews";
import CarDetailsCard from "../components/CarDetailsCard";
import { useMediaQuery } from "react-responsive";

const CarDetails = ({ params }) => {
  const carname = params.carName[1];
  const decodedCarName = decodeURIComponent(carname);

  const selectedCar = cars.find((car) => car.name === decodedCarName);

  const mobileMode = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const handleRentCar = () => {
    console.log("clicked");
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
          <CarDetailsCard
            decodedCarName={decodedCarName}
            mobileMode={mobileMode}
          />

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
