"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import Image from "next/image";
import { FaAngleDoubleLeft } from "react-icons/fa";

const testimonialData = [
  {
    message:
      "They truly exceeded my expectations and made my car rental experience a delight.",
    avatar: "/images/testimonial/profile-1.jpg",
    name: "Jane Doe",
    job: "Photographer & Videographer",
  },
  {
    message:
      "Best car rental experience! Friendly staff, clean and comfortable car. Will definitely return!",
    avatar: "/images/testimonial/profile-2.jpg",
    name: "Jane Doe",
    job: "Photographer & Videographer",
  },
  {
    message:
      "Impressed with their diverse car fleet and competitive prices. Satisfied with every aspect of their service!",
    avatar: "/images/testimonial/profile-3.jpg",
    name: "Jane Doe",
    job: "Photographer & Videographer",
  },
];

const TestimonialSlider = ({ isDarkMode }) => {
  return (
    <>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.6 }}
        className="flex items-center justify-center mb-10"
      >
        <FaAngleDoubleLeft className="text-accent mr-1" />
        <p className="font-semibold text-accent">
          Swipe Left to see more testimonials
        </p>
      </motion.div>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.6 }}
        className="caontainer mx-auto"
      >
        <Swiper
          pagination={{ clickable: true, dynamicBullets: true }}
          modules={[Pagination]}
          className="h-[450px] xl:h-[400px]"
        >
          {testimonialData.map((person, index) => {
            const { message, avatar, name, job } = person;
            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col justify-center items-center text-center">
                  <FaQuoteLeft className="text-7xl text-accent mb-6" />
                  <div
                    className={`text-2xl max-w-[874px] mb-12 font-medium ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {message}
                  </div>
                  <Image
                    src={avatar}
                    width={64}
                    height={64}
                    alt="avatar"
                    className="mb-4 rounded-full object-cover"
                  />
                  <div className="text-lg font-medium">{name}</div>
                  <div className="text-secondary">{job}</div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </motion.div>
    </>
  );
};

export default TestimonialSlider;
