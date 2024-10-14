import { useEffect, useState } from "react";
import { ReviewCard } from "./components/ReviewCard";
import Masonry from "react-layout-masonry";
import { getReviewsByPagination } from "../../helpers/hooks/api/api"; // Import the new function
import { Review } from "../../model/review";

export function Search() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [evaluatedKey, setEvaluatedKey] = useState<string | undefined>(
    undefined
  );

  const fetchReviews = async () => {
    setLoading(true);
    const { reviews, lastEvaluatedKey } = await getReviewsByPagination(
      10,
      evaluatedKey
    ); // Fetch 10 reviews at a time
    if (reviews) {
      setReviews((prevReviews) => [...prevReviews, ...reviews]); // Append new reviews
      setEvaluatedKey(lastEvaluatedKey);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100 && !loading) {
      fetchReviews();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

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
