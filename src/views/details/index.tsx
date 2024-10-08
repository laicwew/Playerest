import { Review } from "../../helpers/hooks/api/useReview";
import ReviewDetails from "./components/ReviewDetails";
import { useParams } from "react-router-dom";

export function ReviewDetailPage() {
  const { id } = useParams();
  //TODO: getReviewDetail(params.id)
  const review = {
    id: 1,
    imageUrl: "../../../src/assets/placeholder/2.jpeg",
    author: "AmiyaSX",
    title: "This game is just so good",
    content: "balabala bala bababab lalalal",
    comments: [],
    gameAvgRating: 7,
    authorRating: 8,
    like: 10
  } as Review;

  return (
    <div>
      <h1>Details: {id}</h1>
      <ReviewDetails review={review} />
      <div style={{height: "12vh"}}></div> 
    </div>
  );
}
