"use client";

import { useState, useEffect } from "react";

const ReviewsHistory = ({ isDarkMode, userEmail }) => {
  const [reviewsData, setReviewsData] = useState({});

  useEffect(() => {
    const getReviews = async () => {
      const res = await fetch("/api/getReviews");

      try {
        if (res.ok) {
          const data = await res.json();
          const userReviews = data.reviews.filter(
            (review) => review.email === userEmail
          );
          setReviewsData({ reviews: userReviews });
        }
      } catch (error) {
        console.error(error);
      }
    };

    getReviews();
  }, []);

  return (
    <div>
      {reviewsData.reviews && reviewsData.reviews.length > 0 ? (
        reviewsData.reviews.map((review, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center text-center"
          >
            <div
              className={`text-2xl max-w-[874px] mt-10 mb-12 font-medium ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {review.reviewMessage}
            </div>
            <div
              className={`flex flex-col items-center text-lg font-medium ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              <p>@{review.fullname}</p>
            </div>
          </div>
        ))
      ) : (
        <div className="h2 text-center text-accent mt-10">
          There are no reviews yet!
        </div>
      )}
    </div>
  );
};

export default ReviewsHistory;
