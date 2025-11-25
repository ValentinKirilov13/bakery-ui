import { Link } from "react-router";

export default function NotFound() {
    return (
        <div className="text-center grow content-center">
            <p className="font-semibold text-indigo-700 text-7xl">404</p>

            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                Page not found
            </h1>

            <p className="mt-6 text-lg font-medium text-gray-400 sm:text-xl">
                Sorry, we couldn’t find the page you’re looking for.
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                    to="/"
                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400"
                >
                    Go back home
                </Link>
            </div>
        </div>
    );
}
