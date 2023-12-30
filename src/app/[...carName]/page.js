"use client";

import SecondaryHeader from "../components/SecondaryHeader";
import { cars } from "/data/carsData";
import { useState } from "react";
import Copyright from "../components/Copyright";
import LocationSelection from "../components/LocationSelection";
import DateSelection from "../components/DateSelection";
import HoursSelection from "../components/HoursSelection";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";
import CarReviews from "../components/CarReviews";
import CarDetailsCard from "../components/CarDetailsCard";
import { useMediaQuery } from "react-responsive";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FaCircleInfo } from "react-icons/fa6";

const CarDetails = ({ params }) => {
  const carname = params.carName[1];
  const decodedCarName = decodeURIComponent(carname);

  const selectedCar = cars.find((car) => car.name === decodedCarName);

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const mobileMode = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const handleRentCar = (e) => {
    e.preventDefault();

    console.log("name:", fullname);
    console.log("email:", email);
    console.log("phone:", phone);
  };

  const handleLocation = (selectedLocation) => {
    console.log("location:", selectedLocation);
  };

  const handleDate = (selectedDate) => {
    console.log("startDate:", format(selectedDate[0].startDate, "dd/MM/yyyy"));
    console.log("endDate:", format(selectedDate[0].endDate, "dd/MM/yyyy"));
  };

  const handleHours = (selectedHours) => {
    console.log("hours:", selectedHours + " - " + selectedHours);
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
                      <LocationSelection onhandleLocation={handleLocation} />
                      <DateSelection onhandleDate={handleDate} />
                      <HoursSelection onhandleHours={handleHours} />
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
                  <LocationSelection onhandleLocation={handleLocation} />
                  <DateSelection onhandleDate={handleDate} />
                  <HoursSelection onhandleHours={handleHours} />
                </motion.div>
              )}

              <form>
                <motion.div
                  className="flex flex-col"
                  variants={fadeIn("up", 0.8)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.8 }}
                >
                  <input
                    className="outline-none mt-4 bg-white h-14 border rounded-lg pl-4 focus:border-accent xl:w-[300px]"
                    type="text"
                    placeholder="Full name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                  />
                  <input
                    className="outline-none mt-4 bg-white h-14 border rounded-lg pl-4 focus:border-accent xl:w-[300px]"
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <PhoneInput
                    className="outline-none mt-4 bg-white h-14 border rounded-lg pl-4 focus:border-accent xl:w-[300px]"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={setPhone}
                    required
                  />
                  <div className="flex justity-center xl:justify-start items-center mt-2">
                    <FaCircleInfo className="text-accent text-xl" />
                    <p className="ml-2 text-secondary">
                      It will help us if you'll choose your country!
                    </p>
                  </div>
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
              </form>
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
