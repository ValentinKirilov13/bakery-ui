import {Link, useLocation, useParams} from "react-router";
import useFetch from "../../hooks/useFetch";
import RatingCard from "../rating-card/RatingCard";
import useUserContext from "../../hooks/useUserContext";

export default function ReviewsSection() {
    const location = useLocation();
    const {productId} = useParams();
    const {isAuthenticated} = useUserContext();
    const urlParams = new URLSearchParams({
        where: `_productId="${productId}"`,
        load: `author=_ownerId:users`,
    });
    const reviews = useFetch(`/data/reviews?${urlParams.toString()}`, []);

    return (
        <section className="mt-10 bg-white  p-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    Customer Reviews
                </h2>
                {isAuthenticated && (
                    <Link
                        state={{from: location}}
                        to={`/products-catalog/${productId}/write-review`}
                        className="cursor-pointer px-4 py-2 rounded-md  bg-amber-500 hover:bg-amber-600 text-white font-semibold nded-lg transition-colors duration-200"
                    >
                        Write a Review
                    </Link>
                )}
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
