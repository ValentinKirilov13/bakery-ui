import {useState} from "react";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import {useLocation, useNavigate} from "react-router";

export default function ReviewForm({initialState, isEdit}) {
    const [hover, setHover] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState([]);
    const minReviewLength = 20;
    const {request} = useRequest();
    const navigate = useNavigate();
    const {state} = useLocation();
    const from = state?.from?.pathname || "/";

    const validate = ({title, review, stars}) => {
        const errs = [];
        if (stars < 1 || stars > 5)
            errs.push("Please choose a rating between 1 and 5.");
        if (!title.trim()) errs.push("Please add a short title.");
        if (review.trim().length < minReviewLength)
            errs.push(
                `Review should be at least ${minReviewLength} characters.`
            );
        setErrors(errs);
        return errs.length === 0;
    };

    const {values, registerInput, formAction, changeHandler} = useForm(
        initialState,
        async (values) => {
            try {
                setSubmitting(true);

                if (!validate(values)) return;

                await request(
                    `/data/reviews/${isEdit && values._id}`,
                    isEdit ? "PUT" : "POST",
                    values
                );

                navigate(from);
            } catch (error) {
                alert(error);
            } finally {
                setSubmitting(false);
            }
        }
    );

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <form action={formAction} className="space-y-4">
                <h3 className="text-xl font-semibold">Write a review</h3>

                <div>
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={changeHandler}
                                name="stars"
                                value={i}
                                onMouseEnter={() => setHover(i)}
                                onMouseLeave={() => setHover(null)}
                                className={`${
                                    (hover ? i <= hover : i <= values.stars)
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                }  text-4xl p-1 rounded-md focus:outline-none`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium mb-1"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        {...registerInput("title")}
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="Short summary"
                    />
                </div>

                <div>
                    <label
                        htmlFor="review"
                        className="block text-sm font-medium mb-1"
                    >
                        Review
                    </label>
                    <textarea
                        id="review"
                        {...registerInput("review")}
                        rows={5}
                        className="w-full rounded-lg border px-3 py-2"
                        placeholder="Describe your experience"
                    />
                </div>

                {errors.length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                        {errors.map((e, i) => (
                            <div key={i}>{e}</div>
                        ))}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center cursor-pointer px-4 py-2 rounded-md  bg-amber-500 hover:bg-amber-600 text-white font-semibold nded-lg transition-colors duration-200"
                >
                    {submitting && (
                        <svg
                            aria-hidden="true"
                            role="status"
                            className="w-4 h-4 me-2 text-white animate-spin"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="#E5E7EB"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                    {submitting ? " Loading..." : "Submit review"}
                </button>
            </form>
        </div>
    );
}
