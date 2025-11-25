import { Route, Routes } from "react-router";
import Home from "./components/home/Home";
import NotFound from "./components/not-found/NotFound";
import FullScreenLayout from "./components/full-screen-layout/FullScreenLayout";
import MainLayout from "./components/full-layout/MainLayout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Blog from "./components/blog/Blog";
import AboutUs from "./components/about-us/AboutUs";

export default function App() {
    return (
        <>
            <div className="min-h-screen flex flex-col bg-gray-900">
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/about-us" element={<AboutUs />} />
                    </Route>
                    <Route element={<FullScreenLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}
