import useUserContext from "./useUserContext";

const baseUrl = "http://localhost:3030";

export default function useRequest() {
    const {isAuthenticated, user} = useUserContext();

    const request = async (url, method, data, config = {accessToken: null}) => {
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
                "X-Authorization": config.accessToken || user.accessToken,
            };
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
    };

    return {request};
}
