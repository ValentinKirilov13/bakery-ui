import {useState} from "react";

export default function usePersistedState(initialState, key) {
    const [state, setState] = useState(() => {
        const storedData = localStorage.getItem(key);

        if (!storedData) return initialState;

        return JSON.parse(storedData);
    });

    const setPersistedState = (input) => {
        let value = input;

        if (typeof input === "function") value = input(state);

        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };

    return [state, setPersistedState];
}
