import TestimonialSlider from "./TestimonialSlider";

const Testimonial = ({ isDarkMode }) => {
  return (
    <section className="section flex items-center" id="testimonial">
      <div className="container mx-auto">
        <TestimonialSlider isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default Testimonial;
