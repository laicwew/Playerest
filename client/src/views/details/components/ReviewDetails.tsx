import { useState } from "react";
import CommentForum from "./CommentForum";
import { RecommendReviews } from "./RecommendReviews";
import { Review } from "../../../model/review";

//TODO: responsiveness
export default function ReviewDetails({ review }: { review: Review }) {
  const [isOpenComment, setIsOpenComment] = useState(false);

  const isCloseComment = () => {
    setIsOpenComment(false);
  };
  return (
    <div className="review-page-container">
      {/* Main content area */}
      <div className="main-content">
        <div className="w-100 text-md-start text-center">
          <div
            className="card-container row mt-4 align-items-center p-5"
            style={{ maxHeight: "80vh" }}
          >
            {/* TODO: conditional judge if comment column is open */}
            <div className="w-50 text-md-start text-center">
              <img
                src={review.imageUrl}
                alt={"review" + review.id}
                className="rounded img-fluid"
                style={{ maxHeight: "80vh" }}
              />
            </div>

            {/* Text content on the right */}
            <div
              className="w-50 d-flex flex-column justify-content-between"
              style={{ height: "40vh" }}
            >
              <div className="author-box mb-3">
                <span className="fas fa-at me-2" />
                <span>{review.author}</span>
              </div>
              <h2>{review.title}</h2>
              <div className="review-content-box mt-3 mb-3">
                <p>{review.content}</p>
              </div>
              <div className="flex d-flex justify-content-end">
                <button
                  className="w-20"
                  onClick={() => setIsOpenComment(!isOpenComment)}
                >
                  <i className="fas fa-comment-dots"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="w-100">
            <div className="row mt-4 align-items-center">
              <div className="w-100 pt-5">
                <RecommendReviews />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOpenComment && (
        <div className="comment-forum-container">
          <CommentForum review={review} setIsOpenComment={isCloseComment} />
        </div>
      )}
    </div>
  );
}
