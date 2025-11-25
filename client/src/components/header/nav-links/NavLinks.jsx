import { Link } from "react-router";
import {
    HomeIcon,
    BookOpenIcon,
    ShoppingBagIcon,
    InformationCircleIcon,
} from "@heroicons/react/24/outline";

const links = [
    {
        _id: 1,
        name: "Home",
        to: "/",
        icon: HomeIcon,
    },
    {
        _id: 2,
        name: "Products",
        to: "/products",
        icon: ShoppingBagIcon,
    },
    {
        _id: 3,
        name: "Blog",
        to: "/blog",
        icon: BookOpenIcon,
    },
    {
        _id: 4,
        name: "About us",
        to: "/about-us",
        icon: InformationCircleIcon,
    },
];

export default function NavLinks() {
    return (
        <>
            {links.map((link) => (
                <Link
                    to={link.to}
                    key={link._id}
                    className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                    <div className="flex items-center gap-1">
                        <link.icon className="size-5 mr-1 inline-block" /> {link.name}
                    </div>
                </Link>
            ))}
        </>
    );
}
