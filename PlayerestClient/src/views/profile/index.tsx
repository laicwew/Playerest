import { useState } from "react";
import profile from "../../assets/placeholder.jpeg";
export function Profile() {
  const [tabContent, setTabContent] = useState(0);

  return (
    <>
      <div className="profile">
        <div className="profile__container">
          <div className="profile__container_img">
            <img
              src={profile}
              alt="profile pic"
              className="profile__container_image"
            ></img>
          </div>
          <h3 className="profile__username">UserName</h3>
          <button>Edit Profile</button>
        </div>
        <div className="profile__folder">
          <div className="profile__folder_tab">
            <button className="btn--create" onClick={() => setTabContent(0)}>
              Created
            </button>
            <button className="btn--save" onClick={() => setTabContent(1)}>
              Saved
            </button>
          </div>
          <div className="profile__folder_files">
            {tabContent === 0 ? (
              <div className="profile__files--created">
                <h3>Created Reviews</h3>
              </div>
            ) : (
              <div className="profile__files--saved">
                <h3>Saved Reviews</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
