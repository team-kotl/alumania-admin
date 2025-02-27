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

    const handleAccept = async (applicantid) => {
        console.log("Accepting:", applicantid);
        try {
            const response = await axios.post(`http://localhost:5000/users/accept/${applicantid}`);
            console.log("Response:", response.data);
            
            setApplicants((prev) => prev.filter((applicant) => applicant.applicantid !== applicantid)); 
        } catch (err) {
            console.error("Error accepting applicant:", err.response?.data || err.message);
        }
    };
    
    const handleDecline = async (applicantid) => {
        console.log("Declining:", applicantid); 
        try {
            await axios.delete(`http://localhost:5000/users/decline/${applicantid}`);
    
            setApplicants((prev) => prev.filter((applicant) => applicant.applicantid !== applicantid)); 
        } catch (err) {
            console.error("Error declining applicant:", err);
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
                    {applicants.map((applicant) => (
                        <tr key={applicant.applicantid}> 
                            <td>{applicant.fullname}</td>
                            <td>{applicant.course}</td>
                            <td>{applicant.school}</td>
                            <td>{applicant.batch}</td>
                            <td>{applicant.location}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        console.log("Accepting:", applicant.applicantid); 
                                        handleAccept(applicant.applicantid);
                                    }}
                                >
                                    Accept
                                </button>
                            </td>
                            <td>
                                <button
                                    onClick={() => {
                                        console.log("Declining:", applicant.applicantid); 
                                        handleDecline(applicant.applicantid);
                                    }}
                                >
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
