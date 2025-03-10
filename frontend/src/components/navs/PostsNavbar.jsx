import { NavLink } from "react-router";
import {
    PiCalendarStarThin,
    PiBriefcaseMetalThin,
    PiUserCircleThin,
} from "react-icons/pi";

const PostsNavbar = () => {
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
            </nav>
        </>
    );
};

export default PostsNavbar;
