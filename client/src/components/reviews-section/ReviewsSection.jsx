import {Link, useLocation, useParams} from "react-router";
import useFetch from "../../hooks/useFetch";
import RatingCard from "../rating-card/RatingCard";
import useUserContext from "../../hooks/useUserContext";
import useRequest from "../../hooks/useRequest";

export default function ReviewsSection({
    header,
    haveWrite,
    emptyReviews,
    filters,
    haveProductRef,
}) {
    const location = useLocation();
    const {productId} = useParams();
    const {isAuthenticated} = useUserContext();
    const {request} = useRequest();
    const [reviews, setReviews] = useFetch(
        `/data/reviews?${filters.toString()}`,
        []
    );

    const deleteReviewHandler = async (reviewId) => {
        try {
            await request(`/data/reviews/${reviewId}`, "DELETE");

            setReviews((state) =>
                state.filter((review) => review._id !== reviewId)
            );
        } catch (error) {
            alert(error);
        }
    };

    return (
        <section className="mt-10 p-2">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">
                    {header}
                </h2>
                {isAuthenticated && haveWrite && (
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
                    <RatingCard
                        {...review}
                        key={review._id}
                        haveProductRef={haveProductRef}
                        onDelete={deleteReviewHandler}
                    />
                ))}
            </div>

            {reviews.length === 0 && (
                <div className="flex items-center justify-center py-3">
                    <p className="text-gray-500 text-center text-lg">
                        {emptyReviews}
                    </p>
                </div>
            )}
        </section>
    );
}
