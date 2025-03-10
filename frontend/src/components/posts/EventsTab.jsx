import React, { useEffect, useState } from "react";
import { PiFunnelSimple } from "react-icons/pi";
import { PiPencilSimple } from "react-icons/pi";
import { PiTrashSimpleBold } from "react-icons/pi";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import axios from "axios";
import { useOutletContext } from "react-router-dom";


const EventsTab = () => {
    const { searchQuery } = useOutletContext();
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [eventToDelete, setEventToDelete] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/events", {
                    params: { search: searchQuery }, // 🔹 Pass searchQuery as a query parameter
                });
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, [searchQuery]);

    const sortEvents = (events, sortOrder) => {
        if (sortOrder === "A-Z") {
            return [...events].sort((a, b) => a.title.localeCompare(b.title));
        }
        return events;
    };
    

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedEvent((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveEdit = async () => {
        try {
            const updatedEvent = {
                eventid: selectedEvent.eventid,
                title: selectedEvent.title,
                date: selectedEvent.date,
                time: selectedEvent.time,
                location: selectedEvent.location,
                category: selectedEvent.category
            };

            await axios.put(`http://localhost:5000/events/${selectedEvent.eventid}`, updatedEvent);

            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.eventid === selectedEvent.eventid ? { ...event, ...updatedEvent } : event
                )
            );
            closeModal();
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    {/*const handleDeleteEvent = async () => {
        if (!eventToDelete) return;

        try {
            const response = await fetch("http://localhost:5000/events", {
                method: "DELETE",
            });

            if (response.ok) {
                alert("Event deleted successfully!");
                setEventsList(prevEvents => prevEvents.filter(event => event.eventid !== eventToDelete.eventid));
                document.getElementById("deleteModal").close();
            } else {
                alert("Failed to archive event.");
            }
        } catch (error) {
            console.error("Error archiving event:", error);
        }
    };*/}

    const filteredEvents = events
        .filter(
            (event) =>
                (event.title.toLowerCase().includes(searchQuery) &&
                    (category === "" || event.category === category)) ||
                (event.eventloc.toLowerCase().includes(searchQuery) &&
                    (category === "" || event.category === category))
        );

    const sortedEvents = sortEvents(events, sortOrder);

    const openModal = (event) => {
        setSelectedEvent(event);
        document.getElementById("editModal").showModal();
    };

    const closeModal = () => {
        document.getElementById("editModal").close();
        setSelectedEvent(null);
    };

    const renderEditEventModal = () => (
        <dialog
            id="editModal"
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-96"
        >
            <h2 className="text-lg font-bold text-center mb-4">Edit Event</h2>

            {selectedEvent && (
                <div className="space-y-3">
                    <label className="block font-semibold">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={selectedEvent.title}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter event title"
                    />

                    <label className="block font-semibold">Date:</label>
                    <input
                        type="date"
                        name="date"
                        value={selectedEvent.date ? new Date(selectedEvent.date).toISOString().split("T")[0] : ""}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />

                    <label className="block font-semibold">Time:</label>
                    <input
                        type="time"
                        name="time"
                        value={selectedEvent.time}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />

                    <label className="block font-semibold">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={selectedEvent.location}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        placeholder="Enter event location"
                    />

                    <label className="block font-semibold">Category:</label>
                    <select
                        name="category"
                        value={selectedEvent.category}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    >
                        <option value="Reunion">Reunion</option>
                        <option value="Thanksgiving">Thanksgiving</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Festival">Festival</option>
                    </select>
                </div>
            )}

            <div className="flex justify-between mt-4 gap-3">
                <button
                    className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition cursor-pointer"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                    onClick={handleSaveEdit}
                    disabled={!selectedEvent?.title || !selectedEvent?.date || !selectedEvent?.time || !selectedEvent?.location}
                >
                    Save
                </button>
            </div>
        </dialog>
    );

    return (
        <>
            <div className="px-8 sm:px-8 md:px-16 lg:px-20 mb-20 relative">

                <div className="relative w-full sm:w-80 md:w-96 lg:w-[250px] mx-auto -mt-12 mb-6 ml-auto mr-[15vw]">

                    <select
                        className="flex items-center border px-4 py-2 pr-8 rounded-lg shadow-md mt-[-40px] ml-70 mx-auto focus:outline-none focus:ring-0 focus:border-gray-400 cursor-pointer text-gray-400 "
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">CATEGORY</option>
                        <option value="Reunion">Reunion</option>
                        <option value="Thanksgiving">Thanksgiving</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Festival">Festival</option>
                    </select>
                    <details className="dropdown">
                        <summary className="btn m-1 -mt-17 ml-117">
                            <PiFunnelSimple className="w-6 h-6" />
                        </summary>
                        <ul className="ml-117 menu dropdown-content top-[-1px] bg-base-100 rounded-box z-[1] w-52 p-1 shadow">
                            <li>
                                <button
                                    onClick={() => {
                                        setSortOrder("A-Z");
                                        document.querySelector(".dropdown").removeAttribute("open");
                                    }}
                                >
                                    A-Z
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setSortOrder("");
                                        document.querySelector(".dropdown").removeAttribute("open");
                                    }}
                                >
                                    Reset
                                </button>
                            </li>
                        </ul>
                    </details>

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 -mt-5 max-w-7xl mx-auto">
                    {sortedEvents.length > 0 ? (
                        sortedEvents.map((event) => (
                            <div key={event.eventid} className="bg-white shadow-lg rounded-lg overflow-hidden relative transition-transform transform hover:scale-105 cursor-pointer">
                                <img
                                    src={event.eventphoto ? `data:image/jpeg;base64,${event.eventphoto}` : "/default-event.jpg"}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-bold text-center">{event.title}</h2>
                                    <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-900 mt-2">
                                        <div className="text-left">
                                            <p className="font-medium">{event.eventdate}</p>
                                            <p className="text-sm text-gray-600">{event.eventloc}</p>
                                            <p className="text-sm text-gray-600">{event.interested_count} interested</p>
                                        </div>
                                        <p className="font-medium whitespace-nowrap">{event.eventtime}</p>
                                    </div>
                                </div>

                                <div className="h-16"></div>

                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                                        onClick={() => openModal(event)}
                                    >
                                        <PiPencilSimple className="w-5 h-5 text-gray-900" />
                                    </button>

                                    <button className="p-2 rounded-full bg-red-400 hover:bg-red-600 transition cursor-pointer">
                                        <PiTrashSimpleBold className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-[50vh] w-full col-span-full">
                            <p className="text-gray-500 text-xl font-semibold">No events found.</p>
                        </div>
                    )}
                </div>
                {renderEditEventModal()}

                <dialog id="deleteModal" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-96">
                    <h2 className="text-lg font-bold text-center mb-4">Confirm Archive</h2>
                    <p className="text-center">Are you sure you want to Archive "{eventToDelete?.title}"?</p>
                    <div className="flex justify-between mt-4 gap-3">
                        <button
                            className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition cursor-pointer"
                            onClick={() => document.getElementById("deleteModal").close()}
                        >
                            Cancel
                        </button>
                        <button
                            className="w-1/2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition cursor-pointer"
                        /*onClick={handleDeleteEvent}*/
                        >
                            Archive
                        </button>
                    </div>
                </dialog>
            </div>
        </>
    );

};

export default EventsTab;