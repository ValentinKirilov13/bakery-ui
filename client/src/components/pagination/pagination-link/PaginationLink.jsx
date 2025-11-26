import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import classNames from "../../../utils/classNames";

export default function PaginationLink({
    pageNum,
    isActive,
    isPrevArrow,
    isNextArrow,
    disabled,
    onClick,
}) {
    return (
        <button
            onClick={() => onClick(pageNum, isNextArrow, isPrevArrow)}
            disabled={disabled}
            className={classNames(
                "cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 inset-ring inset-ring-gray-300  hover:text-gray-900 focus:z-20 focus:outline-offset-0",
                isActive && "bg-indigo-600 text-white",
                isPrevArrow && "rounded-l-md",
                isNextArrow && "rounded-r-md",
                disabled && "bg-gray-200",
                pageNum && "hover:bg-gray-50"
            )}
        >
            {isPrevArrow && <ChevronLeftIcon aria-hidden="true" className="size-5" />}
            {isNextArrow && <ChevronRightIcon aria-hidden="true" className="size-5" />}
            {!isPrevArrow && !isNextArrow && pageNum}
        </button>
    );
}
