import { useState } from "react";
import CommentForum from "./CommentForum";
import { RecommendReviews } from "./RecommendReviews";
import { Review } from "../../../model/review";
import { useNavigate } from "react-router-dom";

export default function ReviewDetails({ review }: { review: Review | null }) {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const navigate = useNavigate();

  const isCloseComment = () => {
    setIsOpenComment(false);
  };

  const [isImgLoaded, setIsImgLoaded] = useState(true);

  return (
    <>
      {review && (
        <div className="review-page-container">
          <div className="main-content">
            <div className="w-100 text-md-start text-center">
              <div
                className={`card-container mt-4 align-items-center p-5 ${isOpenComment ? "flex-column" : "row flex-row"}`}
              >
                {isImgLoaded && review.imageUrl && (
                  <div className="w-50 text-center">
                    <img
                      src={review.imageUrl}
                      alt={"review" + review.id}
                      className={`rounded img-fluid d-${review.imageUrl ? "" : "none"}`}
                      onError={() => setIsImgLoaded(false)}
                      style={{
                        maxHeight: "65vh",
                        minWidth: "35vw",
                        objectFit: isOpenComment ? "contain" : undefined,
                      }}
                    />
                  </div>
                )}

                <div
                  className={`w-${review.imageUrl && !isOpenComment && isImgLoaded ? "50" : "100"} d-flex flex-column justify-content-between`}
                  style={{ height: "40vh" }}
                >
                  <div
                    className="author-box mb-3 mt-3"
                    onClick={() => {
                      navigate(`/profile?user=${review.author}`);
                    }}
                  >
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
                      <span className="ms-2">Comment</span>
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
      )}
    </>
  );
}
