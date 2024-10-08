import defaultImage from "../../../assets/defaultImage.png";
interface savedDraftProps {
  isOpen: boolean;
  setIsOpen: () => void;
  draftList: DraftList[];
  loadDraft: (draft: {
    id: number;
    imgURL?: string;
    title?: string;
    createdDate?: string;
  }) => void;
}

interface DraftList {
  id: number;
  imgURL?: string;
  title?: string;
  createdDate?: string;
}

const SavedDraftSidebar = ({
  isOpen,
  setIsOpen,
  draftList,
  loadDraft,
}: savedDraftProps) => {
  return (
    <div className="draft-sidebar">
      <button className="draft-sidebar__btn--trigger" onClick={setIsOpen}>
        {isOpen ? (
          <span className="fa-solid fa-xmark"></span>
        ) : (
          <span className="fa-solid fa-arrow-right"></span>
        )}
      </button>
      <div className={`draft-list ${isOpen ? "sideOpen" : "sideClose"}`}>
        <div>
          {draftList.map((item) => {
            return (
              <div key={item.id} onClick={() => loadDraft(item)}>
                <div className="list-item">
                  <div className="list-item__img-container">
                    <img
                      src={`${item.imgURL ? item.imgURL : defaultImage}`}
                      alt="picture"
                      className="list-item__img-container__img"
                    />
                  </div>
                  <div className="list-item__review-intro">
                    {item.title ? item.title : ""} <br /> {item.createdDate}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavedDraftSidebar;
