import {ShoppingCartIcon, UserIcon} from "@heroicons/react/24/outline";
import {Link, useLocation} from "react-router";
import useUserContext from "../../../hooks/useUserContext";

export default function AuthLinks() {
    const {isAuthenticated, logoutHandler} = useUserContext();
    const location = useLocation();

    return (
        <>
            <div className="flex items-center gap-8">
                {!isAuthenticated ? (
                    <>
                        <Link
                            to="/login"
                            state={{from: location}}
                            className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                        >
                            Sign in
                        </Link>
                        <Link
                            to="/register"
                            state={{from: location}}
                            className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-white bg-amber-100"
                        >
                            Sign up
                        </Link>{" "}
                    </>
                ) : (
                    <>
                        <div className="w-6 h-auto">
                            <Link
                                to="/shopping-cart"
                                className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                            >
                                <ShoppingCartIcon />
                            </Link>
                        </div>

                        <div className="w-6 h-auto">
                            <Link
                                to="/profile"
                                className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                            >
                                <UserIcon />
                            </Link>
                        </div>
                        <div>
                            <button
                                onClick={logoutHandler}
                                className="cursor-pointer -mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-white bg-amber-100"
                            >
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
