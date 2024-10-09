import { Review } from "./useReview";

export const ROOT_URL = "http://localhost:3000";

export const fetchRecommendReviews = async () => {
  try {
    const response = await fetch(`${ROOT_URL}/api/reviews`);
    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }
    const reviews = (await response.json()) as Review[]; // Assuming the backend returns JSON
    return reviews;
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};
