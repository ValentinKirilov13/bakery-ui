import {useParams} from "react-router";
import ReviewForm from "../review-form/ReviewForm";
import useFetch from "../../hooks/useFetch";
import {PageSpinner} from "../page-spinner/PageSpinner";

export default function EditReview() {
    const {reviewId} = useParams();

    const {data: review, loading} = useFetch(`/data/reviews/${reviewId}`, {});

    if (loading) return <PageSpinner />;

    return <ReviewForm initialState={review} isEdit />;
}
