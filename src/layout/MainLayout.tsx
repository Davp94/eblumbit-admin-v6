import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout() {
    return (
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 flex flex-col">
                <Topbar/>
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;