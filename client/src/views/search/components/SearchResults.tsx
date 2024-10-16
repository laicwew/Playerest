// src/views/SearchResults.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchReviews } from "../../../helpers/hooks/api/api";
import Masonry from "react-layout-masonry";
import { Review } from "../../../model/review";
import { ReviewCard } from "./ReviewCard";

export function SearchResults() {
  const location = useLocation();
  const [reviews, setReviews] = useState([] as Review[] | undefined);
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query");

  useEffect(() => {
    const search = async () => {
      const reviews = await searchReviews(searchTerm ?? "");
      setReviews(reviews);
    };
    search();
  });

  return (
    <div>
      {/* Render the search results based on the searchTerm */}
      {reviews ? (
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
            <ReviewCard isDeletable={false} handleDelete={()=>{}} review={review} />
          ))}
        </Masonry>
      ) : (
        <div>No Results</div>
      )}
    </div>
  );
}
