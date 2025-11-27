import ProductCard from "../product-card/ProductCard";

export default function ProductsGrid({ products }) {
    return (
        <div className="mx-auto max-w-2xl px-4 lg:max-w-7xl">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products.map((product) => (
                    <ProductCard {...product} key={product._id} />
                ))}
            </div>
        </div>
    );
}
