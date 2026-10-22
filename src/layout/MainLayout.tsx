import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout() {
    return (
        <div>
            <Sidebar/>
            <div>
                <Topbar/>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;