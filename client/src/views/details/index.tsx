import { Review } from "../../model/review";
import ReviewDetails from "./components/ReviewDetails";

export function ReviewDetailPage() {
  // const { id } = useParams();
  //TODO: getReviewDetail(params.id)

  /* const getDetail(params.id) = async () => {
      const fetchedReviewDetail = await getReviewDetail(review.id);
      console.log(review.id);
      console.log(fetchedComments);
      if (fetchedComments) {
        setComments(fetchedComments);
      } */
  const review = {
    id: 1,
    imageUrl: "../../../src/assets/placeholder/2.jpeg",
    author: "AmiyaSX",
    title: "This game is just so good",
    content: "balabala bala bababab lalalal",
    rate: 7,
    like: 10,
  } as Review;

  return (
    <div>
      <ReviewDetails review={review} />
      <div style={{ height: "12vh" }}></div>
    </div>
  );
}
