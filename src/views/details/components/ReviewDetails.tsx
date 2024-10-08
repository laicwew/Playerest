import { Review } from "../../../helpers/hooks/api/useReview";

export default function ReviewDetails({ review }: { review: Review }) {
  return (
    <div className="row mt-4 align-items-center">
     {/* Image on the left */}
     <div className="col-md-4 text-md-start text-center">
        <img
          src={review.imageUrl}
          alt={"review" + review.id}
          className="rounded img-fluid"
          style={{ maxWidth: "100%" }} // Ensures the image is responsive
        />
      </div>

      {/* Text content on the right */}
      <div className="col-md-8">
        <h2>{review.title}</h2>
        <p>{review.content}</p>
      </div>
    </div>
  );
}
