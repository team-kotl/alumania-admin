import React, { useState } from "react";

const EventForm = () => {
    const [eventData, setEventData] = useState({
        title: "",
        description: "",
        category: "",
        eventtime: "",
        eventloc: "",
        batchfilter: "",
        eventphoto: null,
        school: "",
    });

    const handleChange = (e) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setEventData((prevData) => ({
            ...prevData,
            eventphoto: file, // Store the file directly for FormData
        }));
    };

    const handlePublish = async () => {
        const timestamp = new Date().toISOString();
        const formData = new FormData();

        Object.entries(eventData).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        formData.append("publishtimestamp", timestamp);

        try {
            const response = await fetch("/api/events", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Event published successfully!");
                setEventData({
                    title: "",
                    description: "",
                    category: "",
                    eventtime: "",
                    eventloc: "",
                    batchfilter: "",
                    eventphoto: null,
                    school: "",
                });
            } else {
                alert("Failed to publish event.");
            }
        } catch (error) {
            console.error("Error publishing event:", error);
            alert("An error occurred while publishing the event.");
        }
    };

    return (
        <div className="ml-15 mr-5 w-8/12">
            <fieldset className="fieldset">
                <legend className="fieldset-legend text-lg text-primary">Upload a picture</legend>
                <input type="file" className="w-11/12 file-input" onChange={handleFileChange} />
                <label className="fieldset-label">Max size 2MB</label>
            </fieldset>

            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Title</legend>
                <input type="text" name="title" value={eventData.title} onChange={handleChange} className="w-11/12 input" placeholder="Insert event title here" />
            </fieldset>

            <fieldset className="fieldset mt-2">
                <legend className="fieldset-legend text-lg text-primary">Description</legend>
                <textarea className="textarea h-24 w-11/12" name="description" value={eventData.description} onChange={handleChange} placeholder="Insert event description here"></textarea>
            </fieldset>

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
                <input type="text" className="w-11/12 input" name="eventloc" value={eventData.eventloc} onChange={handleChange} placeholder="Insert street number and barangay here" />
            </fieldset>

            <div className="flex w-full flex-col lg:flex-row mt-4 space-x-64">
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold">School</p>
                    <select className="select validator" name="school" value={eventData.school} onChange={handleChange} required>
                        <option value="">Select school here</option>
                        <option>SAMCIS</option>
                        <option>SONAHBS</option>
                        <option>STELA</option>
                        <option>SAS</option>
                        <option>SEA</option>
                        <option>SOM</option>
                    </select>
                    <p className="validator-hint">Required</p>
                </div>
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold">Batch</p>
                    <select className="select validator" name="batchfilter" value={eventData.batchfilter} onChange={handleChange} required>
                        <option value="">Select batch here</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                    </select>
                    <p className="validator-hint">Required</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row mt-2 space-x-64">
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold">Category</p>
                    <select className="select validator" name="category" value={eventData.category} onChange={handleChange} required>
                        <option value="">Select category here</option>
                        <option>Reunion</option>
                        <option>Seminar</option>
                        <option>Thanksgiving</option>
                    </select>
                    <p className="validator-hint">Required</p>
                </div>
                
                <div className="w-full">
                    <p className="text-lg text-primary font-semibold">Schedule</p>
                    <input type="datetime-local" name="eventtime" value={eventData.eventtime} onChange={handleChange} className="input" />
                </div>
            </div>

            <div className="flex mr-23 mt-5 justify-end">
                <button onClick={handlePublish} className="btn btn-primary hover:select-secondary">Publish</button>
            </div>
        </div>
    );
};

export default EventForm;
