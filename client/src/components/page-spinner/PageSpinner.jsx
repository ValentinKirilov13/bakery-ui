import Spinner from "./spinner/Spinner";

export function PageSpinner() {
    return (
        <div className="flex justify-center w-full mt-20">
            <Spinner size={60} />
        </div>
    );
}
