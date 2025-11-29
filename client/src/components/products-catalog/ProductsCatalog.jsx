import ProductsGrid from "../products-grid/ProductsGrid";
import useFetch from "../../hooks/useFetch";

export default function ProductsCatalog() {
    // const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
    const products = useFetch("http://localhost:3030/jsonstore/products", [], (data) =>
        Object.values(data)
    );

    return (
        <div>
            {/* <MobileFiltersDialog isOpen={mobileFiltersOpen} onClose={setMobileFiltersOpen} /> */}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between border-b border-gray-200 pt-10 pb-6">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Products</h1>
                    {/* <SortMenu /> */}
                </div>

                <section aria-labelledby="products-heading" className="pt-6 pb-6">
                    <div>
                        {/* <Filters /> */}
                        <div className="lg:col-span-3">
                            <ProductsGrid products={products} />
                        </div>
                    </div>
                </section>
                {/* <Pagination pages={[1, 2, 3, 4]} /> */}
            </div>
        </div>
    );
}
