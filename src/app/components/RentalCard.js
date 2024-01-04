"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const RentalCard = ({ userEmail, isDarkMode }) => {
  const [rentalData, setRentalData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getRentals = async () => {
      const apiUrl = `/api/getRentals?userEmail=${userEmail}`;

      const res = await fetch(apiUrl);

      try {
        if (res.ok) {
          const data = await res.json();
          setRentalData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    getRentals();
  }, [userEmail]);

  return (
    <div>
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
          </div>
        ))}
    </div>
  );
};

export default RentalCard;
