import {ShoppingCartIcon, UserIcon} from "@heroicons/react/24/outline";
import {Link, useLocation, useNavigate} from "react-router";
import useUserContext from "../../../hooks/useUserContext";
import {useState} from "react";
import Spinner from "../../page-spinner/spinner/Spinner";
import {toast} from "react-toastify";

export default function AuthLinks({onClick}) {
    const {isAuthenticated, logoutHandler} = useUserContext();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            setLoading(true);
            await logoutHandler();
            navigate("/");
        } catch (err) {
            toast.error(err?.message);
        } finally {
            setLoading(false);
        }
    };

    const isActiveHandler = (desiredPath) => {
        let isActive = false;

        if (desiredPath === "/") {
            isActive = location.pathname === "/";
        } else {
            isActive =
                location.pathname === desiredPath ||
                location.pathname.startsWith(desiredPath + "/");
        }

        return isActive;
    };

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
                                className={`${
                                    isActiveHandler("/shopping-cart")
                                        ? "bg-amber-100"
                                        : "hover:bg-amber-100"
                                } -mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold`}
                            >
                                <ShoppingCartIcon />
                            </Link>
                        </div>

                        <div className="w-6 h-auto">
                            <Link
                                onClick={onClick}
                                to="/profile"
                                className={`${
                                    isActiveHandler("/profile")
                                        ? "bg-amber-100"
                                        : "hover:bg-amber-100"
                                } -mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold`}
                            >
                                <UserIcon />
                            </Link>
                        </div>
                        <div>
                            <button
                                disabled={loading}
                                onClick={handleLogout}
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
