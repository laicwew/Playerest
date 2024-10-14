import {
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Placeholder,
} from "react-bootstrap";
import BtnGrupp from "../../components/BtnGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Review } from "../../../model/review";

export function ReviewCard({ review }: { review: Review }) {
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleLiked = () => {
    setLiked((prevState) => !prevState);
  };
  const handleSaved = () => {
    setSaved((prevState) => !prevState);
  };

  // Fallbacks for imageUrl and title
  const id = review?.id ?? "1";
  const imageUrl = review?.imageUrl ?? null;
  const title = review?.title ?? "No title";
  const author = review?.author ?? "Unknown author";

  const [isLoading, setIsloading] = useState(true);
  const [isImageError, setIsImageError] = useState(false);

  return (
    <Card
      className="text-white position-relative d-flex justify-content-center"
      style={{
        width: "21rem",
        height: `${imageUrl && title && !isImageError ? "" : "9rem"}`,
        borderRadius: "5%",
        marginBottom: "0.5rem",
        cursor: "pointer",
        padding: "0",
      }}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      key={id}
      onClick={() => {
        navigate(`/detail/${id}`);
      }}
    >
      {isLoading && imageUrl && !isImageError && (
        <Placeholder
          as={CardImg}
          animation="wave"
          xs={10}
          style={{
            height: "10rem",
            borderRadius: "5%",
            backgroundColor: "rgb(0,0,0,0.2)",
          }}
        />
      )}
      {imageUrl && !isImageError ? (
        <Card.Img
          style={{
            display: isLoading ? "none" : "block",
            minHeight: "9rem",
          }}
          src={imageUrl}
          alt={title}
          onLoad={() => setIsloading(false)}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <CardTitle style={{ color: "black", marginLeft: "12px" }}>
          {title}
        </CardTitle>
      )}
      {showBtn && (
        <Card.ImgOverlay
          style={{
            background: "rgba(0, 0, 0, .5) ",
          }}
        >
          {review.rate && (
            <div className="rank-score position-absolute top-2">
              {review.rate}
            </div>
          )}
          <BtnGrupp
            liked={liked}
            saved={saved}
            handleLiked={handleLiked}
            handleSaved={handleSaved}
            className="position-absolute top-2 end-0 mx-3"
          />
          <CardBody className="position-absolute bottom-0 start-0 text-start">
            {imageUrl && title && !isImageError ? `${title}` : ""}
            <br></br>
            By {author}
          </CardBody>
        </Card.ImgOverlay>
      )}
    </Card>
  );
}
