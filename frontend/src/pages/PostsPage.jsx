import { Outlet } from "react-router";
import PostsNavbar from "../components/navs/PostsNavbar.jsx";
import { useNavigate, useLocation } from "react-router";
import { useEffect, useState } from "react";

const PostsPage = () => {
    const nav = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState(""); // 🔹 Manage search bar
    useEffect(() => {
        if (location.pathname === "/posts") {
            nav("/posts/experiences", { replace: true }); // Use `replace: true` to avoid adding to history
        }
    }, [location.pathname, nav]);
    return (
        <>
            <header className="ml-16 mt-10 flex flex-col">
                <h1 className="text-5xl font-bold text-primary">Posts</h1>
                <p className="font-light text-gray-400">
                    View and Manage Experiences, Events, and Job Listings
                </p>
            </header>
            <PostsNavbar  setSearchQuery={setSearchQuery} />
            <main className="flex flex-row">
                <Outlet context={{ searchQuery }} />
            </main>
        </>
    );
};

export default PostsPage;
