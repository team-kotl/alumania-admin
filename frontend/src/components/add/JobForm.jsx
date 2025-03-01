import React, { useState } from "react";
import axios from "axios";

const JobForm = () => {
    const [jobData, setJobData] = useState({
        title: "",
        type: "",
        location: "",
        description: "",
        companyname: "",
        contactname: "",
        contactemail: "",
        contactnumber: "",
        userid: "U001", // Default User ID
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({
            ...jobData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are filled
        for (const key in jobData) {
            if (!jobData[key]) {
                alert("All fields are required.");
                return;
            }
        }

        try {
            await axios.post("http://localhost:5000/job", jobData);
            alert("Job posted successfully!");
            setJobData({
                title: "",
                type: "",
                location: "",
                description: "",
                companyname: "",
                contactname: "",
                contactemail: "",
                contactnumber: "",
                userid: "U001",
            });
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Failed to post job.");
        }
    };

    return (
        <div className="ml-15 mr-5 w-8/12">
            {/* Job Title */}
            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Title</legend>
                <input type="text" name="title" value={jobData.title} onChange={handleChange} className="w-11/12 input" placeholder="Insert job title here" required />
            </fieldset>

            {/* Job Description */}
            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Description</legend>
                <textarea name="description" value={jobData.description} onChange={handleChange} className="textarea h-24 w-11/12" placeholder="Insert job description here" required></textarea>
            </fieldset>

            {/* Location */}
            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Location</legend>
                <input type="text" name="location" value={jobData.location} onChange={handleChange} className="w-11/12 input" placeholder="Insert company location here" required />
            </fieldset>

            {/* Company Name */}
            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Company Name</legend>
                <input type="text" name="companyname" value={jobData.companyname} onChange={handleChange} className="w-11/12 input" placeholder="Insert company name here" required />
            </fieldset>
            
            {/* Contact Information */}
            <div className="flex flex-col lg:flex-row mt-2 space-x-5 mr-12">
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Contact Name</legend>
                    <input type="text" name="contactname" value={jobData.contactname} onChange={handleChange} className="w-11/12 input" placeholder="Insert contact name here" required />
                </fieldset>

                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Company Email</legend>
                    <input type="email" name="contactemail" value={jobData.contactemail} onChange={handleChange} className="w-11/12 input" placeholder="Insert contact email here" required />
                </fieldset>
            </div>

            <div className="flex flex-col lg:flex-row mt-2 space-x-2">
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Contact Number</legend>
                    <input type="text" name="contactnumber" value={jobData.contactnumber} onChange={handleChange} className="w-11/12 input" placeholder="Insert contact number here" required />
                </fieldset>

                {/* Work Type */}
                <div className="w-1/2 mt-2 mr-12">
                    <p className="text-lg text-primary font-semibold mb-2">Work Type</p>
                    <select className="select validator" name="type" value={jobData.type} onChange={handleChange} required>
                        <option value="">Select work type here</option>
                        <option>Onsite</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                    </select>
                    <p className="validator-hint">Required</p>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex mr-23 mt-5 justify-end">
                <button onClick={handleSubmit} className="btn btn-primary hover:select-secondary">Publish</button>
            </div>
        </div>
    );
};

export default JobForm;
