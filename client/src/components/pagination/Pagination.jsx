import PaginationLink from "./pagination-link/PaginationLink";
import { useState } from "react";
import { useSearchParams } from "react-router";

export default function Pagination({ pages }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchParams, setSearchParams] = useSearchParams();

    const maxPage = Math.max(...pages);
    const minPage = Math.min(...pages);

    const pageChangeHandler = (selectedPage, isNextArrow, isPrevArrow) => {
        let newPage = currentPage;

        if (isNextArrow) {
            newPage = Math.min(currentPage + 1, maxPage);
        }

        if (isPrevArrow) {
            newPage = Math.max(currentPage - 1, minPage);
        }

        if (selectedPage) {
            newPage = selectedPage;
        }

        setCurrentPage(newPage);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage);
        setSearchParams(newParams);
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden items-center">
                <div className="flex items-center">
                    <PaginationLink
                        isPrevArrow
                        disabled={currentPage === minPage}
                        onClick={pageChangeHandler}
                    />
                    <span className="ml-2">Previous</span>
                </div>

                {currentPage}

                <div className="flex items-center">
                    <span className="mr-2">Next</span>
                    <PaginationLink
                        isNextArrow
                        disabled={currentPage === maxPage}
                        onClick={pageChangeHandler}
                    />
                </div>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">1</span> to
                        <span className="font-medium ml-1">10</span> of
                        <span className="font-medium ml-1">97</span> results
                    </p>
                </div>
                <div>
                    <div className="isolate inline-flex -space-x-px rounded-md shadow-xs">
                        <PaginationLink
                            isPrevArrow
                            disabled={currentPage === minPage}
                            onClick={pageChangeHandler}
                        />

                        {pages?.map((page) => (
                            <PaginationLink
                                key={page}
                                pageNum={page}
                                isActive={currentPage === page}
                                onClick={pageChangeHandler}
                            />
                        ))}

                        <PaginationLink
                            isNextArrow
                            disabled={currentPage === maxPage}
                            onClick={pageChangeHandler}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
