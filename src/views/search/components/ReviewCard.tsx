import { Card, CardBody, CardTitle } from "react-bootstrap";
import BtnGrupp from "../../components/BtnGroup";
import { useState } from "react";

interface imgProps {
  id: number;
  imgPath?: string;
  title?: string;
  username?: string;
}

export function ReviewCard({
  id,
  imgPath,
  title,
  username = "whom",
}: imgProps) {
  const [showBtn, setShowBtn] = useState(false);

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleLiked = () => {
    setLiked((prevState) => !prevState);
  };
  const handleSaved = () => {
    setSaved((prevState) => !prevState);
  };

  return (
    <Card
      className="text-white position-relative d-flex justify-content-center"
      style={{
        width: "15rem",
        height: `${imgPath && title ? "" : "10rem"}`,
        borderRadius: "5%",
        marginBottom: "0.5rem",
      }}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      key={id}
    >
      {imgPath ? (
        <Card.Img src={imgPath} alt={title} />
      ) : (
        <CardTitle style={{ color: "black" }}>{title}</CardTitle>
      )}
      {showBtn && (
        <Card.ImgOverlay
          style={{
            background: "rgba(0, 0, 0, .5) ",
          }}
        >
          <BtnGrupp
            liked={liked}
            saved={saved}
            handleLiked={handleLiked}
            handleSaved={handleSaved}
            className="position-absolute top-2 end-0 mx-3"
          />
          <CardBody className="position-absolute bottom-0 start-0 text-start">
            {imgPath && title ? `${title}` : ""}
            <br></br>
            By {username}
          </CardBody>
        </Card.ImgOverlay>
      )}
    </Card>
  );
}
