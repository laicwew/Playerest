interface btnStateProps {
  liked: boolean;
  saved: boolean;
  handleSaved: () => void;
  handleLiked: () => void;
}

const BtnGrupp = ({
  liked,
  saved,
  handleSaved,
  handleLiked,
}: btnStateProps) => {
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
