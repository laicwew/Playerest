import { ReviewCard } from "../../search/components/ReviewCard";

export function RecommendReviews() {
    //TODO: fetchRecommendReviews()
    const reviews = [
        { id: 1, title: "Nice to meet you!", src: "../../../src/assets/placeholder/1.jpeg" },
        { id: 2, title: "Nice to meet you!" },
        { id: 3, title: "Nice to meet you!", src: "../../../src/assets/placeholder/2.jpeg" },
        { id: 4, title: "Nice to meet you!" },
      ];
    return (<div>
        <h2>Similar Game Reviews</h2>
        <div className="row gap-3 align-items-center">
        {reviews.map((obj) => (
          <ReviewCard key={obj.id} id={obj.id} imgPath={obj.src} title={obj.title} />
        ))}
        </div>
    </div>)
}