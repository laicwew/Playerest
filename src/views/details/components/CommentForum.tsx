import { useFormik } from "formik";
import { Comment, Review } from "../../../helpers/hooks/api/useReview";
import FormField from "../../components/FormField";
import { useEffect, useState } from "react";
import { getReviewComments } from "../../../helpers/hooks/api/api";
interface CommentForumProps {
  review: Review;
  setIsOpenComment: () => void;
}

const CommentForum = ({ review, setIsOpenComment }: CommentForumProps) => {
  const [updatedReview, setUpdatedReview] = useState(review);
  const [comments, setComments] = useState([] as Comment[]);

  useEffect(() => {
    const getComments = async () => {
      const fetchedComments = await getReviewComments(review.id);
      console.log(review.id);
      console.log(fetchedComments);
      if (fetchedComments) {
        setComments(fetchedComments);
      }
    };
    getComments();
  }, []);

  const formik = useFormik({
    initialValues: {
      comment: "",
    },

    onSubmit: (values) => {
      const newComment = {
        id: (comments?.length || 0) + 1,
        user: "Anonymous",
        content: values.comment,
      };
      const newComments = [...(comments || []), newComment];

      setUpdatedReview((prevReview) => ({
        ...prevReview,
        comments: newComments,
      }));
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
