"use client";

import { useState, useEffect } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { useMediaQuery } from "react-responsive";
import { cars } from "/data/carsData";
import { format } from "date-fns";
import { parse } from "date-fns";
import { differenceInDays } from "date-fns";

import { motion } from "framer-motion";
import { fadeIn } from "/variants";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import SecondaryHeader from "../components/SecondaryHeader";
import Copyright from "../components/Copyright";
import LocationSelection from "../components/LocationSelection";
import DateSelection from "../components/DateSelection";
import HoursSelection from "../components/HoursSelection";
import CarReviews from "../components/CarReviews";
import ReviewForm from "../components/ReviewForm";
import CarDetailsCard from "../components/CarDetailsCard";
import Loading from "../components/Loading";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import Image from "next/image";

const CarDetails = ({ params }) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;

  const savedDarkMode = isLocalStorageAvailable
    ? localStorage.getItem("darkMode")
    : null;
  const initialDarkMode = savedDarkMode ? savedDarkMode === "true" : false;

  const [isDarkMode, setDarkMode] = useState(initialDarkMode);
  const [loading, setLoading] = useState(true);

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);

    if (isLocalStorageAvailable) {
      localStorage.setItem("darkMode", checked ? "true" : "false");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const carname = params.carName[1];
  const decodedCarName = decodeURIComponent(carname);

  const selectedCar = cars.find((car) => car.name === decodedCarName);

  if (!selectedCar) {
    return <div>Car not found</div>;
  }

  const mobileMode = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleHours = (hours) => {
    setSelectedHours(hours);
  };

  const handleRentCar = async (e) => {
    e.preventDefault();

    if (!selectedLocation) {
      setErrorMessage("Please select a location");
      return;
    } else if (!selectedDate) {
      setErrorMessage("Please select a date");
      return;
    } else if (!selectedHours) {
      setErrorMessage("Please select the hours");
      return;
    }

    let daysDifference, adjustedDaysDifference;

    if (selectedDate) {
      const startDate = selectedDate[0].startDate;
      const endDate = selectedDate[0].endDate;

      daysDifference = differenceInDays(endDate, startDate);
      adjustedDaysDifference = daysDifference === 0 ? 1 : daysDifference;
      // console.log("Rental days:", adjustedDaysDifference);
    }

    try {
      const res = await fetch("/api/rental", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          phone,
          location: selectedLocation,
          car: decodedCarName,
          carImage: selectedCar.image,
          startDate: format(selectedDate[0].startDate, "yyyy-MM-dd"),
          endDate: format(selectedDate[0].endDate, "yyyy-MM-dd"),
          pickUpTime: selectedHours,
          returnTime: selectedHours,
          pricePerDay: selectedCar.price,
          totalPrice: adjustedDaysDifference * selectedCar.price,
          totalRentals: 1,
        }),
      });

      console.log("res:", res);

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();

      console.log("data:", data);

      // if (data.success) {
      //   const emailTemplate = `
      //       <html>
      //         <body>
      //           <h3>Here are the details of your rental:</h3>
      //           <div style="width: 400px; display: flex; justify-content: space-between; margin-bottom: 20px; text-align: center;">
      //             <div style="width: 100px; margin-right: auto; background-color: #FF6969; border: 2px solid #FF0000; font-weight: bold; padding: 10px; border-radius: 10px;">Car: ${
      //               selectedCar.name
      //             }</div>
      //             <div style="width: 100px; background-color: #FF6969; border: 2px solid #FF0000; font-weight: bold; padding: 10px; border-radius: 10px;">Location: ${selectedLocation}</div>
      //           </div>
      //           <div style="width: 400px; display: flex; justify-content: space-between; margin-bottom: 20px; text-align: center;">
      //             <div style="width: 100px; margin-right: auto; background-color: #FF6969; border: 2px solid #FF0000; font-weight: bold; padding: 10px; border-radius: 10px;">Pick up time: ${format(
      //               selectedDate[0].startDate,
      //               "dd.MM.yyyy"
      //             )} at ${selectedHours}</div>
      //           <div style="width: 100px; background-color: #FF6969; border: 2px solid #FF0000; font-weight: bold; padding: 10px; border-radius: 10px;">Return time: ${format(
      //             selectedDate[0].endDate,
      //             "dd.MM.yyyy"
      //           )} at ${selectedHours}</div>
      //           </div>
      //           <div style="width: 400px; display: flex; justify-content: space-between; margin-bottom: 20px; text-align: center;">
      //             <div style="width: 100px; margin-right: auto; background-color: #FF6969; border: 2px solid #FF0000; font-weight: bold; padding: 10px; border-radius: 10px;">Price per day: ${
      //               selectedCar.price
      //             }€</div>
      //           <div style="width: 100px; background-color: #FF6969; border: 2px solid #FF0000; font-weight: bold; padding: 10px; border-radius: 10px;">Total price: ${
      //             adjustedDaysDifference * selectedCar.price
      //           }€</div>
      //           </div>
      //           <h5>Thank you for choosing us!</h5>
      //         </body>
      //       </html>
      //       `;

      //   await fetch("/api/sendEmail", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: fullname,
      //       email: email,
      //       message: emailTemplate,
      //     }),
      //   });

      //   console.log("Email sent successfully");
      //   toast.success(
      //     "Rental confirmed. A confirmation mail has been sent to you!",
      //     { duration: 5000 }
      //   );
      //   setFullname("");
      //   setEmail("");
      //   setPhone("");
      //   setSelectedLocation(null);
      //   setSelectedDate(null);
      //   setSelectedHours(null);
      //   setErrorMessage("");
      //   // router.push("/");
      // } else {
      //   console.error(
      //     "Error while sending data!",
      //     "data message:",
      //     data.message
      //   );
      //   toast.error(data.message || "Failed to rent car. Please try again.", {
      //     duration: 5000,
      //   });
      // }
    } catch (error) {
      console.log("Error while sending data:", error);
      toast.error("Failed to rent car. Please try again.", { duration: 5000 });
    }
  };

  return (
    <main
      className={`max-w-[1920px] ${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } mx-auto relative overflow-hidden`}
    >
      {loading ? (
        <Loading />
      ) : (
        <>
          <SecondaryHeader
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
          <section
            className={`${
              isDarkMode ? "bg-stone-900" : "bg-white"
            } transition-all duration-300`}
          >
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
                isDarkMode={isDarkMode}
              />

              {/* {selectedCar.available && ( */}
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

                {errorMessage && (
                  <p className="flex justify-center items-center w-[300px] bg-accent text-white rounded-lg mt-3 py-1 px-3">
                    {errorMessage}
                  </p>
                )}

                <form onSubmit={handleRentCar}>
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
                      <p className="ml-2 text-secondary text-center lg:text-left">
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
                    <button className="btn btn-sm btn-accent w-[120px] xl:w-[134px] hover:bg-accent-hover mt-6">
                      Rent
                    </button>
                  </motion.div>
                </form>
              </div>
              {/* )} */}
            </div>
            {/* <motion.div
              variants={fadeIn("up", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.8 }}
            >
              <h2
                className={`container mx-auto flex justify-center xl:justify-start h2 mt-10 mb-10 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Reviews section
              </h2>
            </motion.div>
            <CarReviews isDarkMode={isDarkMode} /> */}
            <motion.div
              variants={fadeIn("up", 0.8)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.8 }}
            >
              <ReviewForm isDarkMode={isDarkMode} />
            </motion.div>
            <Copyright />
            <Toaster />
          </section>
        </>
      )}
    </main>
  );
};

export default CarDetails;
