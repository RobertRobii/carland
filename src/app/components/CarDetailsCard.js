"use client";

import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { cars } from "/data/carsData";

const CarDetailsCard = ({ decodedCarName, mobileMode, isDarkMode }) => {
  const selectedCar = cars.find((car) => car.name === decodedCarName);

  return (
    <div>
      <div className="flex justify-between items-center">
        <motion.div
          variants={fadeIn("right", 0.4)}
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
        {mobileMode ? null : (
          <motion.div
            variants={fadeIn("left", 0.4)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.6 }}
          >
            <Image
              src={selectedCar.logo}
              width={380}
              height={284}
              alt="car image"
              className="mr-[100px] sm:hidden md:block drop-shadow-2xl"
            />
          </motion.div>
        )}
      </div>

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
          <h3
            className={`text-lg uppercase font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            {selectedCar.name}
          </h3>
          <div className="mb-1 text-accent font-semibold uppercase">
            {selectedCar.price}€/day
          </div>
          <p
            className={`mb-3 text-secondary ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Available in:{" "}
            <span className="uppercase">
              {selectedCar.availableCities.map((city, index) => (
                <span key={city}>
                  {city}
                  {index < selectedCar.availableCities.length - 1 && ", "}
                </span>
              ))}
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
    </div>
  );
};

export default CarDetailsCard;
