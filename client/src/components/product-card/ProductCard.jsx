import {Link} from "react-router";

export default function ProductCard({_id, name, price, imageUrl}) {
    return (
        <Link to={`/products-catalog/${_id}/details`}>
            <div className="rounded-3xl p-5 shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
                <div className="overflow-hidden rounded-2xl">
                    <img
                        alt={name}
                        src={imageUrl?.[0]}
                        className="w-full h-56 object-cover rounded-2xl hover:scale-110 transition duration-500"
                    />
                </div>

                <h2 className="text-2xl font-semibold mt-4">{name}</h2>
                <p className="text-gray-500">€{price?.toFixed(2)}</p>
            </div>
        </Link>
    );
}
