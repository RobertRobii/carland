"use client";

import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import Image from "next/image";
const CareerForm = () => {
  return (
    <section className="h-screen bg-white">
      <div className="container mx-auto h-full pt-20 xl:pt-10">
        <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-start h-full">
          <div className="text-center xl:max-w-xl xl:text-left mt-16 xl:mt-0">
            <motion.h1
              variants={fadeIn("up", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.6 }}
              className="h1 uppercase"
            >
              Careers
            </motion.h1>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.8 }}
              className="description max-w-[550px] mx-auto xl:mx-0 mb-6 xl:mb-10"
            >
              We're always looking for talented individuals to join our team. If
              you think you'd be a good fit, please fill out this form and we
              will get back to you shortly.
            </motion.p>
            <motion.p
              variants={fadeIn("up", 0.4)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.8 }}
              className="description max-w-[550px] mx-auto xl:mx-0 mb-6 xl:mb-10"
            >
              Type your details and send us your CV.
            </motion.p>
            <motion.form
              variants={fadeIn("up", 0.6)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.8 }}
              className="flex flex-col justify-center items-center xl:items-start"
            >
              <input
                type="text"
                placeholder="First Name"
                className="outline-none bg-white h-14 w-[300px] xl:w-[400px] border rounded-lg pl-4 focus:border-accent"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="outline-none bg-white mt-6 h-14 w-[300px] xl:w-[400px] border rounded-lg pl-4 focus:border-accent"
                required
              />
              <input
                type="email"
                placeholder="email@example.com"
                className="outline-none bg-white mt-6 h-14 w-[300px] xl:w-[400px] border rounded-lg pl-4 focus:border-accent"
                required
              />
              <input
                type="file"
                accept="application/pdf"
                className="outline-none bg-white mt-6 w-[300px] xl:w-[400px] border rounded-lg focus:border-accent cursor-pointer "
                aria-describedby="file_input_help"
                id="file_input"
              />
              <p className="text-secondary mt-1 pl-4" id="file_input_help">
                Only PDF
              </p>
              <button className="btn btn-sm btn-accent w-28 mt-6">
                Submit
              </button>
            </motion.form>
          </div>
          <motion.div
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.8 }}
            className="ml-auto"
          >
            <Image
              src={"/images/careers/career.jpg"}
              width={450}
              height={350}
              alt="career"
              className="hidden xl:block drop-shadow-xl rounded-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CareerForm;
