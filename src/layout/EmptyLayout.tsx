import { Outlet } from "react-router";

function EmptyLayout () {
    return (
        <div className="flex items-center justify-center">
            <Outlet/>
        </div>
    )
};

export default EmptyLayout;