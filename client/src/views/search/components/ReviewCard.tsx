import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import BtnGrupp from "../../components/BtnGroup";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Review } from "../../../model/review";
import { AuthContext } from "../../../helpers/AuthContext";
import {
  saveReviewById,
  unSaveReviewById,
} from "../../../helpers/hooks/api/api";
import { useIsReviewSaved } from "../../../helpers/hooks/useIsReviewSaved";

export function ReviewCard({
  review,
  isDeletable,
  handleDelete,
}: {
  review: Review;
  isDeletable: boolean;
  handleDelete: () => void;
}) {
  const { isSaved } = useIsReviewSaved(review.id);
  const [saved, setSaved] = useState<boolean>(isSaved);
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, accessToken, userName } = useContext(AuthContext);

  useEffect(() => {
    setSaved(isSaved);
  }, [isSaved]);
  const handleClickSaved = () => {
    if (isAuthenticated && accessToken && userName) {
      const saveReview = async () => {
        await saveReviewById(accessToken, userName, review.id ?? 0);
      };
      const unSaveReview = async () => {
        await unSaveReviewById(accessToken, userName, review.id ?? 0);
      };
      if (isSaved) {
        unSaveReview();
        setSaved(false);
      } else {
        saveReview();
        setSaved(true);
      }
    } else {
      alert("Please login first!");
    }
  };

  // Fallbacks for imageUrl and title
  const id = review?.id ?? "1";
  const imageUrl = review?.imageUrl ?? null;
  const title = review?.title ?? "No title";
  const author = review?.author ?? "Unknown author";

  const [isLoading, setIsLoading] = useState(true);
  const [isImageError, setIsImageError] = useState(false);

  return (
    <Card
      className="custom-card text-white position-relative d-flex justify-content-center align-items-center"
      style={{
        width: "100%",
        minWidth: "16rem",
        maxWidth: "22rem",
        height: imageUrl && title && !isImageError ? "auto" : "12rem",
        cursor: "pointer",
        borderRadius: "1rem",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      onClick={() => navigate(`/detail/${id}`)}
    >
      {isLoading && imageUrl && !isImageError && (
        <Placeholder
          as={CardImg}
          animation="wave"
          xs={10}
          style={{
            height: "10rem",
            borderRadius: "1rem",
            backgroundColor: "rgba(0,0,0,0.2)",
          }}
        />
      )}

      {imageUrl && !isImageError ? (
        <Card.Img
          style={{
            display: isLoading ? "none" : "block",
            height: "auto",
            maxHeight: "12rem",
            borderRadius: "0.8rem",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
          src={imageUrl}
          alt={title}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <CardTitle
          style={{
            color: "black",
            fontWeight: "bold",
            fontSize: "1.2rem",
            textAlign: "center",
          }}
        >
          {title || "Untitled"}
        </CardTitle>
      )}

      {showBtn && (
        <Card.ImgOverlay
          className="d-flex flex-column justify-content-between"
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: "0.8rem",
            transition: "opacity 0.3s ease",
          }}
        >
          {review.rate && (
            <div
              className="rank-score position-absolute top-2"
              style={{
                backgroundColor: "#ffcc00",
                borderRadius: "50%",
                padding: "0.5rem",
                fontSize: "1rem",
                fontWeight: "bold",
              }}
            >
              {review.rate}
            </div>
          )}

          <BtnGrupp
            isDeletable={isDeletable}
            saved={saved}
            handleDelete={handleDelete}
            handleSaved={handleClickSaved}
            className="position-absolute top-2 end-0 mx-3"
          />

          <CardBody className="text-start position-absolute bottom-0 start-0 p-2">
            <p style={{ margin: 0, fontWeight: "bold" }}>{title}</p>
            <small>By {author}</small>
          </CardBody>
        </Card.ImgOverlay>
      )}
    </Card>
  );
}
