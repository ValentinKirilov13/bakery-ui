import useFetch from "../../hooks/useFetch";
import ProductCard from "../product-card/ProductCard";

export default function Home() {
    const [products] = useFetch(
        "/data/products?sortBy=_createdOn%20desc&pageSize=3",
        []
    );

    return (
        <div className="">
            <div className="max-w-6xl mx-auto px-6 pt-20 pb-10 text-center">
                <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
                    Welcome to Sladotvornica
                </h1>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                    Handcrafted artisan pastries baked fresh every morning.
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                {products.map((product) => (
                    <ProductCard {...product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
