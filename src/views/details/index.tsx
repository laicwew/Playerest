import { Review } from "../../helpers/hooks/api/useReview";
import CommentForum from "./components/CommentForum";
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
    comments: [
      { id: 1, user: "ppl1", content: "Oh no, this review is awesome" },
      { id: 2, user: "ppl2", content: "yes,that make sense" },
    ],
    gameAvgRating: 7,
    authorRating: 8,
    like: 10,
  } as Review;

  return (
    <div>
      <h1>Details: {id}</h1>
      <CommentForum review={review} />
      <ReviewDetails review={review} />
      <div style={{ height: "12vh" }}></div>
    </div>
  );
}
