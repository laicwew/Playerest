import { Review } from "../../../helpers/hooks/api/useReview"

export default function ReviewDetails({
    review,
    className
}: {
    review: Review
    className?: string
}) {
    return (
        <div className={`${className}`}>
            {review.content}
        </div>
    )
}