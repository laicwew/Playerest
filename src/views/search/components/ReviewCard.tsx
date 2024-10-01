import { Card, Button, CardTitle } from "react-bootstrap";
import { useState } from "react";

interface imgProps {
  id: number;
  imgPath?: string;
  title?: string;
}

export function ReviewCard({ id, imgPath, title }: imgProps) {
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
        <CardTitle>{title}</CardTitle>
      )}
      {showBtn && (
        <Card.ImgOverlay
          style={{
            background: " rgba(0, 0, 0, .5) ",
          }}
        >
          <Button variant="outline-light position-absolute top-0 end-0 my-4 mx-3 ">
            Like
          </Button>
          <Button variant="outline-light position-absolute bottom-0 start-0 my-4 mx-3">
            Share
          </Button>
          <Button variant="outline-light position-absolute bottom-0 end-0 my-4 mx-3">
            Save
          </Button>
        </Card.ImgOverlay>
      )}
    </Card>
  );
}
