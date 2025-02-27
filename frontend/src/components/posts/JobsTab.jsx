import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
// TODO: Nikko

const JobsTab = () => {
    const [jobs, setJobs] = useState([]);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);

    // Fetch all job posts
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/jobs");
                setJobs(response.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    // Fetch interested users when a job is selected
    const fetchInterestedUsers = async (jobpid) => {
        try {
            const response = await axios.get(`http://localhost:5000/jobs/interested/${jobpid}`);
            setInterestedUsers(response.data);
            setSelectedJobId(jobpid);
            document.getElementById("view_Interested").showModal();
        } catch (error) {
            console.error("Error fetching interested users:", error);
        }
    };

    return (
        <>
            <InterestedPeople interestedUsers={interestedUsers} />
            
            <div className="flex flex-row w-full justify-center">
                
                <div className="join join-vertical w-[55vw] h-[80vh] overflow-y-auto items-center shadow-[0px_1px_5px_rgba(0,0,0,0.05)] rounded-3xl">
                    {jobs.map((job) => (
                        <div key={job.jobpid} className="relative join-item bg-white p-4 w-full border-b border-gray-200">
                            <div className="absolute top-1 right-2">
                                <button className="btn btn-ghost btn-square btn-error btn-sm">
                                    <IoClose />
                                </button>
                            </div>
                            <h3 className="font-semibold text-lg text-black">{job.title}</h3>
                            <p className="text-gray-500 text-sm">{job.companyname}</p>
                            <p className="text-gray-500 text-sm">{job.location}</p>
                            <p className="mt-2 ml-5 text-gray-500 text-sm text-justify">{job.description}</p>
                            <div className="flex justify-end mt-2">
                                <button
                                    type="button"
                                    className="btn btn-active bottom-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-lg"
                                    onClick={() => fetchInterestedUsers(job.jobpid)}
                                >
                                    View Interested
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

const InterestedPeople = ({ interestedUsers }) => {
    return (
        <dialog id="view_Interested" className="modal">
            <div className="modal-box">
                <div className="flex justify-center mb-[2.5vh]">
                    <h2 className="text-lg font-bold">
                        Number of Interested Users: {interestedUsers.length}
                    </h2>
                </div>
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <div>
                    <ul>
                        {interestedUsers.map((user, index) => (
                            <li key={index} className="flex justify-between items-center p-2 border-b">
                                <div className="flex items-center">
                                    <img src={`data:image/jpeg;base64,${user.displaypic}`}
                                        alt=""
                                        className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <span>{user.firstname} {user.lastname}</span>
                                </div>
                                <span className="text-gray-500 text-sm">{user.course}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </dialog>
    );
};

export default JobsTab;
