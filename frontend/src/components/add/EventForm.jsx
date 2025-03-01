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
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, eventphoto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!eventData.eventphoto) {
            alert("Event photo is required.");
            return;
        }

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
                userid: "U001", // Reset to default user ID
            });
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Failed to create event.");
        }
    };

    return (
        <div className="ml-15 mr-5 mt-5 w-8/12">
            {/* Event Photo */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Upload a picture</legend>
                <input type="file" className="w-11/12 file-input" onChange={handleFileChange} required />
            </fieldset>

            {/* Event Title */}
            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Title</legend>
                <input type="text" name="title" value={eventData.title} onChange={handleChange} className="w-11/12 input" placeholder="Insert event title here" required />
            </fieldset>

            {/* Event Description */}
            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Description</legend>
                <textarea name="description" value={eventData.description} onChange={handleChange} className="textarea h-24 w-11/12" placeholder="Insert event description here" required></textarea>
            </fieldset>

            {/* Event Location */}
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Location</legend>
                <input type="text" name="eventloc" value={eventData.eventloc} onChange={handleChange} className="w-11/12 input" placeholder="Insert event location here" required />
            </fieldset>

            {/* School and Batch */}
            <div className="flex w-full flex-col lg:flex-row mt-4 space-x-64">
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold mb-2">School</p>
                    <select className="select validator" name="school" value={eventData.school} onChange={handleChange} required>
                        <option value="">Select school here</option>
                        <option>SAMCIS</option>
                        <option>SONAHBS</option>
                        <option>STELA</option>
                        <option>SAS</option>
                        <option>SEA</option>
                        <option>SOM</option>
                    </select>
                </div>
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold mb-2">Batch</p>
                    <select className="select validator" name="batchfilter" value={eventData.batchfilter} onChange={handleChange} required>
                        <option value="">Select batch here</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                    </select>
                </div>
            </div>

            {/* Category and Schedule */}
            <div className="flex flex-col lg:flex-row mt-4 space-x-64">
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold mb-2">Category</p>
                    <select className="select validator" name="category" value={eventData.category} onChange={handleChange} required>
                        <option value="">Select category here</option>
                        <option>Reunion</option>
                        <option>Seminar</option>
                        <option>Thanksgiving</option>
                    </select>
                </div>
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold mb-2">Schedule</p>
                    <input type="datetime-local" name="eventdatetime" onChange={handleDateTimeChange} className="input" required />
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex mr-23 mt-8 justify-end">
                <button onClick={handleSubmit} className="btn btn-primary hover:select-secondary">Publish</button>
            </div>
        </div>
    );
};

export default EventForm;
