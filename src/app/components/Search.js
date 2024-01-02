"use client";

import { useContext } from "react";
import { SearchContext } from "../context/search";
import LocationSelection from "./LocationSelection";
import DateSelection from "./DateSelection";
import HoursSelection from "./HoursSelection";

const Search = ({ isDarkMode = true }) => {
  const { searchActive } = useContext(SearchContext);

  return (
    <div
      className={`${
        searchActive
          ? `${
              isDarkMode ? "bg-stone-900" : "bg-white"
            } rounded-none xl:h-[80px]`
          : `${
              isDarkMode ? "bg-stone-900" : "bg-white"
            } rounded-[20px] py-6 xl:pr-4 xl:h-[98px]`
      } hidden xl:block w-full relative shadow-lg transition-all duration-300`}
    >
      <div className={`flex h-full ${searchActive && "container mx-auto"}`}>
        <LocationSelection isDarkMode={isDarkMode} />
        <DateSelection isDarkMode={isDarkMode} />
        <HoursSelection isDarkMode={isDarkMode} />
        <div className="xl:h-full flex items-center px-6 xl:px-0">
          <button
            className={` ${
              searchActive
                ? "btn btn-sm btn-accent xl:w-[164px]"
                : "btn btn-lg btn-accent xl:w-[184px]"
            }`}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
