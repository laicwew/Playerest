import { Review } from "../../../helpers/hooks/api/useReview";
import { RecommendReviews } from "./RecommendReviews";

export default function ReviewDetails({ review }: { review: Review }) {
  return (
    <div className="col-md-12 text-md-start text-center">
      <div className="row mt-4 align-items-center">
        {/* TODO: conditional judge if comment column is open */}
        <div className="col-md-2"></div>

        <div className="col-md-4 text-md-start text-center">
          <img
            src={review.imageUrl}
            alt={"review" + review.id}
            className="rounded img-fluid"
            style={{ maxWidth: "100%" }}
          />
        </div>

        {/* Text content on the right */}
        <div className="col-md-4">
          <h2>{review.title}</h2>
          <p>{review.content}</p>
        </div>
        {/* TODO: conditional judge if comment column is open */}
        <div className="col-md-2"></div>
      </div>
      <div className="col-md-12">
        <div className="row mt-4 align-items-center">
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <RecommendReviews />
          </div>
          <div className="col-md-2"></div>
        </div>
      </div>
    </div>
  );
}
