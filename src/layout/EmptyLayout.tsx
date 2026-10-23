import { Outlet } from "react-router";

function EmptyLayout () {
    return (
        <div className="min-h-screen w-full">
            <Outlet/>
        </div>
    )
};

export default EmptyLayout;