import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isSidebarOpen} />
            <div className="flex-1 flex flex-col">
                <Topbar
                    isSidebarOpen={isSidebarOpen}
                    onToggleSidebar={() => setIsSidebarOpen((isOpen) => !isOpen)}
                />
                <main className="flex-1 overflow-y-auto p-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;