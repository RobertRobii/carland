"use client";

import { useState, useEffect, useRef } from "react";

import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

import { format } from "date-fns";

import { FaInfoCircle } from "react-icons/fa";

const ReviewsHistory = ({ isDarkMode, userEmail }) => {
  const [reviewsData, setReviewsData] = useState({ reviews: [] });
  const [editModeIndex, setEditModeIndex] = useState(null);
  const [editedReview, setEditedReview] = useState({
    reviewMessage: "",
    fullname: "",
  });
  const textareaRef = useRef(null);
  const inputRef = useRef(null);

  const maxLength = 150;

  const [initialReview, setInitialReview] = useState(null);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const openCancelModal = () => {
    setIsCancelModalOpen(true);
  };

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
    setInitialReview({ reviewMessage, fullname });
  };

  const handleSaveReview = async (id) => {
    const updatedReviewsData = [...reviewsData.reviews];
    const reviewIndex = updatedReviewsData.findIndex(
      (review) => review._id === id
    );

    // Verificarea dacă revizuirea a fost modificată
    const isModified =
      updatedReviewsData[reviewIndex].reviewMessage !==
        editedReview.reviewMessage ||
      updatedReviewsData[reviewIndex].fullname !== editedReview.fullname;

    if (!isModified) {
      // Dacă recenzia nu a fost modificată, ieșim din funcție
      setEditModeIndex(null);
      return;
    }

    updatedReviewsData[reviewIndex] = {
      ...updatedReviewsData[reviewIndex],
      reviewMessage: editedReview.reviewMessage,
      fullname: editedReview.fullname,
      isEdited: true,
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
          isEdited: true,
        }),
      });
      if (!res.ok) {
        throw new Error("Failed to update review");
      }
      const data = await res.json();
      toast.success("Review updated successfully", { duration: 5000 });
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

  const handleDeleteReview = async (reviewId) => {
    try {
      console.log(reviewId);

      const res = await fetch("/api/deleteReview", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reviewId }),
      });

      if (res.ok) {
        const updatedReviews = reviewsData.reviews.filter(
          (review) => review._id !== reviewId
        );
        setReviewsData({ reviews: updatedReviews });

        console.log("Data sent successfully");
        toast.success("Review deleted successfully!", { duration: 5000 });
      } else {
        console.error("Failed to delete review");
        toast.error("Failed to delete review!", { duration: 5000 });
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
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
                <>
                  <textarea
                    ref={textareaRef}
                    value={editedReview.reviewMessage}
                    className="text-center resize-none w-[300px] lg:w-[510px] h-[230px] lg:h-[160px] focus:outline-accent p-4 focus:rounded-lg"
                    onChange={(event) => handleChange(event, "reviewMessage")}
                    maxLength={maxLength} // Adăugarea atributului maxLength la textarea
                  />
                  <p className="flex justify-end items-end mt-2 text-sm">
                    {editedReview.reviewMessage.length}/{maxLength} characters
                  </p>
                </>
              ) : (
                <div className="w-[300px] lg:w-[510px] min-h-[160px] p-4">
                  {review.reviewMessage}
                </div>
              )}
            </div>
            <div className="mb-8">
              <p>{review.isEdited ? "Edited" : "Posted"} on</p>
              <p className="textlg text-black font-semibold">
                {review.postedDate &&
                  format(new Date(review.postedDate), "dd.MM.yyyy")}
              </p>
              <p>By</p>
              {editModeIndex === review._id ? (
                <input
                  ref={inputRef}
                  value={editedReview.fullname}
                  className="text-center text-lg focus:outline-accent focus:rounded-lg font-semibold"
                  onChange={(event) => handleChange(event, "fullname")}
                />
              ) : (
                <input
                  value={review.fullname}
                  className="text-center text-lg outline-none font-semibold"
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
                <div className="flex gap-x-4 items-center">
                  <button
                    onClick={() => handleSaveReview(review._id)}
                    className="flex items-center text-lg bg-accent text-white border border-accent px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsCancelModalOpen(true)}
                    className="flex items-center text-lg bg-accent text-white border border-accent px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
                  >
                    Delete
                  </button>
                </div>
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

            <div>
              {isCancelModalOpen && (
                <div
                  className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
                  onClick={() => setIsCancelModalOpen(false)}
                >
                  <div
                    className="bg-white p-8 rounded-lg w-[300px] lg:w-[450px]"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="flex justify-start items-center mb-4">
                      <FaInfoCircle className="text-accent text-xl mr-2" />
                      <h2 className="text-xl lg:text-2xl font-bold">
                        Delete review
                      </h2>
                    </div>

                    <p className="mb-6 text-xl">
                      Are you sure you want to delete this review?
                    </p>
                    <div className="flex flex-col lg:flex-row justify-between">
                      <button
                        className="bg-white text-accent py-2 px-4 rounded-lg mr-4 border border-accent hover:bg-accent hover:text-white transition-all duration-300 mb-4 lg:mb-0"
                        onClick={() => setIsCancelModalOpen(false)}
                      >
                        No, take me back!
                      </button>
                      <button
                        className="bg-green-500 text-white py-2 px-4 rounded-lg mr-4 border border-green-500 hover:bg-white hover:text-green-500 transition-all duration-300"
                        onClick={() => {
                          handleDeleteReview(review._id);
                          setIsCancelModalOpen(false);
                        }}
                      >
                        Yes, I'm sure!
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="h2 text-center text-accent mt-10">
          There are no reviews yet!
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default ReviewsHistory;
