import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router";
import UserProvider from "./contexts/user-context/UserProvider.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <StrictMode>
            <UserProvider>
                <App />
            </UserProvider>
        </StrictMode>
    </BrowserRouter>
);
