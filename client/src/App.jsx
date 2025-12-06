import {Route, Routes} from "react-router";
import Home from "./components/home/Home";
import NotFound from "./components/not-found/NotFound";
import FullScreenLayout from "./components/full-screen-layout/FullScreenLayout";
import MainLayout from "./components/full-layout/MainLayout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AboutUs from "./components/about-us/AboutUs";
import ProductsCatalog from "./components/products-catalog/ProductsCatalog";
import ProductDetails from "./components/product-details/ProductDetails";
import WriteReview from "./components/write-review/WriteReview";
import EditReview from "./components/edit-review/EditReview";
import Profile from "./components/profile/Profile";
import Cart from "./components/cart/Cart";
import GuestRouteGuard from "./components/guest-route-guard/GuestRouteGuard";
import UserRouteGuard from "./components/user-route-guard/UserRouteGuard";

export default function App() {
    return (
        <>
            <div className="min-h-screen flex flex-col">
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/products-catalog">
                            <Route index element={<ProductsCatalog />} />
                            <Route
                                path=":productId/details"
                                element={<ProductDetails />}
                            />
                            <Route element={<GuestRouteGuard />}>
                                <Route
                                    path=":productId/write-review"
                                    element={<WriteReview />}
                                />
                                <Route
                                    path=":productId/edit-review/:reviewId"
                                    element={<EditReview />}
                                />
                            </Route>
                        </Route>
                        <Route element={<GuestRouteGuard />}>
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/shopping-cart" element={<Cart />} />
                        </Route>
                    </Route>
                    <Route element={<FullScreenLayout />}>
                        <Route element={<UserRouteGuard />}>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}
