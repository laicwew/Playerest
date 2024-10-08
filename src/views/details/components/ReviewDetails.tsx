import { Review } from "../../../helpers/hooks/api/useReview";
import { RecommendReviews } from "./RecommendReviews";

//TODO: responsiveness
export default function ReviewDetails({ review }: { review: Review }) {
  return (
    <div className="col-md-12 text-md-start text-center">
      <div className="row mt-4 align-items-center" style={{ maxHeight: "80vh" }}>
        {/* TODO: conditional judge if comment column is open */}
        <div className="col-md-2"></div>

        <div className="col-md-4 text-md-start text-center">
          <img
            src={review.imageUrl}
            alt={"review" + review.id}
            className="rounded img-fluid"
            style={{ maxHeight: "80vh" }}
          />
        </div>

        {/* Text content on the right */}
        <div className="col-md-4 d-flex flex-column justify-content-between" style={{ height: "40vh" }}>
            <div className="container">
              {/* This ensures space is below the author */}
              {review.author}
            </div>
            <div className="container mt-auto">
              <h2>{review.title}</h2>
              <p>{review.content}</p>
            </div>
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
