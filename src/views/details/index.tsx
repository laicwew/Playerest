import { Review } from "../../helpers/hooks/api/useReview";
import ReviewDetails from "./components/ReviewDetails";
import { useParams } from "react-router-dom";

export function ReviewDetailPage() {
  const { id } = useParams();
  //TODO: getReviewDetail(params.id)
  const review = {
    id: 1,
    image: "src/assets/placeholder/1.jpeg",
    author: "aa",
    title: "aaa",
    content: "as",
    comments: [],
  } as Review;

  return (
    <div>
      <h1>Details: {id}</h1>
      <ReviewDetails review={review} />
    </div>
  );
}
