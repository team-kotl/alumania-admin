import { NavLink, useLocation } from "react-router";
import {
    PiCalendarStarThin,
    PiBriefcaseMetalThin,
    PiUserCircleThin,
} from "react-icons/pi";

const PostsNavbar = ({ setSearchQuery }) => {
    const location = useLocation(); // 🔹 Get current route
    const isExperiencesTab = location.pathname === "/posts/experiences"; // 🔹 Check if active tab is Experiences

    const styleDefault =
        "text-primary bg-transparent hover:text-primary-content hover:bg-primary";
    const styleSelected = "text-primary-content bg-primary hover:opacity-70";

    return (
        <>
            <nav className="ml-16 mt-5 flex flex-row">
                <NavLink to="experiences">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-row py-2 px-4 rounded-tl-2xl items-center gap-2 transition-all ${
                                isActive ? styleSelected : styleDefault
                            }`}
                        >
                            <PiUserCircleThin size="35" />
                            <p className="">Experiences</p>
                        </div>
                    )}
                </NavLink>
                <NavLink to="events">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-row py-2 px-4 items-center gap-2 transition-all ${
                                isActive ? styleSelected : styleDefault
                            }`}
                        >
                            <PiCalendarStarThin size="35" />
                            <p className="">Events</p>
                        </div>
                    )}
                </NavLink>
                <NavLink to="jobs">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-row py-2 px-4 rounded-tr-2xl items-center gap-2 transition-all ${
                                isActive ? styleSelected : styleDefault
                            }`}
                        >
                            <PiBriefcaseMetalThin size="35" />
                            <p className="">Job Listings</p>
                        </div>
                    )}
                </NavLink>

                {!isExperiencesTab && (
                    <label className="input flex items-center gap-2 ml-auto mr-[30vw] mt-[0.4vh]">
                        <input 
                            type="text" 
                            className="grow" 
                            placeholder="Search..." 
                            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())} 
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
                            <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                        </svg>
                    </label>
                )}
            </nav>
        </>
    );
};

export default PostsNavbar;
