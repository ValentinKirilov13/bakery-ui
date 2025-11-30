import {useCallback, useEffect, useState} from "react";

export default function useFetch(url, initialState, map = (data) => data) {
    const [data, setData] = useState(initialState);
    const mapFn = useCallback(map, []);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, {signal: abortController.signal})
            .then((response) => response.json())
            .then((result) => setData(mapFn(result)))
            .catch();

        return () => {
            abortController.abort();
        };
    }, [url, mapFn]);

    return data;
}
