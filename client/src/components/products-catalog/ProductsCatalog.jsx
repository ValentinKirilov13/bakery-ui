import useFetch from "../../hooks/useFetch";
import ProductCard from "../product-card/ProductCard";

export default function ProductsCatalog() {
    const [products] = useFetch("/data/products", []);

    return (
        <div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between  border-gray-200 pt-10 pb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                        Products
                    </h1>
                </div>

                <section
                    aria-labelledby="products-heading"
                    className="pt-6 pb-6"
                >
                    <div>
                        <div className="lg:col-span-3">
                            <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl">
                                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                    {products.map((product) => (
                                        <ProductCard
                                            {...product}
                                            key={product._id}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
