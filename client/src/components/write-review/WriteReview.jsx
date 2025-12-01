import {useParams} from "react-router";
import ReviewForm from "../review-form/ReviewForm";

export default function WriteReview() {
    const {productId} = useParams();

    return (
        <ReviewForm
            initialState={{
                title: "",
                review: "",
                stars: 0,
                _productId: productId,
            }}
        />
    );
}
