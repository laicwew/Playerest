import { getReviewDetail, getRecommendReviews } from "../helpers/hooks/api/api";
import { Review } from "../model/review";

class DetailsPresenter {
  // Method to fetch review details
  async fetchReviewDetails(
    id: string,
    setReview: (review: Review | null) => void
  ): Promise<void> {
    try {
      const review = await getReviewDetail(id); // Fetch review details from the API
      setReview(review || null); // Update the state with the fetched review or null if no data
    } catch (error) {
      console.error("Error fetching review details:", error);
      setReview(null); // Set state to null if there's an error
    }
  }

  async fetchRecommendedReviews(
    setReviews: (reviews: Review[]) => void
  ): Promise<void> {
    try {
      const reviews = await getRecommendReviews();
      setReviews(reviews || []); // Update the state with the fetched review or null if no data
    } catch (error) {
      console.error("Error fetching recommended reviews:", error);
      setReviews([]); // Set state to null if there's an error
    }
  }
}

export const detailsPresenter = new DetailsPresenter();
