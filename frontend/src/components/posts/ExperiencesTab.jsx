import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { IoClose } from "react-icons/io5";
// TODO: Nikko
const ExperiencesTab = () => {
    const [experiences, setExperiences] = useState([]);
    
    useEffect(() => {
        const fetchExperiences = async () => {
            try {
                const response = await axios.get("http://localhost:5000/experiences");
                setExperiences(response.data);
            } catch (error) {
                console.error("Error fetching experiences:", error);
            }
        };

        fetchExperiences();
    }, []);

    return (
        <>
        <div className="flex flex-row w-full justify-center">
            <div className="join join-vertical w-30% h-[80vh] overflow-y-auto items-center shadow-[0px_1px_5px_rgba(0,0,0,0.05)] rounded-3xl">
                {experiences.map((exp) => (
                    <div key={exp.xpid} className="relative join-item bg-white p-4 w-full border-b border-gray-200">
                        <div className="flex items-center mb-2">
                            
                            {exp.displaypic ? (
                                <img
                                    className="w-10 h-10 rounded-full mr-2"
                                    src={`data:image/png;base64,${exp.displaypic}`}
                                    alt={`${exp.firstname} ${exp.lastname}`}
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-gray-300 mr-2"></div>
                            )}

                            <div>
                                <h3 className="font-semibold text-m">
                                    {exp.firstname} {exp.lastname}
                                </h3>
                                <p className="text-gray-500 text-sm">
                                    {new Date(exp.publishtimestamp).toLocaleString()}
                                </p>
                            </div>

                            <div className="absolute top-1 right-2">
                                <button className="btn btn-ghost btn-square btn-error btn-sm">
                                    <IoClose />
                                </button>
                            </div>
                        </div>

            
                        <div className="text-gray-500 text-sm ml-12 mt-6 mb-3">
                            <p className="mb-1 text-justify text-wrap">{exp.body}</p>
                            
                    
                            <div className="flex flex-wrap">
                                {exp.images && exp.images.length > 0 &&
                                    exp.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`data:image/png;base64,${image}`}
                                            alt="Experience"
                                            className="w-40 h-40 object-cover rounded-lg mr-2 mb-2"
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default ExperiencesTab;
