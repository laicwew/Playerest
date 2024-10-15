import { Review } from "../model/review";
import { createReview } from "../helpers/hooks/api/api";

interface FormValues {
  reviewRate: number;
  reviewTitle: string;
  reviewText: string;
}

class CreatePresenter {
  // Function to handle review submission
  async submitReview(
    values: FormValues,
    rating: number,
    isAuthenticated: boolean,
    userName: string | null,
    setImgURL: (url: string) => void
  ): Promise<void> {
    if (!isAuthenticated) {
      alert("Please Login to publish review!");
      return;
    }

    const review: Review = {
      content: values.reviewText,
      rate: rating * 2,
      imageUrl: "",
      like: 0,
      author: userName || "Anonymous", // Provide fallback if userName is null
      title: values.reviewTitle,
    };

    try {
      await createReview(review);
      alert("Review published successfully!");
      setImgURL(""); // Reset the image URL
    } catch (error) {
      console.error("Error submitting review", error);
    }
  }
}

export const createPresenter = new CreatePresenter();
