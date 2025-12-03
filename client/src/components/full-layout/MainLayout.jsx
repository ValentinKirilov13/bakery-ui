import {Outlet} from "react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="grow bg-linear-to-b from-amber-50 to-white">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
