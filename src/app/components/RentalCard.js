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

  // Refetch the rentals after a cancellation
  const refetchRentals = async () => {
    const res = await fetch("/api/getRentals");
    try {
      if (res.ok) {
        const data = await res.json();
        const userRentals = data.rentals.filter(
          (rental) => rental.email === userEmail
        );
        setRentalData({ rentals: userRentals });
      }
    } catch (error) {
      console.error("Error refetching rentals:", error);
    }
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
              "Your cancellation has been confirmed! Please let us know why you chose to cancel your rental.",
          }),
        });

        const data = await response.json();
        console.log("Data sent successfully");
        toast.success(
          "Rental cancelled successfully! You'll receive a confirmation email shortly.",
          { duration: 5000 }
        );

        // Call the refetchRentals function to update the rental list after cancellation
        refetchRentals();
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
                        <FaInfoCircle className="text-accent text-3xl" />
                        <h2 className="text-xl font-semibold ml-4">
                          Cancel rental
                        </h2>
                      </div>
                      <p>Are you sure you want to cancel this rental?</p>
                      <div className="flex justify-between mt-6">
                        <button
                          onClick={() => handleCancelRental(rental._id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                        >
                          Cancel Rental
                        </button>
                        <button
                          onClick={() => setIsCancelModalOpen(false)}
                          className="border border-accent text-accent px-6 py-2 rounded-lg"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No rentals found</p>
        )}
      </div>

      <Toaster />
    </div>
  );
};

export default RentalCard;
