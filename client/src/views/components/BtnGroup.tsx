interface BtnStateProps {
  isDeletable: boolean;
  saved: boolean;
  handleSaved: () => void;
  handleDelete: () => void;
  className: string;
}

const BtnGroup = ({
  isDeletable,
  saved,
  handleSaved,
  handleDelete,
  className,
}: BtnStateProps) => {
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
      {isDeletable && <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
      >
        <span className={"fa-regular fa-trash-can"}></span>
      </button>}
    </div>
  );
};

export default BtnGroup;
