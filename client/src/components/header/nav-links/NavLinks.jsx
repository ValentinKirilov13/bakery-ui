import { Link, useLocation } from "react-router";
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
        to: "/products-catalog",
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

export default function NavLinks({ onClick }) {
    const { pathname } = useLocation();

    const isActiveHandler = (link) => {
        let isActive = false;

        if (link.to === "/") {
            isActive = pathname === "/";
        } else {
            isActive = pathname === link.to || pathname.startsWith(link.to + "/");
        }

        return isActive;
    };

    return (
        <>
            {links.map((link) => (
                <Link
                    onClick={onClick}
                    to={link.to}
                    key={link._id}
                    className={`${
                        isActiveHandler(link) ? "bg-amber-100" : "hover:bg-amber-100"
                    } -mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold`}
                >
                    <div className="flex items-center gap-1">
                        <link.icon className="size-5 mr-1 inline-block" /> {link.name}
                    </div>
                </Link>
            ))}
        </>
    );
}
