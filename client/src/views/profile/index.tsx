import { useEffect, useState } from "react";
import profile from "../../assets/placeholder.jpeg";
import { getReviewByAuthor } from "../../helpers/hooks/api/api";
import { Review } from "../../model/review";
import Masonry from "react-layout-masonry";
import { ReviewCard } from "../search/components/ReviewCard";
export function Profile() {
  const [tabContent, setTabContent] = useState(0);
  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user");
  const [posts, setPosts] = useState([] as Review[] | undefined);

  useEffect(() => {
    const fetchData = async () => {
      const reviews = await getReviewByAuthor(user || "unknown User");
      setPosts(reviews);
    };
    fetchData();
  }, [user]);

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
          <h3 className="profile__username">{user}</h3>

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
                {posts && (
                  <Masonry
                    columns={{ 240: 1, 768: 2, 1024: 3, 1280: 4, 1680: 5 }}
                    gap={20}
                    columnProps={{
                      style: {
                        marginTop: "2rem",
                        display: "flex",
                        alignItems: "center",
                      },
                    }}
                  >
                    {posts.map((review) => (
                      <ReviewCard review={review} />
                    ))}
                  </Masonry>
                )}
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
