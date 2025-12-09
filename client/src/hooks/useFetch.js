import {useEffect, useState} from "react";
import useRequest from "./useRequest";
import {toast} from "react-toastify";

/**
 * Fetches data from the given URL and manages loading state.
 *
 * This hook automatically aborts the request when:
 * - the component unmounts
 * - the `url` or `request` dependency changes
 *
 * Errors (except aborts) are displayed using `react-toastify`.
 *
 * @template T
 * @param {string} url - The endpoint to fetch data from.
 * @param {T} initialState - Initial value for the fetched data.
 *
 * @returns {{
 *   data: T,
 *   setData: import("react").Dispatch<import("react").SetStateAction<T>>,
 *   loading: boolean
 * }}
 *
 * @example
 * const {data: products, loading} = useFetch("/data/products", []);
 */
export default function useFetch(url, initialState) {
    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(true);
    const {request} = useRequest();

    useEffect(() => {
        const abortController = new AbortController();

        request(url, null, null, {signal: abortController.signal})
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                toast.error(err?.message || "Something went wrong");
                setLoading(false);
            });

        return () => {
            abortController.abort();
        };
    }, [url, request]);

    return {data, setData, loading};
}
