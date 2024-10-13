import axios from "axios";
import { Review, Comment } from "../../../model/review";

export const ROOT_URL = "https://api-ttvkb2gtia-uc.a.run.app";

export const getRecommendReviews = async () => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = (await response.json()) as Review[];
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const getReviewComments = async (reviewId: number) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/comments/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviewId }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const comments = (await response.json()) as Comment[];
    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
};

export const searchReviews = async (query: string) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = (await response.json()) as Review[];
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const createReview = async (Review: Review) => {
  try {
    const response = await fetch(`${ROOT_URL}/api/review/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Review),
    });
    if (!response.ok) {
      throw new Error("Failed to create review");
    }
    const responseData = await response.json();
    console.log("Review added successfully:", responseData);
  } catch (error) {
    console.error("Error creating review:", error);
  }
};

export const uploadImageURL = async (imageURL: string) => {
  try {
    const formData = new FormData();
    formData.append("image", imageURL);
    const response = await axios.post(
      "http://localhost:3000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response.status !== 200) {
      throw new Error("Failed to upload image");
    }
    const imgURL = (await response.data) as string[];
    return imgURL;
  } catch {
    console.error("Error uploading image");
  }
};
