import { Outlet } from "react-router";
import UsersNavbar from "../components/UsersNavbar";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";

const UsersPage = () => {
    const nav = useNavigate();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/users") {
            nav("/users/alumni", { replace: true }); // Use `replace: true` to avoid adding to history
        }
    }, [location.pathname, nav]);
    return (
        <>
            <header className="ml-16 mt-10 flex flex-col">
                <h1 className="text-5xl font-bold text-primary">Users</h1>
                <p className="font-light text-gray-400">
                    View and Manage User Accounts
                </p>
            </header>
            <UsersNavbar />
            <main className="flex flex-row">
                <Outlet />
            </main>
        </>
    );
};

export default UsersPage;
