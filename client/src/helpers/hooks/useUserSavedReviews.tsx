import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { profilePresenter } from "../../presenter/ProfilePresenter";
import { Review } from "../../model/review";

/**
 * Get saved review ids
 */
export function useUserSavedReviews() {
  const { isAuthenticated, accessToken, userName } = useContext(AuthContext);
  const [savedReviews, setSavedReviews] = useState<Review[]>([]);
  const { savedReviewsIds } = useUserSavedReviewsIds()

  useEffect(() => {
    const getUserSavedReviews = async () => {
      try {
        // Fetch saved reviews
        const fetchedSavedReviews = await profilePresenter.fetchSavedReviews(
          accessToken ?? "",
          userName ?? ""
        );
        setSavedReviews(fetchedSavedReviews);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };
    if (isAuthenticated && userName && accessToken) {
      getUserSavedReviews();
    }
  }, [isAuthenticated, accessToken, userName, savedReviewsIds]);

  return { savedReviews };
}

export function useUserSavedReviewsIds() {
  const { savedReviewsIds } = useContext(AuthContext);

  return { savedReviewsIds };
}