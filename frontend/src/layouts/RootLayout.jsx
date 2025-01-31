import { Outlet } from "react-router";
import RootSidebar from "../components/navs/RootSidebar.jsx";

const RootLayout = () => {
    return (
        <>
            <RootSidebar />
            <main className="ml-64">
                <Outlet />
            </main>
        </>
    );
};

export default RootLayout;
