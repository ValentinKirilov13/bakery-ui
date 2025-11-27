import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import classNames from "../../utils/classNames";

const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
];

export default function SortMenu() {
    return (
        <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                        aria-hidden="true"
                        className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                </MenuButton>

                <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                    <div className="py-1">
                        {sortOptions.map((option) => (
                            <MenuItem key={option.name}>
                                <a
                                    href={option.href}
                                    className={classNames(
                                        option.current
                                            ? "font-medium text-gray-900"
                                            : "text-gray-500",
                                        "block px-4 py-2 text-sm data-focus:bg-gray-100 data-focus:outline-hidden"
                                    )}
                                >
                                    {option.name}
                                </a>
                            </MenuItem>
                        ))}
                    </div>
                </MenuItems>
            </Menu>

            {/* <button
                type="button"
                onClick={() => onOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
            >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
            </button> */}
        </div>
    );
}
