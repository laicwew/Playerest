import { Review } from "../../../helpers/hooks/api/useReview";

const CommentForum = ({ review }: { review: Review }) => {
  return (
    <div className="comment-forum">
      <h2>Comment Forum</h2>
      {review.comments?.map((item) => (
        <div className="comment-list" key={item.id}>
          <div className="comment-list__person">
            <div className="comment-list__img-container">
              <img
                className="comment-list__img-container-img"
                src={review.imageUrl}
                alt="profile"
              />
            </div>
            <p>{item.user}</p>
            <span>Achievement signs</span>
          </div>
          <div className="comment-list__text">
            <h5>Comment id</h5>
            <span>{item.content}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentForum;
