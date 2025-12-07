import {useEffect, useState} from "react";
import useRequest from "./useRequest";
import {toast} from "react-toastify";

export default function useFetch(url, initialState) {
    const [data, setData] = useState(initialState);
    const {request} = useRequest();

    useEffect(() => {
        const abortController = new AbortController();

        request(url, null, null, {signal: abortController.signal})
            .then((result) => setData(result))
            .catch((err) => {
                if (err.name === "AbortError") return;
                toast.error(err?.message || "Something went wrong");
            });

        return () => {
            abortController.abort();
        };
    }, [url, request]);

    return [data, setData];
}
