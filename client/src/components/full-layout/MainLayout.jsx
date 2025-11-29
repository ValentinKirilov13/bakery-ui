import { Outlet } from "react-router";
import Header from "../header/Header";
import Footer from "../footer/Footer";

export default function MainLayout() {
    return (
        <>
            <Header />
            <main className="grow bg-white">
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
