import { useState, useEffect } from "react";
import { useUserSavedReviewsIds } from "./useUserSavedReviews";

export function useIsReviewSaved(id: number | undefined) {
  const { savedReviewsIds } = useUserSavedReviewsIds();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      const newIsSaved = savedReviewsIds.includes(id);
      // Only update state if the value has actually changed
      if (newIsSaved !== isSaved) {
        setIsSaved(newIsSaved);
      }
    }
  }, [id, savedReviewsIds, isSaved]);

  return { isSaved };
}
