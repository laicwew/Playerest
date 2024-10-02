import { useState } from "react";

const BtnGrupp = () => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleLiked = () => {
    setLiked((prevState) => !prevState);
  };
  const handleSaved = () => {
    setSaved((prevState) => !prevState);
  };
  return (
    <div className="btn-group">
      <button onClick={handleSaved} className="btn-group__saveBtn">
        <i className={`fa-${saved ? "solid" : "regular"} fa-star`}></i>
      </button>
      <button onClick={handleLiked} className="btn-group__likeBtn">
        <i className={`fa-${liked ? "solid" : "regular"} fa-heart`}></i>
      </button>
    </div>
  );
};

export default BtnGrupp;
