import {useEffect, useState} from "react";
import useRequest from "./useRequest";

export default function useFetch(url, initialState) {
    const [data, setData] = useState(initialState);
    const {request} = useRequest();

    useEffect(() => {
        const abortController = new AbortController();

        request(url)
            .then((result) => setData(result))
            .catch((err) => alert(err));

        return () => {
            abortController.abort();
        };
    }, [url]);

    return [data, setData];
}
