import { NavLink } from "react-router";
import {
    PiUserCircleThin,
    PiUserCircleCheckThin,
    PiFileTextThin,
} from "react-icons/pi";

const UsersNavbar = () => {
    const styleDefault =
        "text-primary bg-transparent hover:text-primary-content hover:bg-primary";
    const styleSelected = "text-primary-content bg-primary hover:opacity-70";

    return (
        <>
            <nav className="ml-16 mt-5 flex flex-row">
                <NavLink to="alumni">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-row py-2 px-4 rounded-tl-2xl items-center gap-2 transition-all ${
                                isActive ? styleSelected : styleDefault
                            }`}
                        >
                            <PiUserCircleThin size="35" />
                            <p className="">Alumni</p>
                        </div>
                    )}
                </NavLink>
                <NavLink to="applicants">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-row py-2 px-4 items-center gap-2 transition-all ${
                                isActive ? styleSelected : styleDefault
                            }`}
                        >
                            <PiUserCircleCheckThin size="35" />
                            <p className="">Manager</p>
                        </div>
                    )}
                </NavLink>
                <NavLink to="managers">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-row py-2 px-4 rounded-tr-2xl items-center gap-2 transition-all ${
                                isActive ? styleSelected : styleDefault
                            }`}
                        >
                            <PiFileTextThin size="35" />
                            <p className="">Applicants</p>
                        </div>
                    )}
                </NavLink>
            </nav>
        </>
    );
};

export default UsersNavbar;
