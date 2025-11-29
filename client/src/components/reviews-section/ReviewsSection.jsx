import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import RatingCard from "../rating-card/RatingCard";

export default function ReviewsSection() {
    const { productId } = useParams();
    const reviews = useFetch(`http://localhost:3030/jsonstore/reviews`, [], (data) =>
        Object.values(data).filter((x) => x._productId === productId)
    );

    return (
        <section className="mt-10 bg-white  p-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Customer Reviews</h2>
                <button className="cursor-pointer px-4 py-2 rounded-md  bg-amber-500 hover:bg-amber-600 text-white font-semibold nded-lg transition-colors duration-200">
                    Write a Review
                </button>
            </div>

            <div className="space-y-6">
                {reviews.map((review) => (
                    <RatingCard {...review} key={review._id} />
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="flex items-center justify-center py-3">
                    <p className="text-gray-500 text-center text-lg">
                        Be the first to write a review!
                    </p>
                </div>
            )}
        </section>
    );
}
