import useFetch from "../../hooks/useFetch";
import {useParams} from "react-router";
import ReviewsSection from "../reviews-section/ReviewsSection";
import ProductImages from "./product-images/ProductImages";
import useForm from "../../hooks/useForm";
import useRequest from "../../hooks/useRequest";
import useUserContext from "../../hooks/useUserContext";

export default function ProductDetails() {
    const {productId} = useParams();
    const [product] = useFetch(`/data/products/${productId}`, {});
    const reviewsParams = new URLSearchParams({
        where: `_productId="${productId}"`,
        load: `author=_ownerId:users`,
    });
    const {request} = useRequest();
    const {isAuthenticated, user} = useUserContext();

    const {registerInput, formAction} = useForm(
        {
            quantity: 1,
        },
        async ({quantity}) => {
            try {
                const cartParams = new URLSearchParams({
                    where: `_ownerId="${user._id}"`,
                });
                const carts = await request(
                    `/data/carts?${cartParams.toString()}`
                );
                const currentCart = carts[0];

                //if (!validate(values)) return;
                const newProductToAdd = {
                    _productId: productId,
                    quantity: Number(quantity),
                };

                const existingProduct = currentCart.products.find(
                    (p) => p._productId === productId
                );

                if (existingProduct) {
                    existingProduct.quantity += newProductToAdd.quantity;
                } else {
                    currentCart.products.push(newProductToAdd);
                }

                await request(
                    `/data/carts/${currentCart._id}`,
                    "PUT",
                    currentCart
                );
            } catch (error) {
                alert(error);
            }
        }
    );

    return (
        <div className="pt-6">
            <ProductImages images={product.imageUrl} />

            <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                        {product.name}
                    </h1>
                </div>

                <div className="mt-4 lg:row-span-3 lg:mt-0">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl tracking-tight text-gray-900">
                        €{product.price}
                    </p>

                    <form action={formAction} className="mt-10">
                        <label
                            htmlFor="number-input"
                            className="block mb-2.5 text-sm font-medium text-heading"
                        >
                            Select quantity:
                        </label>
                        <input
                            type="number"
                            id="number-input"
                            {...registerInput("quantity")}
                            aria-describedby="helper-text-explanation"
                            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-amber-900 outline-1 -outline-offset-1 outline-amber-900 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-amber-500 sm:text-sm/6"
                            min={1}
                            required
                        />

                        <button
                            type="submit"
                            className="cursor-pointer mt-10 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Add to cart
                        </button>
                    </form>
                </div>

                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
                    <div>
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6">
                            <p className="text-base text-gray-900">
                                {product.description}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-20">
                        <div className="mt-10 ">
                            <h3 className="text-sm font-medium text-gray-900">
                                Ingredients
                            </h3>

                            <div className="mt-4">
                                <ul
                                    role="list"
                                    className="list-disc space-y-2 pl-4 text-sm"
                                >
                                    {product.ingredients?.map((ingredient) => (
                                        <li
                                            key={ingredient}
                                            className="text-gray-400"
                                        >
                                            <span className="text-gray-600">
                                                {ingredient}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10 border-l border-gray-300 pl-6">
                            <h3 className="text-sm font-medium text-gray-900">
                                Allergens
                            </h3>

                            <div className="mt-4">
                                <ul
                                    role="list"
                                    className="list-disc space-y-2 pl-4 text-sm"
                                >
                                    {product.allergens?.map((allergen) => (
                                        <li
                                            key={allergen}
                                            className="text-gray-400"
                                        >
                                            <span className="text-gray-600">
                                                {allergen}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="mt-10 border-l border-gray-300 pl-6">
                            <h2 className="text-sm font-medium text-gray-900">
                                Details
                            </h2>

                            <div className="mt-4 space-y-6">
                                <p className="text-sm text-gray-600">
                                    Category: {product.category}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Shelf life: {product.shelfLife}
                                </p>
                                <p className="text-sm text-gray-600">
                                    Weight: {product.weight}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 pb-16 lg:max-w-7xl">
                <ReviewsSection
                    header={"Customer Reviews"}
                    haveWrite
                    emptyReviews={"Be the first to write a review!"}
                    filters={reviewsParams}
                />
            </div>
        </div>
    );
}
