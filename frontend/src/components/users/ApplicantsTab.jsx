import React, { useEffect, useState } from "react";
import axios from "axios";

const ApplicantsTab = () => {
    const [applicants, setApplicants] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    if (loading) {
        return (
            <div className="flex flex-row h-[30rem] w-full items-center justify-center">
                <span className="loading loading-spinner w-12"></span>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto ml-30 mt-13">
            <table className="table w-full max-w-none border-collapse border border-gray-100 shadow-lg rounded-lg">
                <thead className="bg-gray-100">
                    <tr>
                        <th>Full Name</th>
                        <th>Course</th>
                        <th>School</th>
                        <th>Batch</th>
                        <th>Location</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant, index) => (
                        <tr key={index}>
                            <td>{applicant.fullname}</td>
                            <td>{applicant.course}</td>
                            <td>{applicant.school}</td>
                            <td>{applicant.batch}</td>
                            <td>{applicant.location}</td>
                            <td>
                                <button>
                                    Accept
                                </button>
                            </td>
                            <td>
                                <button>
                                    Decline
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
