import { getReviewsByPagination } from "../helpers/hooks/api/api";
import { Review } from "../model/review";

class SearchPresenter {
  // Fetch reviews and handle pagination
  async fetchReviews(
    evaluatedKey: number | undefined,
    setReviews: (callback: (prevReviews: Review[]) => Review[]) => void,
    setEvaluatedKey: (key: number | undefined) => void,
    setLoading: (loading: boolean) => void
  ): Promise<void> {
    try {
      setLoading(true);
      // Simulate network delay (if required)
      await this.delay(400);

      // Fetch 10 reviews at a time with pagination
      const { reviews, newLastEvaluatedKey } = await getReviewsByPagination(
        10,
        evaluatedKey
      );

      if (reviews) {
        setReviews((prevReviews: Review[]) => [...prevReviews, ...reviews]); // Update the reviews
        setEvaluatedKey(newLastEvaluatedKey); // Update pagination key
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setLoading(false);
    }
  }

  // Method to simulate a delay
  delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Handle scrolling and fetching more reviews
  handleScroll(
    loading: boolean,
    evaluatedKey: number | undefined,
    fetchReviews: () => void
  ): void {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100 && !loading) {
      fetchReviews();
    }
  }
}

export const searchPresenter = new SearchPresenter();
