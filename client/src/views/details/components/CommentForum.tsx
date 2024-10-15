import { useFormik } from "formik";
import FormField from "../../components/FormField";
import { useContext, useEffect, useState } from "react";
import { addComment, getReviewComments } from "../../../helpers/hooks/api/api";
import { Review, Comment } from "../../../model/review";
import { AuthContext } from "../../../helpers/AuthContext";
interface CommentForumProps {
  review: Review;
  setIsOpenComment: () => void;
}

const CommentForum = ({ review, setIsOpenComment }: CommentForumProps) => {
  const [updatedReview, setUpdatedReview] = useState(review);
  const [comments, setComments] = useState([] as Comment[]);

  const { isAuthenticated, userName } = useContext(AuthContext);

  useEffect(() => {
    const getComments = async () => {
      const fetchedComments = await getReviewComments(review.id || 0);
      if (fetchedComments) {
        setComments(fetchedComments);
      }
    };
    getComments();
  }, [review.id, comments]);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },

    onSubmit: async (values) => {
      if (!isAuthenticated) {
        alert("Please Login first!");
        return;
      }
      const newComment = {
        reviewId: review.id,
        author: userName,
        content: values.comment,
      } as Comment;
      const response = await addComment(newComment);

      if (response) {
        const newComments = [...(comments || []), newComment];
        setUpdatedReview((prevReview) => ({
          ...prevReview,
          comments: newComments,
        }));
      }
      formik.resetForm();
    },
  });
  return (
    <div className="comment-forum">
      <div className="d-flex flex-row p-2 justify-content-around">
        <h2 style={{ color: "white" }}>Comment Forum</h2>
        <button onClick={setIsOpenComment}>X</button>
      </div>
      <div className="comment-list">
        {comments?.map((comment) => (
          <div className="comment-card" key={comment.id}>
            <div className="comment-card__person">
              <div className="comment-card__img-container">
                <img
                  className="comment-card__img-container--img"
                  src={updatedReview.imageUrl}
                  alt="profile"
                />
              </div>
              <p>{comment.author}</p>
              {/* <span>Achievement Badges</span> */}
            </div>
            <div className="comment-card__text">{comment.content}</div>
          </div>
        ))}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="comment-send">
          <FormField
            className="comment-send"
            id="1"
            name="comment"
            type="input"
            label=""
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          <button type="submit">send</button>
        </div>
      </form>
    </div>
  );
};

export default CommentForum;
