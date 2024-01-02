import Brands from "./Brands";
import CarSlider from "./CarSlider";

const Cars = ({ isDarkMode }) => {
  return (
    <section
      className={`${
        isDarkMode ? "bg-stone-900" : "bg-white"
      } h-screen flex items-center transition-all duration-300`}
      id="cars"
    >
      <div className="container mx-auto">
        <Brands isDarkMode={isDarkMode} />
        <CarSlider isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default Cars;
