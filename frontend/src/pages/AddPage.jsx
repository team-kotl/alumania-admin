import AddSelector from "../components/navs/AddSelector.jsx";
import { Outlet } from "react-router";

const AddPage = () => {
    return (
        <>
            <header className="ml-16 mt-10 flex flex-col">
                <h1 className="text-5xl font-bold text-primary">Create</h1>
                <p className="font-light text-gray-400">
                    Create an Event or a Job Opportunity
                </p>
            </header>
            <main className="flex flex-row">
                <AddSelector />
                <Outlet />
            </main>
        </>
    );
};

export default AddPage;
