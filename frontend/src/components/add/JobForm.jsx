import React, { useState, useEffect } from "react";
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
        const [locationsData, setLocationsData] = useState([]);
        const [regions, setRegions] = useState([]);
        const [provinces, setProvinces] = useState([]);
        const [cities, setCities] = useState([]);
        const [selectedRegion, setSelectedRegion] = useState("");
        const [selectedProvince, setSelectedProvince] = useState("");
        const [selectedCity, setSelectedCity] = useState("");
        const [street, setStreet] = useState("");

    useEffect(() => {
        fetch("/locations.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Locations data loaded:", data); // Debugging
                setLocationsData(data);
                const uniqueRegions = [...new Set(data.map(item => item.REGION))];
                setRegions(uniqueRegions);
            })
            .catch(error => console.error("Error loading locations:", error));
    }, []);

    useEffect(() => {
        if (selectedRegion) {
            const filteredProvinces = [
                ...new Set(locationsData.filter(item => item.REGION === selectedRegion).map(item => item.PROVINCE))
            ];
            setProvinces(filteredProvinces);
            setCities([]);
            setSelectedProvince("");
        } else {
            setProvinces([]);
            setCities([]);
        }
    }, [selectedRegion]);

    useEffect(() => {
        if (selectedProvince) {
            const filteredCities = locationsData
                .filter(item => item.PROVINCE === selectedProvince)
                .map(item => item["CITY/ MUNICIPALITY"]);
            setCities(filteredCities);
            setSelectedCity("");
        } else {
            setCities([]);
        }
    }, [selectedProvince]);

    useEffect(() => {
        const fullLocation = [selectedRegion, selectedProvince, selectedCity, street]
            .filter(Boolean)
            .join(", ");
        setJobData(prevData => ({ ...prevData, location: fullLocation }));
    }, [selectedRegion, selectedProvince, selectedCity, street]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData(prevData => {
            const updatedData = { ...prevData, [name]: value };
            console.log("Updated Job Data:", updatedData);  // Debugging
            return updatedData;
        });
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    };
    
    const validateForm = () => {
        console.log("Validating Job Data:", jobData);
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
        if (!selectedRegion) newErrors.selectedRegion = "Region is required.";
        if (!selectedProvince) newErrors.selectedProvince = "Province is required.";
        if (!selectedCity) newErrors.selectedCity = "City is required.";
        if (jobData.contactnumber) {
            if (!/^\d{11}$/.test(jobData.contactnumber)) {
                newErrors.contactnumber = "Must be exactly 11 digits.";
            } else if (!/^09\d{9}$/.test(jobData.contactnumber)) {
                newErrors.contactnumber = "Must start with '09'.";
            }
        }
        console.log("Validation Errors:", newErrors);
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            console.log("Form validation failed:", errors);
            return;
        }
        const fullLocation = [selectedRegion, selectedProvince, selectedCity, street]
            .filter(Boolean)
            .join(", ");
        setJobData(prevData => ({ ...prevData, location: fullLocation }));
        const updatedJobData = { ...jobData, location: fullLocation, userid: "U001" };
        console.log("Job Data before sending:", updatedJobData);
        
        try {
            const response = await axios.post("http://localhost:5000/job", updatedJobData);
            console.log("Server Response:", response.data);
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
            setSelectedRegion("");
            setSelectedProvince("");
            setSelectedCity("");
            setStreet("");
            setErrors({});
        } catch (error) {
            console.error("Error posting job:", error.response?.data || error.message);
            alert(`Failed to post job: ${error.response?.data?.message || "Unknown error"}`);
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
            {/* Event Location */}
            <div className="flex w-full flex-col lg:flex-row mt-4">
                <div className="w-full">
                    <form>
                    <p className="text-lg text-primary font-semibold">Location</p>
                        <select className="select validator" onChange={(e) => setSelectedRegion(e.target.value)} value={selectedRegion}>
                            <option value="">Select Region</option>
                            {regions.map((region, index) => <option key={index} value={region}>{region}</option>)}
                        </select>
                        {errors.selectedRegion && <p className="text-red-500 text-xs">{errors.selectedRegion}</p>}
                    </form>
                </div>
                <div className="w-full">
                    <form>
                    <p className="text-lg text-white font-semibold">.</p>
                        <select className="select validator" onChange={(e) => setSelectedProvince(e.target.value)} value={selectedProvince} disabled={!selectedRegion}>
                            <option value="">Select Province</option>
                            {provinces.map((province, index) => <option key={index} value={province}>{province}</option>)}
                        </select>
                        {errors.selectedProvince && <p className="text-red-500 text-xs">{errors.selectedProvince}</p>}
                    </form>
                </div>
                <div className="w-full mr-18">
                    <form>
                    <p className="text-lg text-white font-semibold">.</p>
                        <select className="select validator" onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity} disabled={!selectedProvince}>
                            <option value="">Select City</option>
                            {cities.map((city, index) => <option key={index} value={city}>{city}</option>)}
                        </select>
                        {errors.selectedCity && <p className="text-red-500 text-xs">{errors.selectedCity}</p>}
                    </form>
                </div>
            </div>
            <fieldset className="fieldset mt-1">
                <input type="text" name="location" onChange={(e) => setStreet(e.target.value)} value={street} className="w-11/12 input" placeholder="Insert street here" />
                {errors.location && <p className="text-red-500">{errors.location}</p>}
            </fieldset>
            {/* Company Name */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Company Name</legend>
                <input type="text" name="companyname" value={jobData.companyname} onChange={handleChange} className="w-11/12 input" placeholder="Insert company name here" />
                {errors.companyname && <p className="text-red-500">{errors.companyname}</p>}
            </fieldset>
            <div className="flex flex-col lg:flex-row space-x-10 mr-23 mt-2">
                {/* Contact Name Field */}
                <fieldset className="w-1/2 flex flex-col">
                    <legend className="text-lg text-primary mb-1 font-semibold">Contact Name</legend>
                    <input 
                        type="text" 
                        name="contactname" 
                        value={jobData.contactname} 
                        onChange={handleChange} 
                        className="w-full input px-3 py-2 border rounded-md" 
                        placeholder="Insert contact name here" 
                    />
                    {errors.contactname && <p className="text-red-500 text-xs">{errors.contactname}</p>}
                </fieldset>
                {/* Company Email Field */}
                <div className="w-1/2 flex flex-col">
                    <p className="text-lg text-primary mb-1 font-semibold">Company Email</p>
                    <label className="w-full input validator flex items-center gap-2 px-3 py-2 border rounded-md">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                            </g>
                        </svg>
                        <input 
                            type="email" 
                            name="contactemail" 
                            value={jobData.contactemail} 
                            onChange={handleChange} 
                            className="w-full" 
                            placeholder="mail@site.com" 
                            required 
                        />
                    </label>
                    {errors.contactemail && <p className="text-red-500 text-xs">{errors.contactemail}</p>}
                </div>
            </div>
            <div className="flex flex-col lg:flex-row space-x-10 mt-2 mr-11">
                {/* Contact Number Field */}
                <div className="w-1/2 flex flex-col">
                    <p className="text-lg text-primary font-semibold mb-1">Contact Number</p>
                    <label className="w-full input validator flex items-center gap-2 px-3 py-2 border rounded-md">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                            <g fill="none">
                                <path d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z" fill="currentColor"></path>
                                <path fillRule="evenodd" clipRule="evenodd" d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z" fill="currentColor"></path>
                            </g>
                        </svg>
                        <input 
                            type="tel" 
                            name="contactnumber" 
                            value={jobData.contactnumber} 
                            onChange={(e) => {
                                const value = e.target.value;
                                if (!/^\d*$/.test(value)) return;
                                setJobData({ ...jobData, contactnumber: value });
                                setErrors((prevErrors) => ({ ...prevErrors, contactnumber: "" }));
                            }}
                            className="w-full" 
                            placeholder="Phone" 
                            required 
                            maxLength="11" 
                        />
                    </label>
                    {errors.contactnumber && <p className="text-red-500 text-xs">{errors.contactnumber}</p>}
                </div>
                {/* Work Type Field */}
                <div className="w-1/2 mr-12 flex flex-col">
                    <p className="text-lg text-primary font-semibold mb-1">Work Type</p>
                    <select className="select validator w-full px-3 py-2 border rounded-md" name="type" value={jobData.type} onChange={handleChange}>
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