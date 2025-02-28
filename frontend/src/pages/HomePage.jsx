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

const employmentData = [
    { name: "Employed", value: 6, color: "#1E40AF" },
    { name: "Unemployed", value: 2, color: "#6495ED" },
    { name: "Underemployed", value: 3, color: "#60A5FA" },
];

const locationData = [
    { name: "Domestic", value: 6, color: "#1E40AF" },
    { name: "Foreign", value: 5, color: "#3B82F6" },
];

const interestedAlumni = [
    {
        title: "Eucharistic Celebration",
        date: "2024-27-10 | 9:00 AM",
        type: "Event",
        rating: 120,
    },
    {
        title: "Software Engineer",
        company: "Accenture",
        type: "Job",
        rating: 500,
    },
    {
        title: "Nurse",
        company: "SU-Sacred Heart Medical Center",
        type: "Job",
        rating: 500,
    },
    {
        title: "Eucharistic Celebration",
        date: "2024-27-10 | 9:00 AM",
        type: "Event",
        rating: 120,
    },
];

const recentManagers = [
    { name: "Sean", joined: "December 9, 2024 at 4:08 PM" },
    { name: "Manager", joined: "December 6, 2024 at 1:57 PM" },
];

const recentAlumni = [
    {
        name: "Yukiro",
        location: "Foreign",
        joined: "December 6, 2024 at 3:14 PM",
    },
    { name: "May", location: "Foreign", joined: "December 6, 2024 at 1:57 PM" },
];

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
    // const [data, setData] = useState({
    //     employment: { Employed: 0, Unemployed: 0, Underemployed: 0 },
    //     location: { Domestic: 0, Foreign: 0 },
    //     interests: []
    // });

    // const COLORS = ["#1E40AF", "#6495ED", "#60A5FA"];

    // const employmentData = [
    //     { name: "Employed", value: data.employment.Employed, color: COLORS[0] },
    //     { name: "Unemployed", value: data.employment.Unemployed, color: COLORS[1] },
    //     { name: "Underemployed", value: data.employment.Underemployed, color: COLORS[2] }
    // ];

    // const locationData = [
    //     { name: "Domestic", value: data.location.Domestic, color: COLORS[0] },
    //     { name: "Foreign", value: data.location.Foreign, color: COLORS[1] }
    // ];

    return (
        <div className="flex justify-center items-center mt-10 space-x-10">
            <div>
                <h2 className="text-center text-lg font-semibold">
                    Employment Status
                </h2>
                <PieChart width={400} height={400}>
                    <Pie
                        data={employmentData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={170}
                        fill="#8884d8"
                    >
                        {employmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
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
                        data={locationData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={170}
                        fill="#82ca9d"
                    >
                        {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
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
                        {interestedAlumni.map((alumnus, index) => (
                            <li
                                key={index}
                                className="flex justify-between border-b py-2"
                            >
                                <div>
                                    <p className="font-semibold">
                                        {alumnus.title}
                                    </p>
                                    {alumnus.company && (
                                        <p className="text-sm text-gray-500">
                                            {alumnus.company}
                                        </p>
                                    )}
                                    {alumnus.date && (
                                        <p className="text-sm text-gray-500">
                                            {alumnus.date}
                                        </p>
                                    )}
                                    <p className="text-xs text-gray-500 font-medium">
                                        {alumnus.type}
                                    </p>
                                </div>
                                <div className="flex items-center">
                                    <FaStar className="text-yellow-400" />
                                    <p className="ml-1">{alumnus.rating}</p>
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
    // const [data, setData] = useState({ managers: [], alumni: [] });
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
                            {recentManagers.map((manager, index) => (
                                <tr key={index} className="hover">
                                    <td className="p-2">{manager.name}</td>
                                    <td className="p-2">
                                        {new Date(
                                            manager.joined_at
                                        ).toLocaleString()}
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
                            {recentAlumni.map((alumni, index) => (
                                <tr key={index} className="hover">
                                    <td className="p-2">{alumni.name}</td>
                                    <td className="p-2">{alumni.location}</td>
                                    <td className="p-2">
                                        {new Date(
                                            alumni.joined_at
                                        ).toLocaleString()}
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
