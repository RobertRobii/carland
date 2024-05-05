"use client";

import { useState, useEffect, useRef } from "react";

const ReviewsHistory = ({ isDarkMode, userEmail }) => {
  const [reviewsData, setReviewsData] = useState({ reviews: [] });
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [editedReview, setEditedReview] = useState({
    reviewMessage: "",
    fullname: "",
  });
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

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
  }, [userEmail]);

  useEffect(() => {
    if (editModeIndex !== null && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editModeIndex]);

  const handleEditReview = (id, reviewMessage, fullname) => {
    setEditModeIndex(id);
    setEditedReview({ reviewMessage, fullname });
  };

  const handleSaveReview = async (id) => {
    const updatedReviewsData = [...reviewsData.reviews];
    const reviewIndex = updatedReviewsData.findIndex(
      (review) => review._id === id
    );
    updatedReviewsData[reviewIndex] = {
      ...updatedReviewsData[reviewIndex],
      reviewMessage: editedReview.reviewMessage,
      fullname: editedReview.fullname,
    };
    setReviewsData({ reviews: updatedReviewsData });

    setEditModeIndex(null);

    try {
      console.log(id, editedReview.reviewMessage, editedReview.fullname);

      const res = await fetch(`/api/updateReview`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          reviewMessage: editedReview.reviewMessage,
          fullname: editedReview.fullname,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update review");
      }
      const data = await res.json();
      console.log("Review updated successfully");
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleChange = (event, field) => {
    setEditedReview((prevState) => ({
      ...prevState,
      [field]: event.target.value,
    }));
  };

  return (
    <div className="flex flex-col xl:flex-row justify-center items-center xl:justify-between gap-x-10 flex-wrap">
      {reviewsData.reviews.length > 0 ? (
        reviewsData.reviews.map((review) => (
          <div
            key={review._id}
            className="flex flex-col justify-center items-center text-center border mb-10 lg:min-w-[600px] max-w-[600px] py-8 hover:shadow-2xl rounded-lg px-4"
          >
            <div
              className={`text-2xl mb-4 font-medium ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {editModeIndex === review._id ? (
                <textarea
                  ref={textareaRef}
                  value={editedReview.reviewMessage}
                  className="text-center resize-none w-[300px] lg:w-[510px] h-[230px] lg:h-[160px] focus:outline-accent p-4 focus:rounded-lg"
                  onChange={(event) => handleChange(event, "reviewMessage")}
                />
              ) : (
                <div className="w-[300px] lg:w-[510px] min-h-[160px] p-4">
                  {review.reviewMessage}
                </div>
              )}
            </div>
            <div className="mb-8">
              <p>Posted on: </p>
              {editModeIndex === review._id ? (
                <input
                  ref={inputRef}
                  value={editedReview.fullname}
                  className="text-center text-lg focus:outline-accent focus:rounded-lg"
                  onChange={(event) => handleChange(event, "fullname")}
                />
              ) : (
                <input
                  value={review.fullname}
                  className="text-center text-lg outline-none"
                  readOnly
                />
              )}
            </div>
            <div
              className={`flex flex-col items-center text-lg font-medium ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {editModeIndex === review._id ? (
                <button
                  onClick={() => handleSaveReview(review._id)}
                  className="flex items-center text-lg bg-accent text-white border border-accent px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleEditReview(
                      review._id,
                      review.reviewMessage,
                      review.fullname
                    )
                  }
                  className="flex items-center text-lg hover:bg-accent text-accent hover:text-white border border-accent px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                >
                  Edit
                </button>
              )}
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
