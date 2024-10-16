import { useEffect, useState } from "react";
import { ReviewCard } from "../../search/components/ReviewCard";
import { detailsPresenter } from "../../../presenter/DetailsPresenter";
import { Review } from "../../../model/review";

export function RecommendReviews() {
  const [reviews, setReviews] = useState([] as Review[]);

  useEffect(() => {
    detailsPresenter.fetchRecommendedReviews(setReviews);
  }, []);

  return (
    <div className="text-center">
      <h2>Similar Reviews</h2>
      <div className="recommend-reviews row gap-3 align-items-center">
        {reviews.map((review) => (
          <ReviewCard isDeletable={false} handleDelete={()=>{}} review={review} />
        ))}
      </div>
    </div>
  );
}
