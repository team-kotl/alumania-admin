import Banner from "./NavBrandBanner";
import {
    PiHouse,
    PiCirclesThreePlus,
    PiUserCircle,
    PiFoldersLight,
} from "react-icons/pi";
import AdminIcon from "../assets/admin.png";
import ManagerIcon from "../assets/manager.png";
import { NavLink } from "react-router";
const RootSidebar = () => {
    const defaultStyle = `text-primary-content hover:text-primary hover:bg-primary-content transition-all`;
    const selectedStyle = `text-primary bg-primary-content hover:opacity-70 transition-all`;
    const username = localStorage.getItem("user") || `administrator`;
    const usertype = localStorage.getItem("usertype") || `Admin`;

    return (
        <>
            <aside className="flex flex-col items-start h-screen w-64 px-7 bg-primary z-50 fixed top-0 left-0 py-4">
                <Banner />
                <div className="w-full flex flex-col gap-5 mt-10">
                    <NavLink to="/home" className="w-full">
                        {({ isActive }) => (
                            <div
                                className={`flex flex-row py-4 gap-2 pl-8 rounded-xl ${
                                    isActive ? selectedStyle : defaultStyle
                                }`}
                            >
                                <PiHouse size={30} />
                                <p className="text-[18px]">Dashboard</p>
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="/add" className="w-full">
                        {({ isActive }) => (
                            <div
                                className={`flex flex-row py-4 gap-2 pl-8 rounded-xl ${
                                    isActive ? selectedStyle : defaultStyle
                                }`}
                            >
                                <PiCirclesThreePlus size={30} />
                                <p className="text-[18px]">Create</p>
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="/users" className="w-full">
                        {({ isActive }) => (
                            <div
                                className={`flex flex-row py-4 gap-2 pl-8 rounded-xl ${
                                    isActive ? selectedStyle : defaultStyle
                                }`}
                            >
                                <PiUserCircle size={30} />
                                <p className="text-[18px]">Users</p>
                            </div>
                        )}
                    </NavLink>
                    <NavLink to="/posts" className="w-full">
                        {({ isActive }) => (
                            <div
                                className={`flex flex-row py-4 gap-2 pl-8 rounded-xl ${
                                    isActive ? selectedStyle : defaultStyle
                                }`}
                            >
                                <PiFoldersLight size={30} />
                                <p className="text-[18px]">Posts</p>
                            </div>
                        )}
                    </NavLink>
                </div>

                <NavLink to="/profile" className="w-full mt-auto">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-row pb-2 pt-4 gap-3 border-t items-center pl-4 ${
                                isActive ? selectedStyle : defaultStyle
                            }`}
                        >
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring ring-offset-2">
                                    <img
                                        src={
                                            usertype === "Admin"
                                                ? AdminIcon
                                                : ManagerIcon
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[18px]">{username}</p>
                                <p className="text-[13px] font-extralight">
                                    {usertype}
                                </p>
                            </div>
                        </div>
                    )}
                </NavLink>
            </aside>
        </>
    );
};

export default RootSidebar;
