// import { ShoppingBagIcon, UserIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router";

export default function AuthLinks() {
    return (
        <>
            <div className="flex items-center gap-8">
                <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                >
                    Sign in
                </Link>
                <Link
                    to="/register"
                    className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-white bg-amber-100"
                >
                    Sign up
                </Link>

                {/* <div className="w-7 h-auto">
                    <Link
                        to="/shopping-bag"
                        className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                    >
                        <ShoppingBagIcon />
                    </Link>
                </div>

                <div className="w-7 h-auto">
                    <Link
                        to="/profile"
                        className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-white bg-amber-100"
                    >
                        <UserIcon />
                    </Link>
                </div> */}
            </div>
        </>
    );
}
