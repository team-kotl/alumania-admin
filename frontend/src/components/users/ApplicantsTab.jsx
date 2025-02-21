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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Course</th>
                        <th>Location</th>
                        <th>School</th>
                        <th>Batch</th>
                        <th>Accept</th>  
                        <th>Decline</th>  
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant, index) => (
                        <tr key={index}>
                            <td>{applicant.fullname}</td>
                            <td>{applicant.course}</td>
                            <td>{applicant.location}</td>
                            <td>{applicant.school}</td>
                            <td>{applicant.batch}</td>
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
