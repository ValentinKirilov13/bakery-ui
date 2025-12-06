import useFetch from "../../hooks/useFetch";
import useUserContext from "../../hooks/useUserContext";

export default function Cart() {
    const {user} = useUserContext();
    const [cart] = useFetch(`/data/carts/${user?._cartId}`, {});
    const productIds = cart?.products?.map((p) => p._productId) || [];
    const [products] = useFetch(
        `/data/products?where=_id%20IN%20("${productIds.join('","')}")`,
        []
    );

    const detailedCart = cart?.products?.map((item) => ({
        ...item,
        product: products.find((p) => p._id === item._productId),
    }));

    const totalPrice = detailedCart?.reduce(
        (sum, item) => sum + item.quantity * item.product?.price,
        0
    );

    return (
        <div className=" max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl mt-20 mb-20">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            {detailedCart?.map((product) => (
                <div
                    key={product._productId}
                    className="flex justify-between items-center bg-gray-100 rounded-2xl p-4 mb-6 shadow-md"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={product.product?.imageUrl?.[0]}
                            className="w-20 h-20 rounded-xl object-cover shadow"
                        />
                        <div>
                            <h2 className="text-lg font-semibold">
                                {product.product?.name}
                            </h2>
                            <p className="text-gray-500 text-sm">
                                Quantity: {product?.quantity} x{" "}
                                {product?.product?.price?.toFixed(2)}
                            </p>
                        </div>
                    </div>
                    <span className="text-lg font-bold">
                        €
                        {(product?.quantity * product?.product?.price)?.toFixed(
                            2
                        )}
                    </span>
                </div>
            ))}

            <div className="flex justify-between text-2xl font-semibold mt-6">
                <span>Total</span>
                <span>€{totalPrice?.toFixed(2)}</span>
            </div>

            <button className="cursor-pointer mt-10 w-full text-xl bg-amber-500 text-white py-4 rounded-2xl shadow-xl hover:bg-amber-600 transition">
                Proceed to Checkout
            </button>
        </div>
    );
}
