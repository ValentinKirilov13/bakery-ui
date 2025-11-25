import { Outlet } from "react-router";

export default function FullScreenLayout() {
    return (
        <div className="grow flex flex-col">
            <Outlet />
        </div>
    );
}
