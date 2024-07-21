"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import { useRouter } from "next/navigation";

const CarSlider = ({ isDarkMode }) => {
  const [topPicks, setTopPicks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getOurTopPicks = async () => {
      try {
        const response = await fetch("/api/getTopPicks");
        const data = await response.json();

        // Remove duplicates
        const uniqueCars = [];
        const carNames = new Set();

        data.topPicks.forEach((car) => {
          if (!carNames.has(car.car)) {
            carNames.add(car.car);
            uniqueCars.push(car);
          }
        });

        setTopPicks(uniqueCars);
      } catch (error) {
        console.error("Error fetching top picks:", error);
      }
    };

    getOurTopPicks();
  }, []);

  const handleCarDetails = (carName) => {
    router.push(`/cars/${carName}`);
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.2 }}
      className={`container mx-auto mb-[170px] lg:mb-0 ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } transition-all duration-300`}
    >
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 32 },
          1260: { slidesPerView: 3, spaceBetween: 32 },
        }}
      >
        {topPicks.slice(0, 4).map((car, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="max-w-[385px] mx-auto sm:mx-0 hover:shadow-xl p-4">
                <div className="h-[270px]">
                  <Image
                    src={car.carImage}
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
                      {car.car}
                    </h3>
                    <div className="mb-10 font-semibold ">
                      <p className="text-accent uppercase">
                        {car.pricePerDay}€/day
                      </p>
                      <p className="text-secondary">
                        Available in:{" "}
                        <span className="uppercase">{car.location}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center h-max">
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
                  {/* {car.info.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
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
                  ))} */}
                </div>
                <button
                  onClick={() => handleCarDetails(car.car)}
                  className="btn btn-accent btn-lg"
                >
                  See details
                </button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
};

export default CarSlider;
