"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import { cars } from "/data/carsData.js";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import { useRouter } from "next/navigation";

const CarSlider = () => {
  const router = useRouter();

  const handleCarDetails = (carName) => {
    router.push(`/cars/${carName}`);
  };

  return (
    <motion.div
      variants={fadeIn("up", 0.4)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.2 }}
      className="container mx-auto"
    >
      <Swiper
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 15 },
          640: { slidesPerView: 2, spaceBetween: 32 },
          1260: { slidesPerView: 3, spaceBetween: 32 },
        }}
      >
        {cars.map((car, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="max-w-[385px] mx-auto sm:mx-0">
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
                    <h3 className="text-lg uppercase font-bold">{car.name}</h3>
                    <div className="mb-10 font-semibold ">
                      <p className="text-accent uppercase">{car.price}€/day</p>

                      <p className="text-secondary">
                        Available now:{" "}
                        <span className="uppercase">
                          {car.available ? "Yes" : "No"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex jusity-between items-center h-max">
                    <h3 className="text-lg font-bold mr-2">{car.star}</h3>
                    <FaStar className="text-accent text-lg" />
                  </div>
                </div>
                <div className="flex gap-x-3 xl:gap-x-4 w-max mb-10">
                  {car.info.map((item, index) => {
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center mb-2">
                          <Image
                            src={item.icon}
                            width={24}
                            height={24}
                            alt="icon"
                          />
                        </div>
                        <div className="text-[12px] uppercase">{item.text}</div>
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
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
};

export default CarSlider;
