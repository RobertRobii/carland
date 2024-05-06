"use client";

import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { motion } from "framer-motion";
import { fadeIn } from "/variants";

import { FaAngleDoubleLeft, FaUserCircle, FaQuoteLeft } from "react-icons/fa";

const TestimonialSlider = ({ isDarkMode }) => {
  const [reviewsData, setReviewsData] = useState({});

  useEffect(() => {
    const getReviwes = async () => {
      const res = await fetch("/api/getReviews");

      try {
        if (res.ok) {
          const data = await res.json();
          setReviewsData({ reviews: data });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getReviwes();
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
          {reviewsData.reviews &&
            shuffleArray(reviewsData.reviews.reviews).map((review, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="flex flex-col justify-center items-center text-center">
                    <FaQuoteLeft className="text-7xl text-accent mb-6" />
                    <div
                      className={`text-2xl max-w-[874px] mb-12 font-medium ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      {review.reviewMessage}
                    </div>
                    <div
                      className={`flex flex-col items-center text-lg font-medium ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      <FaUserCircle className="text-2xl mb-2 w-12 h-12 text-accent rounded-full object-cover" />
                      <p>@{review.fullname}</p>
                    </div>
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
