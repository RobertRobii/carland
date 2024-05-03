"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import { BsTrash3Fill } from "react-icons/bs";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const RentalCard = ({ isDarkMode, userEmail }) => {
  const [rentalData, setRentalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        toast.success("Rental cancelled successfull!");
      } else {
        console.error("Failed to cancel rental");
        toast.error("Failed to cancel rental!");
      }
    } catch (error) {
      console.error("Error cancelling rental:", error);
    }
  };

  return (
    <div className="flex flex-col xl:grid xl:grid-cols-2">
      {isLoading && (
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
      )}

      {!isLoading &&
        rentalData.rentals &&
        rentalData.rentals.map((rental) => (
          <div
            key={rental._id}
            className="flex flex-col w-[340px] xl:w-[550px] mb-6 rounded-lg border p-8 transition-all duration-300"
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
                  {rental.pickUpTime} -{rental.returnTime}
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
                <p className="text-secondary text-lg">
                  Ai finalizat calatoria aceasta masina!
                </p>
              ) : (
                <>
                  <BsTrash3Fill className="text-accent mr-2 text-xl" />
                  <p
                    onClick={() => handleCancelRental(rental._id)}
                    className="text-secondary text-lg hover:text-accent cursor-pointer hover:underline"
                  >
                    Anuleaza rezervarea
                  </p>
                </>
              )}
            </div>
          </div>
        ))}
      <Toaster />
    </div>
  );
};

export default RentalCard;
