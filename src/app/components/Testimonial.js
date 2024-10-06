import TestimonialSlider from "./TestimonialSlider";
import { motion } from "framer-motion";
import { fadeIn } from "/variants";

const Testimonial = ({ isDarkMode }) => {
  return (
    <section className="section flex items-center" id="testimonial">
      <div className="container mx-auto">
        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.6 }}
        >
          <h1 className="h2 mb-10 text-center">What people say about us</h1>
        </motion.div>

        <TestimonialSlider isDarkMode={isDarkMode} />
      </div>
    </section>
  );
};

export default Testimonial;
