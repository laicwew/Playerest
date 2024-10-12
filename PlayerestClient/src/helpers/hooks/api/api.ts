import { Review, Comment } from "../../../model/review";

export const ROOT_URL = "http://localhost:3000";

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
