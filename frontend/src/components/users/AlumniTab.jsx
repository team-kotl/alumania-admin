import React, { useEffect, useState } from "react";
import axios from "axios";

const AlumniTab = () => {
    const [alumni, setAlumni] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAlumni, setSelectedAlumni] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users", {
                    responseType: "json", 
                });
                setAlumni(response.data);
            } catch (error) {
                console.error("Error fetching alumni:", error);
            }
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const handleSelectAlumni = (user) => {
        if (user.displaypic) {
            const blob = new Blob([new Uint8Array(user.displaypic.data)], { type: "image/jpeg" });
            const url = URL.createObjectURL(blob);
            setImageUrl(url);
        } else {
            setImageUrl(null);
        }
        setSelectedAlumni(user);
    };

    if (loading) {
        return (
            <div className="flex flex-row h-[30rem] w-full items-center justify-center">
                <span className="loading loading-spinner w-12"></span>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto ml-17 mt-20">
            <table className="table w-full border-collapse border border-gray-100 shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-15 py-3.5 text-gray-600">UserID</th>
                        <th className="px-15 py-3.5 text-gray-600">Email</th>
                        <th className="px-15 py-3.5 text-gray-600">Full Name</th>
                        <th className="px-15 py-3.5 text-gray-600">School</th>
                        <th className="px-13 py-3.5 text-gray-600">Batch</th>
                        <th className="px-15 py-3.5 text-gray-600">Employment Status</th>
                        <th className="px-15 py-3.5 text-gray-600">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {alumni.map((user) => (
                        <tr
                            key={user.userid}
                            className="hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelectAlumni(user)}
                        >
                            <td className="px-15 py-5">{user.userid}</td>
                            <td className="px-15 py-5">{user.email}</td>
                            <td className="px-15 py-5">{user.fullname}</td>
                            <td className="px-15 py-5">{user.school}</td>
                            <td className="px-13 py-5">{user.batch}</td>
                            <td className="px-15 py-5">{user.empstatus}</td>
                            <td className="px-15 py-5">{user.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedAlumni && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
                        <button
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            onClick={() => setSelectedAlumni(null)}
                        >
                            ✕
                        </button>
                        <img
                            src={imageUrl || "https://via.placeholder.com/150"}
                            alt="Profile"
                            className="w-32 h-32 mx-auto rounded-full mb-4"
                        />
                        <h2 className="text-xl font-semibold text-center mb-2">
                            {selectedAlumni.fullname}
                        </h2>
                        <p className="text-gray-600 text-center">{selectedAlumni.email}</p>
                        <p className="text-gray-600 text-center">School: {selectedAlumni.school}</p>
                        <p className="text-gray-600 text-center">Batch: {selectedAlumni.batch}</p>
                        <p className="text-gray-600 text-center">
                            Employment: {selectedAlumni.empstatus}
                        </p>
                        <p className="text-gray-600 text-center">Location: {selectedAlumni.location}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AlumniTab;
