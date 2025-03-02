import React, { useState, useEffect } from "react";
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
    
    // Load provinces based on selected region
    useEffect(() => {
        if (selectedRegion) {
            const filteredProvinces = [
                ...new Set(locationsData.filter(item => item.REGION === selectedRegion).map(item => item.PROVINCE))
            ];
            setProvinces(filteredProvinces);
            setCities([]); // Reset cities when region changes
            setSelectedProvince("");
        } else {
            setProvinces([]);
            setCities([]);
        }
    }, [selectedRegion]);

    // Load cities based on selected province
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

    // Update `eventloc` dynamically
    useEffect(() => {
        const fullLocation = [selectedRegion, selectedProvince, selectedCity, street]
            .filter(Boolean)
            .join(", ");
        setEventData(prevData => ({ ...prevData, eventloc: fullLocation }));
    }, [selectedRegion, selectedProvince, selectedCity, street]);

    const handleDateTimeChange = (e) => {
        const { value } = e.target;
        const date = new Date(value);
        setEventData((prevData) => ({
            ...prevData,
            eventdate: date.toISOString().split("T")[0],
            eventtime: date.toISOString().split("T")[1].split(".")[0],
        }));
    };

    const handleChange = (e) => {
        setEventData({ ...eventData, [e.target.name]: e.target.value });
        setErrors(prevErrors => ({ ...prevErrors, [e.target.name]: "" }));
    };

    const handleFileChange = (e) => {
        setEventData({ ...eventData, eventphoto: e.target.files[0] });
        setErrors(prevErrors => ({ ...prevErrors, eventphoto: "" }));
    };

    const validateForm = () => {
        let newErrors = {};
        const requiredFields = ["title", "description", "category", "eventdate", "eventtime", "batchfilter", "school", "eventphoto"];
        requiredFields.forEach(field => { if (!eventData[field]) newErrors[field] = "This field is required."; });
        if (!selectedRegion) newErrors.selectedRegion = "Region is required.";
        if (!selectedProvince) newErrors.selectedProvince = "Province is required.";
        if (!selectedCity) newErrors.selectedCity = "City is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        // Format the event location correctly
        const fullLocation = [selectedRegion, selectedProvince, selectedCity, street]
            .filter(Boolean)
            .join(", ");
        setEventData(prevData => ({ ...prevData, eventloc: fullLocation }));
        const formData = new FormData();
        const updatedEventData = { ...eventData, eventloc: fullLocation, userid: "U001" }; // ✅ Ensure userid is included
        for (const key in updatedEventData) {
            if (updatedEventData[key] !== null && updatedEventData[key] !== "") {
                formData.append(key, updatedEventData[key]);
            }
        }
        // Ensure file is selected before sending the request
        if (!eventData.eventphoto) {
            alert("Please upload an event photo.");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/event", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Response from server:", response.data);
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
            setSelectedRegion("");
            setSelectedProvince("");
            setSelectedCity("");
            setStreet("");
            setErrors({});
        } catch (error) {
            console.error("Error creating event:", error.response ? error.response.data : error);
            alert(`Failed to create event: ${error.response ? error.response.data.error : error.message}`);
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
                <input type="text" name="eventloc" onChange={(e) => setStreet(e.target.value)} value={street} className="w-11/12 input" placeholder="Insert street here" />
                {errors.eventloc && <p className="text-red-500">{errors.eventloc}</p>}
            </fieldset>

            {/* School and Batch */}
            <div className="flex w-full flex-col lg:flex-row space-x-10">
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">School</legend>
                    <select className="select validator w-full" name="school" value={eventData.school} onChange={handleChange}>
                        <option value="">Select school here</option>
                        <option>All</option>
                        <option>SAMCIS</option>
                        <option>SONAHBS</option>
                        <option>STELA</option>
                        <option>SAS</option>
                        <option>SEA</option>
                        <option>SOM</option>
                    </select>
                    {errors.school && <p className="text-red-500 text-xs">{errors.school}</p>}
                </fieldset>
                <fieldset className="fieldset w-1/2 mr-23">
                    <legend className="fieldset-legend text-lg text-primary">Batch</legend>
                    <select className="select validator w-full" name="batchfilter" value={eventData.batchfilter} onChange={handleChange}>
                        <option value="">Select batch here</option>
                        <option>All</option>
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
                <fieldset className="fieldset w-1/2">
                    <legend className="fieldset-legend text-lg text-primary">Category</legend>
                    <select className="select validator w-full" name="category" value={eventData.category} onChange={handleChange}>
                        <option value="">Select category here</option>
                        <option>Reunion</option>
                        <option>Seminar</option>
                        <option>Thanksgiving</option>
                        <option>Intramurals</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}
                </fieldset>
                <fieldset className="fieldset w-1/2 mr-23">
                    <legend className="fieldset-legend text-lg text-primary">Schedule</legend>
                    <input type="datetime-local" name="eventdatetime" onChange={handleDateTimeChange} className="w-full input" />
                    {errors.eventdate && <p className="text-red-500 text-xs">{errors.eventdate}</p>}
                </fieldset>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-5 mr-23">
                <button onClick={handleSubmit} className="btn btn-primary hover:select-secondary">Publish</button>
            </div>
        </div>
    );
};

export default EventForm;
