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

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({
            ...jobData,
            [name]: value,
        });

        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };

    const validateForm = () => {
        let newErrors = {};
        const requiredFields = [
            "title",
            "type",
            "location",
            "description",
            "companyname",
            "contactname",
            "contactemail",
            "contactnumber",
        ];

        requiredFields.forEach((field) => {
            if (!jobData[field]) {
                newErrors[field] = "This field is required.";
            }
        });
        // Validate Contact Number
        if (jobData.contactnumber) {
            if (!/^\d{11}$/.test(jobData.contactnumber)) {
                newErrors.contactnumber = "Must be exactly 11 digits.";
            } else if (!/^09\d{9}$/.test(jobData.contactnumber)) {
                newErrors.contactnumber = "Must start with '09'.";
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        
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
            setErrors({});
        } catch (error) {
            console.error("Error posting job:", error);
            alert("Failed to post job.");
        }
    };

    return (
        <div className="ml-15 mr-3 mt-2 w-8/12">
            {/* Job Title */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Title</legend>
                <input type="text" name="title" value={jobData.title} onChange={handleChange} className="w-11/12 input" placeholder="Insert job title here" />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </fieldset>

            {/* Job Description */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Description</legend>
                <textarea name="description" value={jobData.description} onChange={handleChange} className="textarea h-24 w-11/12" placeholder="Insert job description here"></textarea>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
            </fieldset>

            {/* Location */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Location</legend>
                <input type="text" name="location" value={jobData.location} onChange={handleChange} className="w-11/12 input" placeholder="Insert company location here" />
                {errors.location && <p className="text-red-500">{errors.location}</p>}
            </fieldset>

            {/* Company Name */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Company Name</legend>
                <input type="text" name="companyname" value={jobData.companyname} onChange={handleChange} className="w-11/12 input" placeholder="Insert company name here" />
                {errors.companyname && <p className="text-red-500">{errors.companyname}</p>}
            </fieldset>
            
            {/* Contact Information */}
            <div className="flex flex-col lg:flex-row mr-12">
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Contact Name</legend>
                    <input type="text" name="contactname" value={jobData.contactname} onChange={handleChange} className="w-11/12 input" placeholder="Insert contact name here" />
                    {errors.contactname && <p className="text-red-500">{errors.contactname}</p>}
                </fieldset>
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Company Email</legend>
                    <input type="email" name="contactemail" value={jobData.contactemail} onChange={handleChange} className="w-11/12 input" placeholder="Insert contact email here" />
                    {errors.contactemail && <p className="text-red-500">{errors.contactemail}</p>}
                </fieldset>
            </div>
            <div className="flex flex-col lg:flex-row space-x-2">
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Contact Number</legend>
                    <input type="text" name="contactnumber" value={jobData.contactnumber}         
                    onChange={(e) => {
                        const value = e.target.value;
                        if (!/^\d*$/.test(value)) return;
                        setJobData({ ...jobData, contactnumber: value });
                        setErrors((prevErrors) => ({ ...prevErrors, contactnumber: "" }));
                    }}
                    className="w-11/12 input" 
                    placeholder="Insert contact number here" 
                    maxLength="11" 
                    />
                    {errors.contactnumber && <p className="text-red-500">{errors.contactnumber}</p>}
                </fieldset>

                {/* Work Type */}
                <div className="w-1/2 mt-2 mr-12">
                    <p className="text-lg text-primary font-semibold mb-2">Work Type</p>
                    <select className="select validator" name="type" value={jobData.type} onChange={handleChange}>
                        <option value="">Select work type here</option>
                        <option>Onsite</option>
                        <option>Remote</option>
                        <option>Hybrid</option>
                    </select>
                    {errors.type && <p className="text-red-500 text-xs">{errors.type}</p>}
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
