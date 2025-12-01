export default function formatDate(dateString) {
    const date = new Date(dateString);

    const options = {month: "long", year: "numeric"};
    const formatted = date.toLocaleDateString("en-US", options);

    return formatted;
}
