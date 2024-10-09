import { Review } from "../../../helpers/hooks/api/useReview";
import FormField from "../../components/FormField";
interface CommentForumProps {
  review: Review;
  setIsOpenComment: () => void;
}

const CommentForum = ({ review, setIsOpenComment }: CommentForumProps) => {
  return (
    <div className="comment-forum">
      <div className="d-flex flex-row p-2 justify-content-around">
        <h2 style={{ color: "white" }}>Comment Forum</h2>
        <button onClick={setIsOpenComment}>X</button>
      </div>
      <div className="comment-list">
        {review.comments?.map((item) => (
          <div className="comment-card" key={item.id}>
            <div className="comment-card__person">
              <div className="comment-card__img-container">
                <img
                  className="comment-card__img-container--img"
                  src={review.imageUrl}
                  alt="profile"
                />
              </div>
              <p>{item.user}</p>
              {/* <span>Achievement Badges</span> */}
            </div>
            <div className="comment-card__text">{item.content}</div>
          </div>
        ))}
      </div>
      <div className="comment-send">
        <FormField
          className="comment-send"
          id="1"
          name="comment"
          type="input"
          label=" "
        />
        <button>send</button>
      </div>
    </div>
  );
};

export default CommentForum;
