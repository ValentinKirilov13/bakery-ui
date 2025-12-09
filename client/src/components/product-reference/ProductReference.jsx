import useFetch from "../../hooks/useFetch";
import ProductCard from "../product-card/ProductCard";

export default function ProductReference({productId}) {
    const {data: product} = useFetch(`/data/products/${productId}`, {});

    return <ProductCard {...product} />;
}
