const baseUrl = "http://localhost:3030";

export default function useRequest() {
    const request = async (url, method, data) => {
        let options = {};

        if (method) options.method = method;

        if (data) {
            options.headers = {
                "content-type": "application/json",
                "X-Authorization": "{token}",
            };
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${baseUrl}${url}`, options);

        if (!response.ok) throw response.statusText;

        return await response.json();
    };

    return {request};
}
