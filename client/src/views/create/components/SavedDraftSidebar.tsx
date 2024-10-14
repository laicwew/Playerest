interface savedDraftProps {
  isOpen: boolean;
  setIsOpen: () => void;
  draftList: DraftList[];
  loadDraft: (draft: {
    id: number;
    rate?: number;
    imgURL?: string;
    title?: string;
    createdDate?: string;
  }) => void;
  createNew: () => void;
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
  createNew,
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
          <button onClick={createNew} className="draft-sidebar__btn--create">
            Create New
          </button>
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
        <div>
          {draftList.map((item) => {
            return (
              <div key={item.id} onClick={() => loadDraft(item)}>
                <div className="list-item">
                  <div className="list-item__img-container">
                    <img
                      src={item.imgURL}
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
