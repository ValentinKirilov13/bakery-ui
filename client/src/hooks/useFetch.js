import {useEffect, useState} from "react";
import useRequest from "./useRequest";
import {toast} from "react-toastify";

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
