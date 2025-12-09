import {Link} from "react-router";
import useFetch from "../../../hooks/useFetch";
import {PageSpinner} from "../../page-spinner/PageSpinner";
import {useEffect, useState} from "react";
import useForm from "../../../hooks/useForm";
import Spinner from "../../page-spinner/spinner/Spinner";
import {
    CheckIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";

export default function CartItem({
    _productId,
    quantity,
    onTotalPriceSet,
    onUpdateQuantity,
    onDeleteItem,
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const {data: product, loading} = useFetch(
        `/data/products/${_productId}`,
        {}
    );

    useEffect(() => {
        if (product._id) {
            onTotalPriceSet(product._id, quantity * product.price);
        }
    }, [product, quantity, onTotalPriceSet]);

    const {
        registerInput,
        formAction,
        loading: quantityLoading,
        touched,
        errors,
        submittingHandler,
    } = useForm(
        {productId: _productId, quantity},
        async ({productId, quantity}) => {
            await onUpdateQuantity(productId, quantity);
            setIsEditing(false);
        },
        ({quantity}) => {
            const newErrors = {};

            if (quantity == null) {
                newErrors.quantity = "Quantity is required.";
            } else if (quantity < 1) {
                newErrors.quantity = "Quantity must be at least 1.";
            }

            return newErrors;
        }
    );

    if (loading) return <PageSpinner />;

    return (
        <div className="flex justify-between items-stretch bg-gray-100 rounded-2xl p-4 mb-6 shadow-md">
            <div className="flex items-center gap-4">
                <Link to={`/products-catalog/${product._id}/details`}>
                    <div className="rounded-3xl p-5 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                        <div className="overflow-hidden rounded-2xl">
                            <img
                                alt={product.name}
                                src={product.imageUrl?.[0]}
                                className="w-20 h-20 object-cover rounded-2xl hover:scale-110 transition duration-500"
                            />
                        </div>
                    </div>
                </Link>
                <div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <div className="text-gray-500 text-sm">
                        {!isEditing ? (
                            <div className="flex items-center gap-2">
                                <span>
                                    {quantity} x {product.price?.toFixed(2)}
                                </span>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md text-white bg-amber-500 hover:bg-amber-600 transition"
                                >
                                    <PencilIcon className="w-5 h-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <form
                                    action={formAction}
                                    className="flex gap-3 items-center"
                                >
                                    <input
                                        disabled={quantityLoading}
                                        type="number"
                                        id="number-input"
                                        {...registerInput("quantity")}
                                        aria-describedby="helper-text-explanation"
                                        className="w-20 rounded-md bg-white/5 px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                                    />

                                    <button
                                        type="submit"
                                        onClick={submittingHandler}
                                        className="bg-amber-500 cursor-pointer  items-center px-2 py-1 rounded-md text-white  hover:bg-amber-600 transition"
                                    >
                                        <CheckIcon className="w-4 h-5" />
                                    </button>
                                </form>

                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="bg-red-500 cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md text-white hover:bg-red-700 transition"
                                >
                                    <XMarkIcon className="w-4 h-5" />
                                </button>

                                {touched.quantity && errors.quantity && (
                                    <p className="text-red-500 text-sm font-semibold">
                                        {errors.quantity}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="text-lg font-bold flex flex-col gap-5">
                <div className="flex justify-end">
                    <button
                        disabled={deleteLoading}
                        onClick={() => {
                            setDeleteLoading(true);
                            onDeleteItem(product._id);
                        }}
                        className={`${
                            deleteLoading ? "" : "bg-red-500 hover:bg-red-700"
                        } cursor-pointer flex items-center gap-1 px-2 py-1 rounded-md text-white transition`}
                    >
                        {deleteLoading ? (
                            <Spinner />
                        ) : (
                            <TrashIcon className="w-4 h-5" />
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-center">
                    {quantityLoading ? (
                        <Spinner />
                    ) : (
                        `€${(quantity * product.price)?.toFixed(2)}`
                    )}
                </div>
            </div>
        </div>
    );
}
