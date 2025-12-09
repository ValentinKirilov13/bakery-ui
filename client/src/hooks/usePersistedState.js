import {useState} from "react";

/**
 * Custom hook that stores state in `localStorage` and keeps it in sync with React state.
 *
 * This hook behaves like `useState`, but the state is persisted across page reloads
 * under the specified `key`.
 *
 * @template T
 * @param {T} initialState - Initial value for the state if localStorage is empty.
 * @param {string} key - The localStorage key under which the state is saved.
 *
 * @returns {[T, (value: T | ((prevState: T) => T)) => void]}
 *   - `state`: Current value of the persisted state.
 *   - `setPersistedState`: Setter function to update state and localStorage.
 *     Accepts either a new value or a function receiving the previous state.
 *
 * @example
 * const [name, setName] = usePersistedState("Guest", "userName");
 *
 * setName("Alice"); // Updates state and localStorage
 * setName(prev => prev + " Smith"); // Functional update
 */
export default function usePersistedState(initialState, key) {
    const [state, setState] = useState(() => {
        const storedData = localStorage.getItem(key);

        if (!storedData) return initialState;

        return JSON.parse(storedData);
    });

    /**
     * Updates both state and localStorage.
     *
     * @param {T | ((prevState: T) => T)} input - New value or a function returning the new value.
     */
    const setPersistedState = (input) => {
        let value = input;

        if (typeof input === "function") value = input(state);

        localStorage.setItem(key, JSON.stringify(value));
        setState(value);
    };

    return [state, setPersistedState];
}
