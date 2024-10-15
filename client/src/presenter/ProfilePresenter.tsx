import {
  getReviewByAuthor,
  getUserSavedReviews,
} from "../helpers/hooks/api/api";
import { Review } from "../model/review";

class ProfilePresenter {
  // Fetch reviews by author and update the state in the View
  async fetchUserReviews(
    user: string,
    setPosts: (reviews: Review[]) => void
  ): Promise<void> {
    try {
      const reviews = await getReviewByAuthor(user);
      setPosts(reviews || []);
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
      setSavedPosts(savedReviews || []);
    } catch (error) {
      console.error("Error fetching saved reviews:", error);
      setSavedPosts([]);
    }
  }
}

export const profilePresenter = new ProfilePresenter();
