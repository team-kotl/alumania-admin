import { Outlet } from "react-router";
import RootSidebar from "../components/RootSidebar";

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
