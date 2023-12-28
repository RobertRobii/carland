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

const CarDetails = ({ params }) => {
  const carname = params.carName[1];
  const decodedCarName = decodeURIComponent(carname);

  const [error, setError] = useState("");

  const selectedCar = cars.find((car) => car.name === decodedCarName);

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
            <h1 className="mt-16 h2 text-accent uppercase">Car Details</h1>
          </motion.div>
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
          >
            <Image
              src={selectedCar.image}
              width={380}
              height={284}
              alt="car image"
            />
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
            className="flex gap-x-3 xl:gap-x-4 w-max mb-10"
          >
            {selectedCar.info.map((item, index) => {
              return (
                <div key={index} className="flex flex-col items-center">
                  {/* <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                    <Image src={item.icon} width={24} height={24} alt="icon" />
                  </div> */}
                  <div className="text-[15px] uppercase bg-[#F5F5F5] rounded-lg px-3 py-1">
                    {item.text}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {selectedCar.available && (
            <>
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
            </>
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
          <h2 className="container mx-auto h2 mt-10 mb-10">Car Reviews</h2>
        </motion.div>
        <CarReviews />
        <Copyright />
      </section>
    </main>
  );
};

export default CarDetails;
