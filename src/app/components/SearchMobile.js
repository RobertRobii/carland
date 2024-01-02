"use client";

import { useState } from "react";

import DateSelection from "./DateSelection";
import HoursSelection from "./HoursSelection";
import LocationSelection from "./LocationSelection";

const SearchMobile = ({ isDarkMode }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedHours, setSelectedHours] = useState(null);

  const handleLocation = (location) => {
    setSelectedLocation(location);
  };

  const handleDate = (date) => {
    setSelectedDate(date);
  };

  const handleHours = (hours) => {
    setSelectedHours(hours);
  };

  return (
    <div className="xl:hidden font-medium">
      <div className="container mx-auto">
        <div className="flex flex-col gap-y-4">
          <LocationSelection
            isDarkMode={isDarkMode}
            onhandleLocation={handleLocation}
          />
          <DateSelection isDarkMode={isDarkMode} onhandleDate={handleDate} />
          <HoursSelection isDarkMode={isDarkMode} onhandleHours={handleHours} />
          <div className="flex items-center px-6">
            <button className="btn btn-sm btn-accent w-[164px] mx-auto">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMobile;
