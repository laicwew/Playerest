import { useContext, useEffect, useState } from "react";
import profile from "../../assets/defaultImage.png";
import { Review } from "../../model/review";
import Masonry from "react-layout-masonry";
import { ReviewCard } from "../search/components/ReviewCard";
import { AuthContext } from "../../helpers/AuthContext";
import { profilePresenter } from "../../presenter/ProfilePresenter";

export function Profile() {
  const { isAuthenticated, accessToken, userName } = useContext(AuthContext);
  const [tabContent, setTabContent] = useState(0);
  const [posts, setPosts] = useState<Review[]>([]); // User's posts (reviews)
  const [savedPosts, setSavedPosts] = useState<Review[]>([]); // User's saved posts

  const queryParams = new URLSearchParams(location.search);
  const user = queryParams.get("user") || "unknown User";

  useEffect(() => {
    // Fetch user's reviews
    const fetchUserReviews = async () => {
      const reviews = await profilePresenter.fetchUserReviews(user);
      setPosts(reviews);
    };
    const fetchSavedReviews = async (token: string, user: string) => {
      const reviews = await profilePresenter.fetchSavedReviews(token, user);
      const ids = reviews.map((review) => review.id);
      localStorage.setItem("savedReviewsIds", JSON.stringify(ids));
      setSavedPosts(reviews);
    };

    fetchUserReviews();
    // If logged in user matches the profile being viewed, fetch saved posts
    if (userName && userName === user && accessToken) {
      fetchSavedReviews(accessToken, userName);
    }
  }, [user, userName, accessToken]);

  const handleDelete = (reviewId: number | undefined) => {
    if (isAuthenticated && reviewId) {
      profilePresenter.deleteReview(reviewId);
      posts.filter((review) => review.id !== reviewId);
    } else {
      alert("Please login first!");
    }
  };

  return (
    <div className="profile">
      <div className="profile__container">
        <div className="profile__container_img">
          <img
            src={profile}
            alt="profile pic"
            className="profile__container_image"
          ></img>
        </div>
        <h3 className="profile__info">{user}</h3>
      </div>
      <div className="profile__folder">
        <div className="profile__folder_tab">
          <button
            className="profile__folder_tab btn--create"
            onClick={() => setTabContent(0)}
          >
            Created
          </button>
          {user === userName && (
            <button
              className="profile__folder_tab btn--save"
              onClick={() => setTabContent(1)}
            >
              Saved
            </button>
          )}
        </div>
        <hr className="profile__folder_line" />
        <div className="profile__folder_files">
          {tabContent === 0 ? (
            <div className="profile__files--created">
              <h3 className="profile__info">Created Reviews</h3>
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
                    <ReviewCard
                      key={review.id}
                      isDeletable={isAuthenticated}
                      handleDelete={() => handleDelete(review.id)}
                      review={review}
                    />
                  ))}
                </Masonry>
              )}
            </div>
          ) : (
            <div className="profile__files--saved">
              <h3 className="profile__info">Saved Reviews</h3>
              {savedPosts && (
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
                  {savedPosts.map((review) => (
                    <ReviewCard
                      isDeletable={false}
                      handleDelete={() => handleDelete(review.id)}
                      review={review}
                    />
                  ))}
                </Masonry>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
