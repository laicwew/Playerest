import { useState, useEffect } from "react";
import { getReviewDetail } from "../../helpers/hooks/api/api";
import { Review } from "../../model/review";
import ReviewDetails from "./components/ReviewDetails";
import { useParams } from "react-router-dom";

export function ReviewDetailPage() {
  const { id } = useParams();

  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const getReviews = async () => {
      console.log(id);
      const fetchedReview = await getReviewDetail(id ?? ""); // Fetch reviews
      if (fetchedReview) {
        setReview(fetchedReview); // Update state with fetched reviews
      }
    };

    getReviews(); // Call the function to fetch reviews when the component mounts
  }, []);

  return (
    <div>
      <ReviewDetails review={review} />
      <div style={{ height: "12vh" }}></div>
    </div>
  );
}
