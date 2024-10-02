import { Card, CardBody, CardFooter, CardTitle } from "react-bootstrap";
import BtnGrupp from "../../components/BtnGrupp";
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
            background: " rgba(0, 0, 0, .5) ",
          }}
        >
          <BtnGrupp />
          {imgPath && title && (
            <CardBody>
              {title}
              <CardFooter>By {username}</CardFooter>
            </CardBody>
          )}
        </Card.ImgOverlay>
      )}
    </Card>
  );
}
