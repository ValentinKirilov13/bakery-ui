export default function Spinner({size = 20}) {
    return (
        <span
            className="relative inline-flex"
            style={{width: size, height: size}}
        >
            <span className="absolute inset-0 rounded-full border-2 border-yellow-200 border-t-yellow-500 animate-spin" />
            <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-500 animate-ping"
                style={{width: size / 3, height: size / 3}}
            />
        </span>
    );
}
