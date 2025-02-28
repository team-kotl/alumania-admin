import {
    FaUserGraduate,
    FaUserTie,
    FaCalendarAlt,
    FaBriefcase,
} from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "daisyui";

const StatsCards = () => {
    const [loading, setLoading] = useState(true);
    const [rowOne, setRowOne] = useState({
        alumni: 0,
        managers: 0,
        events: 0,
        jobs: 0,
    });

    useEffect(() => {
        const fetchRowOne = async () => {
            await axios
                .get(`http://localhost:5000/dashboard/row-1`)
                .then((res) => {
                    const data = res.data;
                    setRowOne(data);
                })
                .then(() => setLoading(false));
        };
        fetchRowOne();
    }, []);

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 w-320">
                <div
                    className={`card bg-base-100 shadow-lg p-6 border-l-6 border-blue-900`}
                >
                    <div className="flex items-center space-x-15">
                        <div className="text-4xl ml-5">
                            <FaUserGraduate className="text-4xl text-blue-900" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Alumni</p>
                            <p className="text-2xl font-semibold">
                                {loading ? (
                                    <span className="loading loading-dots loading-xs"></span>
                                ) : (
                                    rowOne.alumni
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={`card bg-base-100 shadow-lg p-6 border-l-6 border-blue-500`}
                >
                    <div className="flex items-center space-x-15">
                        <div className="text-4xl ml-5">
                            <FaUserTie className="text-4xl text-blue-500" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Managers</p>
                            <p className="text-2xl font-semibold">
                                {loading ? (
                                    <span className="loading loading-dots loading-xs"></span>
                                ) : (
                                    rowOne.managers
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={`card bg-base-100 shadow-lg p-6 border-l-6 border-blue-400`}
                >
                    <div className="flex items-center space-x-15">
                        <div className="text-4xl ml-5">
                            <FaCalendarAlt className="text-4xl text-blue-400" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Events</p>
                            <p className="text-2xl font-semibold">
                                {loading ? (
                                    <span className="loading loading-dots loading-xs"></span>
                                ) : (
                                    rowOne.events
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div
                    className={`card bg-base-100 shadow-lg p-6 border-l-6 border-blue-300`}
                >
                    <div className="flex items-center space-x-15">
                        <div className="text-4xl ml-5">
                            <FaBriefcase className="text-4xl text-blue-300" />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Jobs</p>
                            <p className="text-2xl font-semibold">
                                {loading ? (
                                    <span className="loading loading-dots loading-xs"></span>
                                ) : (
                                    rowOne.jobs
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChartsSection = () => {
    const [rowTwo, setRowTwo] = useState({
        employment: [],
        location: [],
        interests: [],
    });

    useEffect(() => {
        const fetchRowTwo = async () => {
            const res = await axios
                .get(`http://localhost:5000/dashboard/row-2`)
            const data = res.data;
            setRowTwo((prev) => ({
                ...prev,
                employment: [
                    { name: "Employed", value: data.employment.employed, color: "#1E40AF" },
                    { name: "Unemployed", value: data.employment.unemployed, color: "#6495ED" },
                    { name: "Underemployed", value: data.employment.underemployed, color: "#60A5FA" },
                ],
                location: [
                    { name: "Domestic", value: data.location.domestic, color: "#1E40AF" },
                    { name: "Foreign", value: data.location.foreign, color: "#3B82F6" },
                ],
                interests: data.interests,
            }));
        };
        fetchRowTwo();
        console.log(rowTwo.employment)
    }, []);


    return (
        <div className="flex justify-center items-center mt-10 space-x-10">
            <div>
                <h2 className="text-center text-lg font-semibold">
                    Employment Status
                </h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={rowTwo.employment}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={170}
                        fill="#8884d8"
                    >
                        <Cell fill="#1E40AF" />
                        <Cell fill="#6495ED" />
                        <Cell fill="#60A5FA" />
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
            <div>
                <h2 className="text-center text-lg font-semibold">
                    User Location
                </h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={rowTwo.location}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={170}
                        fill="#82ca9d"
                    >
                        <Cell fill="#1E40AF" />
                        <Cell fill="#6495ED" />
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
            <div className="flex justify-center">
                <div className="w-120 h-107">
                    <h2 className="text-lg font-semibold mb-5 text-center">
                        Interested Alumni
                    </h2>
                    <ul className="shadow-md rounded-lg p-8 h-93">
                        {rowTwo.interests.map((alumnus, index) => (
                            <li
                                key={index}
                                className="flex justify-between border-b border-gray-300 py-2"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {alumnus.title}
                                    </p>
                                    {alumnus.company && (
                                        <p className="text-sm text-gray-500">
                                            {alumnus.companyname}
                                        </p>
                                    )}
                                    {alumnus.location && (
                                        <p className="text-sm text-gray-500">
                                            {alumnus.location}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 font-medium">
                                        {alumnus.type}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-400" />
                                    <p className="ml-1">{alumnus.interested_count}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const TableSection = () => {
    const [rowThree, setRowThree] = useState({ managers: [], alumni: [] });

    useEffect(() => {
        const fetchRowThree = async () => {
            await axios
                .get(`http://localhost:5000/dashboard/row-3`)
                .then((res) => {
                    const data = res.data;
                    setRowThree(data);
                })
        };
        fetchRowThree();
    }, []);

    function formatDate(isoString) {
        const date = new Date(isoString);

        const options = {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        };

        return date.toLocaleString("en-US", options);
    }

    return (
        <div className="mt-10 flex justify-center space-x-10 ">
            <div className="w-185">
                <h2 className="text-lg font-semibold mb-2 text-center">
                    Recent Managers
                </h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowThree.managers.map((manager, index) => (
                                <tr key={index} className="hover">
                                    <td className="p-2">{manager.username}</td>
                                    <td className="p-2">{
                                        formatDate(manager.jointimestamp)
                                    }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="w-185">
                <h2 className="text-lg font-semibold mb-2 text-center">
                    Recent Alumni
                </h2>
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full shadow-md rounded-lg">
                        <thead>
                            <tr className="bg-gray-200 text-gray-700">
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Location</th>
                                <th className="text-left p-2">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowThree.alumni.map((alumni, index) => (
                                <tr key={index} className="hover">
                                    <td className="p-2">{alumni.username}</td>
                                    <td className="p-2">{alumni.location}</td>
                                    <td className="p-2">{
                                        formatDate(alumni.jointimestamp)
                                    }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <>
            <header className="ml-16 mt-10 flex flex-row">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-bold text-primary">
                        Dashboard
                    </h1>
                    <p className="font-light text-gray-400">
                        Everything, Everywhere. All at once.
                    </p>
                </div>
                <p className="ml-auto pr-10 text-3xl font-thin text-primary">
                    {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "2-digit",
                    })}
                </p>
            </header>
            <main>
                <StatsCards />
                <ChartsSection />
                <TableSection />
            </main>
        </>
    );
};

export default HomePage;
