import {UserIcon} from "@heroicons/react/20/solid";
import formatDate from "../../utils/formatDate";
import StarRating from "./star-rating/StarRating";
import {Link, useLocation, useParams} from "react-router";

export default function RatingCard({
    _id,
    title,
    stars,
    review,
    _createdOn,
    author,
}) {
    const location = useLocation();
    const {productId} = useParams();

    return (
        <article className="flex">
            <div className="grow">
                <div className="flex items-center mb-4">
                    <div className="w-11 h-auto">
                        <UserIcon />
                    </div>
                    <div className="font-medium text-heading">
                        <p>
                            {author.email}
                            <time
                                dateTime={author._createdOn}
                                className="block text-sm text-body"
                            >
                                Joined on {formatDate(author._createdOn)}
                            </time>
                        </p>
                    </div>
                </div>
                <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                    <StarRating rating={stars} />
                </div>
                <p className="font-medium">{title}</p>
                <p className="mb-2 text-body">{review}</p>
                <p className="text-sm italic">
                    Reviewed on {formatDate(_createdOn)}
                </p>
            </div>
            <div>
                <Link
                    state={{from: location}}
                    to={`/products-catalog/${productId}/edit-review/${_id}`}
                    className="cursor-pointer px-4 py-2 rounded-md  bg-amber-500 hover:bg-amber-600 text-white font-semibold nded-lg transition-colors duration-200"
                >
                    Edit
                </Link>
            </div>
        </article>
    );
}
