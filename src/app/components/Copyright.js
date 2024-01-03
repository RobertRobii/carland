import React from "react";

const Copyright = ({ isDarkMode }) => {
  return (
    <div
      className={`text-center py-10 border-t text-sm ${
        isDarkMode ? "text-white" : "text-black"
      } transition-all duration-300`}
    >
      &copy; Carland 2024. All rights reserved.
    </div>
  );
};

export default Copyright;
