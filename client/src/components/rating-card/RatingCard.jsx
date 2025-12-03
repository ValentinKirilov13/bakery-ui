import {UserIcon} from "@heroicons/react/20/solid";
import formatDate from "../../utils/formatDate";
import StarRating from "./star-rating/StarRating";
import {Link, useLocation} from "react-router";
import useUserContext from "../../hooks/useUserContext";
import ProductReference from "../product-reference/ProductReference";
import {useState} from "react";
import ConfirmModal from "../confirm-modal/ConfirmModal";

export default function RatingCard({
    _id,
    title,
    stars,
    review,
    _createdOn,
    _productId,
    author,
    onDelete,
    haveProductRef,
}) {
    const location = useLocation();
    const {isAuthenticated, user} = useUserContext();
    const [showModal, setShowModal] = useState(false);

    const closeModalHandler = () => {
        setShowModal(false);
    };

    const openModalHandler = () => {
        setShowModal(true);
    };

    const confirmModalHandler = () => {
        onDelete(_id);
        closeModalHandler();
    };

    return (
        <article className="flex justify-between items-start gap-6 bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
                        <UserIcon className="w-6 h-6" />
                    </div>

                    <div>
                        <p className="font-semibold text-gray-800">
                            {author.email}
                        </p>
                        <time className="text-sm text-gray-500">
                            Joined on {formatDate(author._createdOn)}
                        </time>
                    </div>
                </div>

                <div className="mb-2">
                    <StarRating rating={stars} />
                </div>

                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-gray-600 mb-2">{review}</p>

                <p className="text-sm text-gray-500 italic">
                    Reviewed on {formatDate(_createdOn)}
                </p>
            </div>

            {isAuthenticated && user._id === author._id && (
                <div className="flex flex-col gap-2 text-center">
                    <Link
                        state={{from: location}}
                        to={`/products-catalog/${_productId}/edit-review/${_id}`}
                        className="px-3 py-2 text-sm rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={openModalHandler}
                        className="cursor-pointer px-3 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
                    >
                        Delete
                    </button>
                </div>
            )}

            {haveProductRef && (
                <div className="w-72 shrink-0">
                    <ProductReference productId={_productId} />
                </div>
            )}

            <ConfirmModal
                open={showModal}
                onClose={closeModalHandler}
                message="Are you sure you want to delete this review? This action cannot be undone."
                onConfirm={confirmModalHandler}
                action="DELETE"
                confirmText="Delete"
                title="Confirm Delete"
            />
        </article>
    );
}
