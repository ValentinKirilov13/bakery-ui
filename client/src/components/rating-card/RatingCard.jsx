import { UserIcon } from "@heroicons/react/20/solid";
import formatJoinDate from "../../utils/formatJoinDate";
import StarRating from "./star-rating/StarRating";
import useFetch from "../../hooks/useFetch";

export default function RatingCard({ _ownerId, stars, review }) {
    const { name, _createdOn } = useFetch(`http://localhost:3030/jsonstore/users/${_ownerId}`, {});

    return (
        <article>
            <div className="flex items-center mb-4">
                <div className="w-11 h-auto">
                    <UserIcon />
                </div>
                <div className="font-medium text-heading">
                    <p>
                        {name}
                        <time dateTime={_createdOn} className="block text-sm text-body">
                            {formatJoinDate(_createdOn)}
                        </time>
                    </p>
                </div>
            </div>
            <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                <StarRating rating={stars} />
            </div>
            <p className="mb-2 text-body">{review}</p>
        </article>
    );
}
