import React, { useEffect, useState  } from "react";
import axios from "axios";
// TODO: Joyce at si Badang
const AlumniTab = () => {
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users") 
            .then(response => {
                setAlumni(response.data);
            })
            .catch(error => {
                console.error("Error fetching alumni:", error);
            });
    }, []);

    return (
        <div className="overflow-x-auto ml-17 mt-20"> 
            <table className="table w-full border-collapse border border-gray-50 shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-15 py-5 text-gray-600">UserID</th>
                        <th className="px-15 py-5">Email</th>
                        <th className="px-19 py-5">Full Name</th>
                        <th className="px-15 py-5">Employment Status</th>
                        <th className="px-15 py-5">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {alumni.map(user => (
                        <tr key={user.userid} className="hover:bg-gray-100">
                            <td className="px-15 py-5">{user.userid}</td>
                            <td className="px-15 py-5">{user.email}</td>
                            <td className="px-19 py-5">{user.fullname}</td>
                            <td className="px-15 py-5">{user.empstatus}</td>
                            <td className="px-15 py-5">{user.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
    
export default AlumniTab;
