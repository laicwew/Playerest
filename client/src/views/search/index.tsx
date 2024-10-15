import { useEffect, useState } from "react";
import { ReviewCard } from "./components/ReviewCard";
import Masonry from "react-layout-masonry";
import { Review } from "../../model/review";
import { searchPresenter } from "../../presenter/SearchPresenter";

export function Search() {
  const [reviews, setReviews] = useState<Review[]>([]); // Reviews state
  const [loading, setLoading] = useState(false); // Loading state
  const [evaluatedKey, setEvaluatedKey] = useState<number | undefined>(
    undefined
  ); // Pagination key

  // Fetch reviews when component mounts
  useEffect(() => {
    searchPresenter.fetchReviews(
      evaluatedKey,
      setReviews,
      setEvaluatedKey,
      setLoading
    );
  }, [evaluatedKey]);

  // Handle scrolling to load more reviews
  useEffect(() => {
    const handleScroll = () => {
      searchPresenter.handleScroll(loading, () => {
        searchPresenter.fetchReviews(
          evaluatedKey,
          setReviews,
          setEvaluatedKey,
          setLoading
        );
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, evaluatedKey]);

  return (
    <div>
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
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </Masonry>
      {loading && (
        <div className="loading-indicator">Loading more reviews...</div>
      )}{" "}
      {/* Loading indicator */}
    </div>
  );
}
