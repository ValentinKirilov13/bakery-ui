import {useState} from "react";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import {useLocation, useNavigate} from "react-router";
import {toast} from "react-toastify";

export default function ReviewForm({initialState, isEdit}) {
    const [hover, setHover] = useState(null);
    const {request} = useRequest();
    const navigate = useNavigate();
    const {state} = useLocation();
    const from = state?.from?.pathname || "/";

    const {values, errors, touched, registerInput, formAction, changeHandler} =
        useForm(
            initialState,
            async (values) => {
                try {
                    await request(
                        `/data/reviews${isEdit ? `/${values._id}` : ""}`,
                        isEdit ? "PUT" : "POST",
                        values
                    );

                    toast.success(
                        "Your review has been submitted successfully!"
                    );

                    navigate({
                        pathname: from,
                        hash: "#reviews-section",
                    });
                } catch (err) {
                    toast.error(err?.message);
                }
            },
            ({title, review, stars}) => {
                const newErrors = {};

                if (stars < 1 || stars > 5) {
                    newErrors.stars = "Please choose a rating between 1 and 5.";
                }

                if (!title?.trim()) {
                    newErrors.title = "Please add a short title.";
                }

                if (!review?.trim() || review.trim().length < 20) {
                    newErrors.review = `Review should be at least ${20} characters.`;
                }

                return newErrors;
            }
        );

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white rounded-3xl shadow-[0_6px_20px_rgba(0,0,0,0.08)] mt-20">
            <form action={formAction} className="space-y-6">
                <h1 className="text-3xl font-bold mb-8"> Write a Review</h1>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                    </label>

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
                                className={`transition text-4xl p-1 rounded-md 
                            ${
                                (hover ? i <= hover : i <= values.stars)
                                    ? "text-amber-400 scale-110"
                                    : "text-gray-300"
                            }`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    {touched.stars && errors.stars && values.stars < 1 && (
                        <p className="text-red-500 text-sm font-semibold">
                            {errors.stars}
                        </p>
                    )}
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <input
                        id="title"
                        {...registerInput("title")}
                        className="w-full rounded-xl border border-gray-300 px-4 py-2.5 shadow-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                        placeholder="Short summary"
                    />
                    {touched.title && errors.title && (
                        <p className="text-red-500 text-sm font-semibold">
                            {errors.title}
                        </p>
                    )}
                </div>
                <div className="space-y-1">
                    <label
                        htmlFor="review"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Review
                    </label>
                    <textarea
                        id="review"
                        {...registerInput("review")}
                        rows={5}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 shadow-sm focus:ring-2 focus:ring-amber-400 outline-none transition"
                        placeholder="Describe your experience"
                    />
                    {touched.review && errors.review && (
                        <p className="text-red-500 text-sm font-semibold">
                            {errors.review}
                        </p>
                    )}
                </div>
                <button
                    type="submit"
                    className="cursor-pointer w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold shadow-md transition disabled:opacity-60"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
}
