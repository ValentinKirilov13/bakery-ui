import {ShoppingCartIcon, UserIcon} from "@heroicons/react/24/outline";
import {Link, useLocation} from "react-router";
import useUserContext from "../../../hooks/useUserContext";
import {useState} from "react";
import Spinner from "../../page-spinner/spinner/Spinner";

export default function AuthLinks({onClick}) {
    const {isAuthenticated, logoutHandler} = useUserContext();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    return (
        <>
            <div className="flex items-center gap-8">
                {!isAuthenticated ? (
                    <>
                        <Link
                            onClick={onClick}
                            to="/login"
                            state={{from: location}}
                            className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                        >
                            Sign in
                        </Link>
                        <Link
                            onClick={onClick}
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
                                onClick={onClick}
                                to="/shopping-cart"
                                className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                            >
                                <ShoppingCartIcon />
                            </Link>
                        </div>

                        <div className="w-6 h-auto">
                            <Link
                                onClick={onClick}
                                to="/profile"
                                className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-amber-100"
                            >
                                <UserIcon />
                            </Link>
                        </div>
                        <div>
                            <button
                                disabled={loading}
                                onClick={() => {
                                    setLoading(true);
                                    logoutHandler();
                                }}
                                className="cursor-pointer -mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  hover:bg-white bg-amber-100"
                            >
                                {loading ? <Spinner /> : " Logout"}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
