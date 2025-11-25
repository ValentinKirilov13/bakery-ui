import { Link } from "react-router";

export default function AuthLinks() {
    return (
        <>
            <div className="flex items-center gap-8">
                <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold text-white hover:bg-white/5"
                >
                    Sign in
                </Link>
                <Link
                    to="/register"
                    className="-mx-3 block rounded-lg px-3 py-1 text-base/7 font-semibold  text-blue-500 bg-white hover:bg-white/5"
                >
                    Sign up
                </Link>
            </div>
        </>
    );
}
