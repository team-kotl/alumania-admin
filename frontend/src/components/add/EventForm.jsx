import React, { useState } from "react";
import axios from "axios";

const EventForm = () => {
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        category: "",
        eventdate: "",
        eventtime: "",
        eventloc: "",
        batchfilter: "",
        school: "",
        eventphoto: null,
        userid: "U001", // Default User ID
    });

    const [errors, setErrors] = useState({});

    const formatDate = (datetime) => {
        return new Date(datetime).toISOString().split("T")[0];
    };

    const formatTime = (datetime) => {
        return new Date(datetime).toISOString().split("T")[1].split(".")[0];
    };

    const handleDateTimeChange = (e) => {
        const { value } = e.target;
        setEventData((prevData) => ({
            ...prevData,
            eventdate: formatDate(value),
            eventtime: formatTime(value),
        }));
    };

    const handleChange = (e) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value,
        });
        setErrors((prevErrors) => ({ ...prevErrors, [e.target.name]: "" }));
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, eventphoto: e.target.files[0] });
        setErrors((prevErrors) => ({ ...prevErrors, eventphoto: "" }));
    };

    const validateForm = () => {
        let newErrors = {};
        const requiredFields = [
            "title",
            "description",
            "category",
            "eventdate",
            "eventtime",
            "eventloc",
            "batchfilter",
            "school",
            "eventphoto"
        ];

        requiredFields.forEach((field) => {
            if (!eventData[field]) {
                newErrors[field] = "This field is required.";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        for (const key in eventData) {
            if (eventData[key]) {
                formData.append(key, eventData[key]);
            }
        }

        try {
            await axios.post("http://localhost:5000/event", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Event created successfully!");
            setEventData({
                title: "",
                description: "",
                category: "",
                eventdate: "",
                eventtime: "",
                eventloc: "",
                batchfilter: "",
                school: "",
                eventphoto: null,
                userid: "U001",
            });
            setErrors({});
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event.");
        }
    };

    return (
        <div className="ml-15 mr-3 mt-2 w-8/12">
            {/* Event Photo */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Upload a picture</legend>
                <input type="file" className="w-11/12 file-input" onChange={handleFileChange} />
                {errors.eventphoto && <p className="text-red-500">{errors.eventphoto}</p>}
            </fieldset>

            {/* Event Title */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Title</legend>
                <input type="text" name="title" value={eventData.title} onChange={handleChange} className="w-11/12 input" placeholder="Insert event title here" />
                {errors.title && <p className="text-red-500">{errors.title}</p>}
            </fieldset>

            {/* Event Description */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Description</legend>
                <textarea name="description" value={eventData.description} onChange={handleChange} className="textarea h-24 w-11/12" placeholder="Insert event description here"></textarea>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
            </fieldset>

            {/* Event Location */}
            <div className="flex w-full flex-col lg:flex-row mt-4">
                    <div className="w-full">
                        <form>
                        <p className="text-lg text-primary font-semibold">Location</p>
                            <select className="select validator" required>
                                <option disabled selected value="">Select region</option>
                                <option>Luzon</option>
                                <option>Visayas</option>
                                <option>Mindanao</option>
                            </select>
                            <p className="validator-hint">Required</p>
                        </form>
                    </div>

                    <div className="w-full">
                        <form>
                        <p className="text-lg text-white font-semibold">.</p>
                            <select className="select validator" required>
                                <option disabled selected value="">Select province</option>
                                <option>Province 1</option>
                                <option>Province 2</option>
                            </select>
                            <p className="validator-hint">Required</p>
                        </form>
                    </div>

                    <div className="w-full mr-18">
                        <form>
                        <p className="text-lg text-white font-semibold">.</p>
                            <select className="select validator" required>
                                <option disabled selected value="">Select city</option>
                                <option>City 1</option>
                                <option>City 2</option>
                            </select>
                            <p className="validator-hint">Required</p>
                        </form>
                    </div>
                </div>

            <fieldset className="fieldset">
                <input type="text" name="eventloc" value={eventData.eventloc} onChange={handleChange} className="w-11/12 input" placeholder="Insert event location here" />
                {errors.eventloc && <p className="text-red-500">{errors.eventloc}</p>}
            </fieldset>

            {/* School and Batch */}
            <div className="flex w-full flex-col lg:flex-row space-x-10">
                {/* School Selection */}
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">School</legend>
                    <select className="select validator w-full" name="school" value={eventData.school} onChange={handleChange}>
                        <option value="">Select school here</option>
                        <option>SAMCIS</option>
                        <option>SONAHBS</option>
                        <option>STELA</option>
                        <option>SAS</option>
                        <option>SEA</option>
                        <option>SOM</option>
                    </select>
                    {errors.school && <p className="text-red-500 text-xs">{errors.school}</p>}
                </fieldset>

                {/* Batch Selection */}
                <fieldset className="fieldset w-1/2 mr-23">
                    <legend className="fieldset-legend text-lg text-primary">Batch</legend>
                    <select className="select validator w-full" name="batchfilter" value={eventData.batchfilter} onChange={handleChange}>
                        <option value="">Select batch here</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                    </select>
                    {errors.batchfilter && <p className="text-red-500 text-xs">{errors.batchfilter}</p>}
                </fieldset>
            </div>

            {/* Category and Schedule */}
            <div className="flex flex-col lg:flex-row space-x-10">
                {/* Category Selection */}
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Category</legend>
                    <select className="select validator w-full" name="category" value={eventData.category} onChange={handleChange}>
                        <option value="">Select category here</option>
                        <option>Reunion</option>
                        <option>Seminar</option>
                        <option>Thanksgiving</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                </fieldset>

                {/* Event Schedule */}
                <fieldset className="fieldset w-1/2 mr-23">
                    <legend className="fieldset-legend text-lg text-primary">Schedule</legend>
                    <input type="datetime-local" name="eventdatetime" onChange={handleDateTimeChange} className="w-full input" />
                    {errors.eventdate && <p className="text-red-500 text-xs">{errors.eventdate}</p>}
                </fieldset>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8 mr-23">
                <button onClick={handleSubmit} className="btn btn-primary hover:select-secondary">Publish</button>
            </div>
        </div>
    );
};

export default EventForm;
