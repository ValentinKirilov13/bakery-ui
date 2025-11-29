import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router";
import NavLinks from "./nav-links/NavLinks";
import AuthLinks from "./nav-links/AuthLinks";

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const mobileNavLinkClickHandler = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="relative z-50 shadow-[0_8px_25px_rgba(254,243,199,0.6)]">
            <nav
                aria-label="Global"
                className="mx-auto flex max-w-7xl items-center justify-between p-8 lg:px-8"
            >
                <div className="flex lg:flex-1">
                    <div className="relative">
                        <Link to="/" className="absolute h-40 w-24 -top-13">
                            <span className="sr-only">Sladotvornitsa</span>
                            <img
                                alt="Your Company"
                                src="/logo.svg"
                                className="mx-auto   rounded-4xl"
                            />
                        </Link>
                    </div>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <NavLinks onClick={mobileNavLinkClickHandler} />
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center space-x-6">
                    <AuthLinks />
                </div>
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden ">
                    <div className="fixed inset-0 z-50" />
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
                        <div className="flex items-center justify-between">
                            <Link to="/" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img
                                    alt="Your Company"
                                    src="/logo.svg"
                                    className="mx-auto h-30 w-auto rounded-4xl"
                                />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-white/10">
                                <div className="space-y-2 py-6">
                                    <NavLinks onClick={mobileNavLinkClickHandler} />
                                </div>
                                <div className="py-6">
                                    <AuthLinks />
                                </div>
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </nav>
        </header>
    );
}
