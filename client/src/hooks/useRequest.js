import {useCallback} from "react";
import useUserContext from "./useUserContext";

const baseUrl = "http://localhost:3030";

/**
 * Custom hook for making HTTP requests with authentication support.
 *
 * This hook automatically:
 * - Adds JSON headers when sending data
 * - Adds `X-Authorization` header if user is authenticated
 * - Handles fetch errors and throws structured error objects
 * - Supports abort signals
 *
 * @returns {{
 *   request: (
 *     url: string,
 *     method?: string,
 *     data?: any,
 *     config?: { accessToken?: string | null, signal?: AbortSignal | null }
 *   ) => Promise<any>
 * }} An object containing the `request` function.
 *
 * @example
 * const { request } = useRequest();
 *
 * try {
 *   const data = await request("/users/123", "GET");
 *   console.log(data);
 * } catch (err) {
 *   console.error(err.code, err.message);
 * }
 */
export default function useRequest() {
    const {isAuthenticated, user} = useUserContext();

    /**
     * Makes an HTTP request with optional authentication and data.
     *
     * @param {string} url - Endpoint URL, relative to the base URL.
     * @param {string} [method] - HTTP method (GET, POST, PUT, DELETE, etc.).
     * @param {any} [data] - Optional request body (will be JSON-stringified).
     * @param {{ accessToken?: string | null, signal?: AbortSignal | null }} [config] - Optional config object.
     * @returns {Promise<any>} Resolves to the response JSON or `null` if status 204.
     * @throws {{ code: number, message: string }} Throws error object on failed requests.
     */
    const request = useCallback(
        async (
            url,
            method,
            data,
            config = {accessToken: null, signal: null}
        ) => {
            let options = {};

            if (method) options.method = method;

            if (data) {
                options.headers = {
                    "content-type": "application/json",
                };
                options.body = JSON.stringify(data);
            }

            if (config.accessToken || isAuthenticated) {
                options.headers = {
                    ...options.headers,
                    "X-Authorization": config.accessToken || user?.accessToken,
                };
            }

            if (config.signal) {
                options.signal = config.signal;
            }

            const response = await fetch(`${baseUrl}${url}`, options);

            if (!response.ok) {
                let errorData = {};

                try {
                    errorData = await response.json();
                } catch {
                    errorData.message = "Unknown error";
                }

                throw {
                    code: errorData.code || response.status,
                    message: errorData.message || "Something went wrong",
                };
            }

            if (response.status === 204) return null;

            return await response.json();
        },
        [isAuthenticated, user?.accessToken]
    );

    return {request};
}
