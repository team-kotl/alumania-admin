import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicantsTab = () => {
    const [applicants, setApplicants] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(""); 

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get("http://localhost:5000/users/applicant"); 
                setApplicants(response.data);
            } catch (err) {
                console.error("Error fetching applicants:", err);
                setError(err.message || "Failed to fetch applicants.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplicants();
    }, []);

    const handleAccept = async (applicantid) => {
        console.log("Accepting:", applicantid);
        try {
            const response = await axios.post(`http://localhost:5000/users/accept/${applicantid}`);
            console.log("Response:", response.data);
            
            setApplicants((prev) => prev.filter((applicant) => applicant.applicantid !== applicantid));
            setNotification("Applicant accepted successfully!");
        } catch (err) {
            console.error("Error accepting applicant:", err.response?.data || err.message);
            setNotification("Error accepting applicant"); 
        }
    };
    
    const handleDecline = async (applicantid) => {
        console.log("Declining:", applicantid); 
        try {
            await axios.delete(`http://localhost:5000/users/decline/${applicantid}`);
    
            setApplicants((prev) => prev.filter((applicant) => applicant.applicantid !== applicantid)); 
            setNotification("Applicant declined successfully!"); 
        } catch (err) {
            console.error("Error declining applicant:", err);
            setNotification("Error declining applicant"); 
        }
    };

    if (loading) {
        return (
            <div className="flex flex-row h-[30rem] w-full items-center justify-center">
                <span className="loading loading-spinner w-12"></span>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto ml-40 mt-4">
            {notification && (
                <div className="bg-green-500 text-white p-2 rounded mb-4 text-center">
                    {notification}
                </div>
            )}

            <table className="table w-full mt-7">
                <thead className="bg-gray-100 border-b-2 border-gray-100 rounded-tl-lg rounded-tr-lg">
                    <tr>
                        <th className="px-17 py-3 text-gray-600 text-left rounded-tl-lg">Full Name</th>
                        <th className="px-23 py-3 text-gray-600 text-left">Course</th>
                        <th className="px-17 py-3 text-gray-600 text-left">School</th>
                        <th className="px-19 py-3 text-gray-600 text-left">Batch</th>
                        <th className="px-19 py-3 text-gray-600 text-left">Location</th>
                        <th></th>
                        <th className="px-19 py-3 text-gray-600 text-left rounded-tr-lg"></th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant) => (
                        <tr key={applicant.applicantid}> 
                            <td className="px-17 py-4">{applicant.fullname}</td>
                            <td className="px-23 py-4">{applicant.course}</td>
                            <td className="px-17 py-4">{applicant.school}</td>
                            <td className="px-19 py-4">{applicant.batch}</td>
                            <td className="px-19 py-4">{applicant.location}</td>
                            <td>
                                <button

                                    onClick={() => {
                                        console.log("Accepting:", applicant.applicantid); 
                                        handleAccept(applicant.applicantid);
                                    }}
                                >
                                    <img src="../src/assets/accept.png" alt="Accept"/>
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => handleDecline(applicant.applicantid)}
                                >
                                    <img src="../src/assets/reject.png" alt="Decline"/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsTab;
