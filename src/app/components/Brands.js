"use client";

import Image from "next/image";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";

const Brands = ({ isDarkMode }) => {
  return (
    <section className="xl:pt-16 xl:h-[200px] bg-blue-600 flex flex-col justify-center">
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.6 }}
        className="container mx-auto"
      >
        <div className="grid grid-cols-3 gap-6 place-items-center xl:flex xl:flex-wrap xl:gap-x-6 xl:justify-between mt-10">
          <div>
            <Image
              src={"icons/brands/mercedes.svg"}
              width={60}
              height={60}
              alt="mercedes-logo"
            />
          </div>
          <div>
            <Image
              src={"icons/brands/audi.svg"}
              width={85}
              height={50}
              alt="audi-logo"
            />
          </div>
          <div>
            <Image
              src={"icons/brands/bmw.svg"}
              width={60}
              height={60}
              alt="bmw-logo"
            />
          </div>
          <div>
            <Image
              src={"icons/brands/vw.svg"}
              width={60}
              height={60}
              alt="vw-logo"
            />
          </div>
          <div>
            <Image
              src={"icons/brands/skoda.svg"}
              width={60}
              height={60}
              alt="skoda-logo"
            />
          </div>
          <div>
            <Image
              src={"icons/brands/opel.svg"}
              width={70}
              height={80}
              alt="opel-logo"
            />
          </div>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("up", 0.4)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.6 }}
        className="flex items-center justify-center xl:justify-start mt-10"
      >
        <FaAngleDoubleLeft className="text-accent mr-1" />
        <p className="font-semibold text-accent">Swipe Left to see more cars</p>
      </motion.div>
    </section>
  );
};

export default Brands;
