import {useFormStatus} from "react-dom";
import Spinner from "../page-spinner/spinner/Spinner";

export default function SubmitButton({className, children}) {
    const {pending} = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className={`${
                pending ? "" : "bg-amber-500 hover:bg-amber-600"
            } cursor-pointer w-full inline-flex items-center justify-center rounded-xl text-white font-semibold shadow-md transition disabled:opacity-60 ${className}`}
        >
            {pending ? <Spinner /> : children}
        </button>
    );
}
