import { PiCalendarBlankThin, PiBriefcaseMetalThin } from "react-icons/pi";
import { NavLink } from "react-router";

const AddSelector = () => {
    const styleDefault = `opacity-50 hover:opacity-80 hover:w-72 transition-all cursor-pointer`;
    const styleActive = `opacity-100 hover:opacity-80 transition-all cursor-pointer`;
    return (
        <>
            <section className="flex flex-col w-[30%] min-w-90 border-r border-primary gap-10 py-20 items-center">
                <NavLink to="/add/event">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-col justify-center items-center w-70 h-70 border-2 rounded-xl ${
                                isActive ? styleActive : styleDefault
                            }`}
                        >
                            <PiCalendarBlankThin size={150} />
                            <p className="font-extralight text-2xl">EVENT</p>
                        </div>
                    )}
                </NavLink>
                <NavLink to="/add/job">
                    {({ isActive }) => (
                        <div
                            className={`flex flex-col justify-center items-center w-70 h-70 border-2 rounded-xl ${
                                isActive ? styleActive : styleDefault
                            }`}
                        >
                            <PiBriefcaseMetalThin size={150} />
                            <p className="font-extralight text-2xl">
                                JOB LISTING
                            </p>
                        </div>
                    )}
                </NavLink>
            </section>
        </>
    );
};

export default AddSelector;
