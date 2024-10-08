import { Card, CardBody, CardFooter, CardTitle } from "react-bootstrap";
import BtnGrupp from "../../components/BtnGroup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface imgProps {
  id: number;
  imgPath?: string;
  title?: string;
  username?: string;
}
// TODO: use Review interface refactor
export function ReviewCard({
  id,
  imgPath,
  title,
  username = "whom",
}: imgProps) {
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

  return (
    <Card
      className="text-white position-relative d-flex justify-content-center"
      style={{
        width: "15rem",
        height: `${imgPath && title ? "" : "10rem"}`,
        borderRadius: "5%",
        marginBottom: "0.5rem",
        cursor: "pointer"
      }}
      onMouseEnter={() => setShowBtn(true)}
      onMouseLeave={() => setShowBtn(false)}
      key={id}
      onClick={()=>{
        navigate(`/details/${id}`)
      }}
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
          <CardBody className="position-absolute bottom-0 start-0">
            {imgPath && title ? `${title}` : ""}
            <CardFooter className="border-0 bg-transparent">
              By {username}
            </CardFooter>
          </CardBody>
        </Card.ImgOverlay>
      )}
    </Card>
  );
}
