import { useEffect, useState } from "react";

export default function useFetch(url, initialState) {
    const [data, setData] = useState(initialState);

    useEffect(() => {
        const abortController = new AbortController();

        fetch(url, { signal: abortController.signal })
            .then((response) => response.json())
            .then((result) => setData(Object.values(result)))
            .catch();

        return () => {
            abortController.abort();
        };
    }, [url]);

    return data;
}
