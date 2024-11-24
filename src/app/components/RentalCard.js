"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import { BsTrash3Fill } from "react-icons/bs";
import { FaInfoCircle, FaPen } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const RentalCard = ({ isDarkMode, userEmail }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [rentalData, setRentalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  useEffect(() => {
    const getRentals = async () => {
      const res = await fetch("/api/getRentals");

      try {
        if (res.ok) {
          const data = await res.json();
          const userRentals = data.rentals.filter(
            (rental) => rental.email === userEmail
          );
          setRentalData({ rentals: userRentals });
          setIsLoading(false);

          console.log(userRentals);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getRentals();
  }, [userEmail]);

  const handleCancelRental = async (rentalId) => {
    try {
      console.log(rentalId);

      const res = await fetch("/api/cancelRental", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rentalId }),
      });

      if (res.ok) {
        const updatedRentals = rentalData.rentals.filter(
          (rental) => rental._id !== rentalId
        );
        setRentalData({ rentals: updatedRentals });

        const response = await fetch("/api/sendCancelRentalEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: session?.user?.name,
            email: session?.user?.email,
            message:
              "Your cancelation has been confirmed! Please let us know why you chose to cancel your rental.",
          }),
        });

        const data = await response.json();

        console.log("Data sent successfully");
        console.log("Email sent successfully");
        toast.success(
          "Rental cancelled successfull! You'll receive a confirmation email shortly.",
          { duration: 5000 }
        );
      } else {
        console.error("Failed to cancel rental");
        toast.error("Failed to cancel rental!", { duration: 5000 });
      }
    } catch (error) {
      console.error("Error cancelling rental:", error);
    }
  };

  const handleClickReview = (carName) => {
    router.push(`/cars/${carName}`);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center lg:flex-row lg:justify-between lg:flex-wrap lg:px-20 xl:px-0">
        {/* {isLoading && (
          <SkeletonTheme color={"#f4f4f4"} highlightColor={"#e0e0e0"}>
            <div className="w-[600px] flex justify-between p-4 rounded-lg border mb-10">
              <div>
                <Skeleton count={1} height={120} width={180} className="mb-3" />
                <Skeleton count={1} width={180} height={22} />
              </div>
              <div>
                <Skeleton count={5} height={22} width={250} className="mb-2" />
              </div>
            </div>
          </SkeletonTheme>
        )} */}

        {rentalData.rentals && rentalData.rentals.length > 0 ? (
          rentalData.rentals.map((rental) => (
            <div
              key={rental._id}
              className="flex flex-col w-[340px] xl:w-[550px] mb-6 rounded-lg border p-8 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="flex flex-col xl:flex-row xl:justify-between ">
                <div className="flex flex-col items-center">
                  <Image
                    src={rental.carImage}
                    width={180}
                    height={84}
                    alt="car-image"
                  />
                  <p className="text-secondary">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Car:{" "}
                    </span>
                    {rental.car}
                  </p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-secondary">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Location:{" "}
                    </span>
                    {rental.location}
                  </p>
                  <p className="text-secondary">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Period:{" "}
                    </span>
                    {format(new Date(rental.startDate), "dd.MM.yyyy")} -{" "}
                    {format(new Date(rental.endDate), "dd.MM.yyyy")}
                  </p>
                  <p className="text-secondary">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Hours:{" "}
                    </span>
                    {rental.pickUpTime} - {rental.returnTime}
                  </p>
                  <p className="text-secondary">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Price:{" "}
                    </span>
                    {rental.pricePerDay}€/day
                  </p>
                  <p className="text-secondary">
                    <span
                      className={`font-semibold ${
                        isDarkMode ? "text-white" : "text-black"
                      }`}
                    >
                      Total price:{" "}
                    </span>
                    {rental.totalPrice}€
                  </p>
                </div>
              </div>
              <div className="flex justify-center items-center pl-1 mt-6">
                {new Date(rental.endDate) < new Date() ? (
                  <div className="flex flex-col items-center">
                    <p className="text-secondary text-lg mb-6">
                      You have completed the journey with this car!
                    </p>
                    <div
                      onClick={() => handleClickReview(rental.car)}
                      className="flex items-center text-lg hover:bg-accent text-accent hover:text-white border border-accent px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                    >
                      <FaPen className="mr-2 text-xl" />
                      Write a review
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <p className="text-secondary text-lg mb-6">
                      You have not started the journey with this car!
                    </p>
                    <div
                      onClick={openCancelModal}
                      className="flex items-center text-lg hover:bg-accent text-accent hover:text-white border border-accent px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                    >
                      <BsTrash3Fill className="mr-2 text-xl" />
                      Cancel rental
                    </div>
                  </div>
                )}
              </div>

              <div>
                {isCancelModalOpen && (
                  <div
                    className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
                    onClick={() => setIsCancelModalOpen(false)}
                  >
                    <div
                      className="bg-white p-8 rounded-lg w-[300px] lg:w-[450px]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div className="flex justify-start items-center mb-4">
                        <FaInfoCircle className="text-accent text-xl mr-2" />
                        <h2 className="text-xl lg:text-2xl font-bold">
                          Rental Cancellation
                        </h2>
                      </div>

                      <p className="mb-6 text-xl">
                        Are you sure you want to cancel this rental?
                      </p>
                      <div className="flex flex-col lg:flex-row justify-between">
                        <button
                          className="bg-white text-accent py-2 px-4 rounded-lg mr-4 border border-accent hover:bg-accent hover:text-white transition-all duration-300 mb-4 lg:mb-0"
                          onClick={() => setIsCancelModalOpen(false)}
                        >
                          No, take me back!
                        </button>
                        <button
                          className="bg-green-500 text-white py-2 px-4 rounded-lg mr-4 border border-green-500 hover:bg-white hover:text-green-500 transition-all duration-300"
                          onClick={() => {
                            handleCancelRental(rental._id);
                            setIsCancelModalOpen(false);
                          }}
                        >
                          Yes, I'm sure!
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="h2 text-center text-accent mt-10">
            There are no rentals yet!
          </div>
        )}

        <Toaster />
      </div>
    </div>
  );
};

export default RentalCard;
