import {useCallback, useState} from "react";
import useFetch from "../../hooks/useFetch";
import useUserContext from "../../hooks/useUserContext";
import {PageSpinner} from "../page-spinner/PageSpinner";
import CartItem from "./cart-item/CartItem";
import useRequest from "../../hooks/useRequest";
import {toast} from "react-toastify";

export default function Cart() {
    const {user} = useUserContext();
    const {
        data: cart,
        loading: cartLoading,
        setData: setCart,
    } = useFetch(`/data/carts/${user?._cartId}`, {});
    const {request} = useRequest();
    const [totals, setTotals] = useState({});

    const totalPriceSetHandler = useCallback((id, price) => {
        setTotals((prev) => ({...prev, [id]: price}));
    }, []);

    const updateQuantityHandler = async (productId, quantity) => {
        try {
            const updatedProducts = cart.products.map((item) =>
                item._productId === productId ? {...item, quantity} : item
            );

            const updatedCart = {
                ...cart,
                products: updatedProducts,
            };

            await request(`/data/carts/${cart._id}`, "PUT", updatedCart);

            setCart(updatedCart);
        } catch (err) {
            toast.error(err?.message);
        }
    };

    const deleteProductHandler = async (productId) => {
        try {
            const updatedProducts = cart.products.filter(
                (item) => item._productId !== productId
            );

            const updatedCart = {
                ...cart,
                products: updatedProducts,
            };

            await request(`/data/carts/${cart._id}`, "PUT", updatedCart);

            setCart(updatedCart);
            totalPriceSetHandler(productId, 0);
        } catch (err) {
            toast.error(err?.message);
        }
    };

    if (cartLoading) return <PageSpinner />;

    return (
        <div className=" max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl mt-20 mb-20">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            {cart.products?.map((product) => (
                <CartItem
                    {...product}
                    key={product._productId}
                    onTotalPriceSet={totalPriceSetHandler}
                    onUpdateQuantity={updateQuantityHandler}
                    onDeleteItem={deleteProductHandler}
                />
            ))}

            <div className="flex justify-between text-2xl font-semibold mt-6">
                <span>Total</span>
                <span>
                    €
                    {Object.values(totals)
                        .reduce((sum, p) => sum + p, 0)
                        .toFixed(2)}
                </span>
            </div>

            <button className="cursor-pointer mt-10 w-full text-xl bg-amber-500 text-white py-4 rounded-2xl shadow-xl hover:bg-amber-600 transition">
                Proceed to Checkout
            </button>
        </div>
    );
}
