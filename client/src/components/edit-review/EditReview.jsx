import {useParams} from "react-router";
import ReviewForm from "../review-form/ReviewForm";
import useFetch from "../../hooks/useFetch";

export default function EditReview() {
    const {reviewId} = useParams();

    const review = useFetch(`/data/reviews/${reviewId}`, {});

    return <ReviewForm initialState={review} isEdit />;
}
