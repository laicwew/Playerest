import { Draft } from "../../../model/review";

interface savedDraftProps {
  isOpen: boolean;
  setIsOpen: () => void;
  draftList: Draft[];
}

const SavedDraftSidebar = ({
  isOpen,
  setIsOpen,
  draftList,
}: savedDraftProps) => {
  return (
    <div
      className={` ${isOpen ? "draft-sidebar" : ""}`}
      style={{
        margin: "1rem 1rem 0 0",
      }}
    >
      <div className="draft-sidebar__btn-group">
        {isOpen && (
          <button className="draft-sidebar__btn--create">Create New</button>
        )}
        <button className="draft-sidebar__btn--trigger" onClick={setIsOpen}>
          {isOpen ? (
            <span className="fa-solid fa-xmark"></span>
          ) : (
            <span className="fa-solid fa-bars"></span>
          )}
        </button>
      </div>
      <div className={`draft-list ${isOpen ? "sideOpen" : "sideClose"}`}>
        {draftList.map((item) => {
          return (
            <div key={item.id}>
              <div className="list-item">
                <div className="list-item__img-container">
                  <img
                    src={item.imageUrl}
                    alt="picture"
                    className="list-item__img-container__img"
                  />
                </div>
                <div className="list-item__review-intro">
                  {item.title ? item.title : ""} <br />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavedDraftSidebar;
