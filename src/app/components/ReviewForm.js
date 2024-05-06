"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { fadeIn } from "/variants";

import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ReviewForm = ({ isDarkMode }) => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  const maxLength = 200;

  const handleReview = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          reviewMessage,
        }),
      });

      if (res.ok) {
        toast.success(
          "Review published successfully. Thank you for your feedback!",
          { duration: 5000 }
        );
        setFullname("");
        setEmail("");
        setReviewMessage("");
      } else {
        console.error("Error while sending data!");
        toast.error("Failed to publish review. Please try again.", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.log("Error while sending data:", error);
    }
  };

  return (
    <div className="container mx-auto mb-10">
      <p
        className={`flex justify-center xl:justify-start h2 mt-10 mb-10 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Leave a review:
      </p>
      <form onSubmit={handleReview}>
        <motion.div className="flex flex-col xl:w-[620px] items-center xl:items-start">
          <div className="flex flex-col lg:flex-row gap-5">
            <input
              className="outline-none bg-white h-14 border rounded-lg pl-4 focus:border-accent w-[300px]"
              type="text"
              placeholder="Full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
            <input
              className="outline-none bg-white h-14 border rounded-lg pl-4 focus:border-accent w-[300px]"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <textarea
            className="outline-none mt-4 bg-white border rounded-lg p-4 focus:border-accent w-[300px] lg:w-[620px] xl:min-w-full h-[210px] lg:h-[130px] resize-none"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            placeholder="Your review..."
            required
            rows={5}
            cols={30}
            maxLength={maxLength}
            minLength={10}
          ></textarea>
          <div className="w-[300px] lg:w-[620px] xl:min-w-full">
            <p className="flex justify-end items-end mt-2">
              {reviewMessage.length}/{maxLength} characters
            </p>
          </div>
        </motion.div>
        <motion.div
          variants={fadeIn("up", 0.8)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.8 }}
        >
          <button
            onClick={handleReview}
            className="btn btn-sm btn-accent mx-auto xl:mx-0 w-[134px] hover:bg-accent-hover mt-6"
          >
            Publish
          </button>
        </motion.div>
      </form>
      <Toaster />
    </div>
  );
};

export default ReviewForm;
