import useUserContext from "../../hooks/useUserContext";
import formatDate from "../../utils/formatDate";
import ReviewsSection from "../reviews-section/ReviewsSection";

export default function Profile() {
    const {user} = useUserContext();
    const reviewsParams = new URLSearchParams({
        where: `_ownerId="${user._id}"`,
        load: `author=_ownerId:users`,
    });
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between  border-gray-200 pt-10 pb-6">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 px-4">
                    Profile
                </h1>
            </div>

            <section aria-labelledby="products-heading" className="px-6">
                <div className="space-y-4 text-lg">
                    <p>
                        <span className="font-semibold">Email: </span>
                        {user.email}
                    </p>
                    <p>
                        <span className="font-semibold">Member Since: </span>
                        {formatDate(user._createdOn)}
                    </p>
                </div>
            </section>

            <div className="mx-auto max-w-2xl px-4 pb-16 lg:max-w-7xl">
                <ReviewsSection
                    header={"My Reviews"}
                    haveProductRef
                    emptyReviews={"You haven't made any reviews yet!"}
                    filters={reviewsParams}
                />
            </div>
        </div>
    );
}
