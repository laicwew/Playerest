import { useState, useEffect } from "react";
import { Review } from "../../model/review";
import ReviewDetails from "./components/ReviewDetails";
import { useParams } from "react-router-dom";
import { detailsPresenter } from "../../presenter/detailPresenter";

export function ReviewDetailPage() {
  const { id } = useParams();
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    if (id) {
      detailsPresenter.fetchReviewDetails(id, setReview);
    }
  }, [id]);

  return (
    <div>
      <ReviewDetails review={review} />
      <div style={{ height: "12vh" }}></div>
    </div>
  );
}
