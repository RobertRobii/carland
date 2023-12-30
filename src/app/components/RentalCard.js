"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";

const RentalCard = () => {
  const [rentalData, setRentalData] = useState({});

  useEffect(() => {
    const getRentals = async () => {
      const res = await fetch("/api/getRentals");

      try {
        if (res.ok) {
          const data = await res.json();
          setRentalData(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getRentals();
  }, []);

  return (
    <div>
      {rentalData.rentals &&
        rentalData.rentals.map((rental) => (
          <div
            key={rental._id}
            className="flex flex-col w-[340px] xl:w-[550px] mb-6 rounded-lg border p-8"
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
                  <span className="font-semibold">Car: </span>
                  {rental.car}
                </p>
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-secondary">
                  <span className="font-semibold">Location: </span>
                  {rental.location}
                </p>
                <p className="text-secondary">
                  <span className="font-semibold">Period: </span>
                  {format(new Date(rental.startDate), "dd.MM.yyyy")} -{" "}
                  {format(new Date(rental.endDate), "dd.MM.yyyy")}
                </p>
                <p className="text-secondary">
                  <span className="font-semibold">Hours: </span>
                  {rental.pickUpTime} -{rental.returnTime}
                </p>
                <p className="text-secondary">
                  <span className="font-semibold">Price: </span>
                  {rental.pricePerDay}€/day
                </p>
                <p className="text-secondary">
                  <span className="font-semibold">Total price: </span>
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
