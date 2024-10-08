interface btnStateProps {
  liked: boolean;
  saved: boolean;
  handleSaved: () => void;
  handleLiked: () => void;
  className: string;
}

const BtnGroup = ({
  liked,
  saved,
  handleSaved,
  handleLiked,
  className,
}: btnStateProps) => {
  return (
    <div className={`${className} btn-group`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSaved();
        }}
      >
        <span className={`fa-${saved ? "solid" : "regular"} fa-star`}></span>
      </button>
      <button onClick={(e) => {
          e.stopPropagation();
          handleLiked();
        }}>
        <span className={`fa-${liked ? "solid" : "regular"} fa-heart`}></span>
      </button>
    </div>
  );
};

export default BtnGroup;
