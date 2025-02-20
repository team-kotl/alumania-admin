import { FaUserGraduate, FaUserTie, FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { FaStar } from "react-icons/fa";

const stats = [
    { icon: <FaUserGraduate className="text-4xl text-blue-900" />, label: "Alumni", value: "2,000", border: "border-l-6 border-blue-900" },
    { icon: <FaUserTie className="text-4xl text-blue-500" />, label: "Managers", value: "2,000", border: "border-l-6 border-blue-500" },
    { icon: <FaCalendarAlt className="text-4xl text-blue-400" />, label: "Events", value: "30", border: "border-l-6 border-blue-400" },
    { icon: <FaBriefcase className="text-4xl text-blue-300" />, label: "Job Posting", value: "30", border: "border-l-6 border-blue-300" }
];

const employmentData = [
    { name: "Employed", value: 6, color: "#1E40AF" },
    { name: "Unemployed", value: 2, color: "#6495ED" },
    { name: "Underemployed", value: 3, color: "#60A5FA" }
];

const locationData = [
    { name: "Domestic", value: 6, color: "#1E40AF" },
    { name: "Foreign", value: 5, color: "#3B82F6" }
];

const interestedAlumni = [
    { title: "Eucharistic Celebration", date: "2024-27-10 | 9:00 AM", rating: 120 },
    { title: "Software Engineer", company: "Accenture", rating: 500 },
    { title: "Nurse", company: "SU-Sacred Heart Medical Center", rating: 500 },
    { title: "Eucharistic Celebration", date: "2024-27-10 | 9:00 AM", rating: 120 }
];

const recentManagers = [
    { name: "Sean", joined: "December 9, 2024 at 4:08 PM" },
    { name: "Manager", joined: "December 6, 2024 at 1:57 PM" }
];

const recentAlumni = [
    { name: "Yukiro", location: "Foreign", joined: "December 6, 2024 at 3:14 PM" },
    { name: "May", location: "Foreign", joined: "December 6, 2024 at 1:57 PM" }
];

const StatsCards = () => {
    return (
        <div className="flex justify-center items-center mt-10">
            <div className="flex space-x-15">
                {stats.map((stat, index) => (
                    <div key={index} className={`bg-gray-100 shadow-md rounded-lg p-7 flex items-center w-70 ${stat.border}`}>
                        <div className="mr-4">{stat.icon}</div>
                        <div>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                            <p className="text-2xl font-semibold">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ChartsSection = () => {
    return (
        <div className="flex justify-center items-center mt-10 space-x-10">
            <div>
                <h2 className="text-center text-lg font-semibold">Employment Status</h2>
                <PieChart width={400} height={400}>
                    <Pie data={employmentData} dataKey="value" cx="50%" cy="50%" outerRadius={170} fill="#8884d8">
                        {employmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
            <div>
                <h2 className="text-center text-lg font-semibold">User Location</h2>
                <PieChart width={400} height={400}>
                    <Pie data={locationData} dataKey="value" cx="50%" cy="50%" outerRadius={170} fill="#82ca9d">
                        {locationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                </PieChart>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-lg font-semibold mb-2 ">Interested Alumni</h2>
                <div className="bg-gray-100 shadow-md rounded-lg p-8 w-120 h-95">
                    {interestedAlumni.map((alumnus, index) => (
                        <div key={index} className="flex items-center justify-between mb-2">
                            <div>
                                <p className="font-semibold">{alumnus.title}</p>
                                {alumnus.company && <p className="text-sm text-gray-500">{alumnus.company}</p>}
                                {alumnus.date && <p className="text-sm text-gray-500">{alumnus.date}</p>}
                            </div>
                            <div className="flex items-center">
                                <FaStar className="text-yellow-400" />
                                <p className="ml-1">{alumnus.rating}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

const TableSection = () => {
    return (
        <div className="mt-15 flex justify-center space-x-10 ">
            <div className="w-185">
                <h2 className="text-lg font-semibold mb-2">Recent Managers</h2>
                <ul className="bg-gray-100 shadow-md rounded-lg p-4">
                    {recentManagers.map((manager, index) => (
                        <li key={index} className="flex justify-between border-b py-2">
                            <span>{manager.name}</span>
                            <span className="text-gray-500">{manager.joined}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="w-185">
                <h2 className="text-lg font-semibold mb-2">Recent Alumni</h2>
                <ul className="bg-gray-100 shadow-md rounded-lg p-4">
                    {recentAlumni.map((alumni, index) => (
                        <li key={index} className="flex justify-between border-b py-2">
                            <span>{alumni.name} - {alumni.location}</span>
                            <span className="text-gray-500">{alumni.joined}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const HomePage = () => {
    return (
        <>
            <header className="ml-16 mt-10 flex flex-row">
                <div className="flex flex-col">
                    <h1 className="text-5xl font-bold text-primary">Dashboard</h1>
                    <p className="font-light text-gray-400">Everything, Everywhere. All at once.</p>
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