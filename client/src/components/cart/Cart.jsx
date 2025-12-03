export default function Cart() {
    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-2xl mt-20">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            <div className="flex justify-between items-center bg-gray-100 rounded-2xl p-4 mb-6 shadow-md">
                <div className="flex items-center gap-4">
                    <img
                        src="/product.jpg"
                        className="w-20 h-20 rounded-xl object-cover shadow"
                    />
                    <div>
                        <h2 className="text-lg font-semibold">Ekleri</h2>
                        <p className="text-gray-500 text-sm">Quantity: 1</p>
                    </div>
                </div>
                <span className="text-lg font-bold">€5.99</span>
            </div>

            <div className="flex justify-between text-2xl font-semibold mt-6">
                <span>Total</span>
                <span>€5.99</span>
            </div>

            <button className="mt-10 w-full text-xl bg-amber-500 text-white py-4 rounded-2xl shadow-xl hover:bg-amber-600 transition">
                Proceed to Checkout
            </button>
        </div>
    );
}
