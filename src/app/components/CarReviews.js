import TestimonialSlider from "./TestimonialSlider";

const CarReviews = ({ isDarkMode }) => {
  return (
    <section className="flex items-center mb-10" id="testimonial">
      <div className="container mx-auto">
        <TestimonialSlider isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default CarReviews;
