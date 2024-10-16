import {
  deleteReview,
  getReviewByAuthor,
  getUserSavedReviews,
} from "../helpers/hooks/api/api";
import { Review } from "../model/review";

class ProfilePresenter {
  async deleteReview(reviewId: number): Promise<void> {
    try {
      await deleteReview(reviewId);
    } catch (error) {
      console.error("Error deleting review", error);
    }
  }
  // Fetch reviews by author and update the state in the View
  async fetchUserReviews(
    user: string,
    setPosts: (reviews: Review[]) => void
  ): Promise<void> {
    try {
      const reviews = await getReviewByAuthor(user);
      setPosts(reviews?.filter((review) => review !== null) || []);
    } catch (error) {
      console.error("Error fetching user reviews:", error);
      setPosts([]);
    }
  }

  // Fetch saved reviews and update the state in the View
  async fetchSavedReviews(
    accessToken: string,
    userName: string,
    setSavedPosts: (reviews: Review[]) => void
  ): Promise<void> {
    try {
      const savedReviews = await getUserSavedReviews(accessToken, userName);
      setSavedPosts(savedReviews?.filter((review) => review !== null) || []);
    } catch (error) {
      console.error("Error fetching saved reviews:", error);
      setSavedPosts([]);
    }
  }
}

export const profilePresenter = new ProfilePresenter();
