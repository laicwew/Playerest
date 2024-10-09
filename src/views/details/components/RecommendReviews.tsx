import { useEffect, useState } from "react";
import { ReviewCard } from "../../search/components/ReviewCard";
import { Review } from "../../../helpers/hooks/api/useReview";
import { fetchRecommendReviews } from "../../../helpers/hooks/api/api";

export function RecommendReviews() {
  const [reviews, setReviews] = useState([] as Review[]);

  // Fetch reviews from the backend on component mount
  useEffect(() => {
    const getReviews = async () => {
      const fetchedReviews = await fetchRecommendReviews(); // Fetch reviews
      if (fetchedReviews) {
        setReviews(fetchedReviews); // Update state with fetched reviews
      }
    };

    getReviews(); // Call the function to fetch reviews when the component mounts
  }, []);

  return (
    <div className="text-center">
      <h2>Similar Reviews</h2>
      <div className="recommend-reviews row gap-3 align-items-center">
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </div>
    </div>
  );
}
