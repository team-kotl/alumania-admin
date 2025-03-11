import React, { useEffect, useState } from "react";
import { PiFunnelSimple } from "react-icons/pi";
import { PiPencilSimple } from "react-icons/pi";
import { PiTrashSimpleBold } from "react-icons/pi";
import { PiMagnifyingGlassThin } from "react-icons/pi";
import axios from "axios";
import { PiStarFill } from "react-icons/pi";
import { useOutletContext } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";
import { PiCalendarBlankBold } from "react-icons/pi";
import { PiClock } from "react-icons/pi";
import { PiStarBold } from "react-icons/pi";

const EventsTab = () => {
    const { searchQuery } = useOutletContext();
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [selectedEventModal, setSelectedEventModal] = useState(null);
    const [interestedUsers, setInterestedUsers] = useState([]);
    const [sponsors, setSponsors] = useState([]);
    const [activeTab, setActiveTab] = useState("interested"); // State to manage active tab

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/events", {
                    params: { search: searchQuery },
                });
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };
        fetchEvents();
    }, [searchQuery]);


    const fetchInterestedUsers = async (eventid) => {
        try {
            const response = await axios.get(`http://localhost:5000/events/interested/${eventid}`);
            setInterestedUsers(response.data);
            setSelectedEventId(eventid); // Set the selected event ID
            document.getElementById("view_Interested").showModal(); // Open the modal
        } catch (error) {
            console.error("Error fetching interested users:", error);
        }
    };


    const fetchSponsors = async (eventid) => {
        try {
            const response = await axios.get(`http://localhost:5000/events/sponsors/${eventid}`);
            setSponsors(response.data);
            setSelectedEventId(eventid); // Set the selected event ID
            document.getElementById("view_Interested").showModal(); // Open the modal
        } catch (error) {
            console.error("Error fetching sponsors:", error);
        }
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (selectedEventId) {
            if (tab === "interested") {
                fetchInterestedUsers(selectedEventId);
            } else if (tab === "sponsors") {
                fetchSponsors(selectedEventId);
            }
        }
    };

    const handleEventCardClick = (event) => {
        setSelectedEventModal(event); // Set the event details for the modal
        setSelectedEventId(event.eventid); // Set the selected event ID
        if (activeTab === "interested") {
            fetchInterestedUsers(event.eventid); // Fetch interested users
        } else if (activeTab === "sponsors") {
            fetchSponsors(event.eventid); // Fetch sponsors
        }
        document.getElementById("eventDetailsModal").showModal(); // Open the modal
    };

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

    const renderEventDetailsModal = () => {

        return (
            <dialog id="eventDetailsModal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-white shadow-lg rounded-lg p-6 w-96">
                    {/* Flex container for avatar and title */}
                    <div className="flex items-start mb-4">
                        {/* Avatar */}
                        <div className="avatar mr-4">
                            <div className="ring-primary ring-offset-base-100 w-20 rounded-full ring ring-offset-2">
                                <img
                                    src={selectedEventModal?.eventphoto ? `data:image/jpeg;base64,${selectedEventModal.eventphoto}` : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                                    alt="Avatar"
                                />
                            </div>
                        </div>
                        {/* Title */}
                        <h3 className="font-bold text-lg mt-2">{selectedEventModal?.title}</h3>
                    </div>

                    {/* Event details below the title */}
                    <div className="ml-28">
                        {/* Location with icon */}
                        <div className="flex items-center relative -top-[58px] -ml-5">
                            <SlLocationPin className="-mr-1" />
                            <span className="font-semibold"></span>
                            <span className="ml-2 text-gray-500">{selectedEventModal?.eventloc}</span>
                        </div>

                        {/* Time with adjusted icon */}
                        <div className="flex items-center">
                            <div className="relative -top-[55px] -right-[158px]"> {/* Adjust icon position */}
                                <PiClock className="w-5 h-5" /> {/* Set icon size */}
                            </div>
                            <span className="font-semibold"></span>
                            <span className="ml-41 -mt-[110px] text-gray-500">{selectedEventModal?.eventtime}</span>
                        </div>

                        {/* Date with adjusted icon */}
                        <div className="flex items-center relative -top-[79px] -ml-1">
                            <PiCalendarBlankBold className="-ml-4" />
                            <span className="font-semibold"></span>
                            <span className="mr-11 ml-1 text-gray-500">{selectedEventModal?.eventdate}</span>
                        </div>

                        {/* Interested with adjusted icon */}
                        <div className="flex items-center">
                            <div className="relative -top-[101px] -right-[287px]"> {/* Adjust icon position */}
                                <PiStarBold className="w-5 h-5" /> {/* Set icon size */}
                            </div>
                            <span className="font-semibold"></span>
                            <span className="ml-74 -mt-[200px] text-gray-500">{selectedEventModal?.interested_count}</span>
                        </div>
                    </div>

                    {/* Tabs for Interested and Sponsors */}
                    <div className="mt-1">
                        {/* Tab Buttons - Centered */}
                        <div className="flex justify-center relative space-x-32 -mt-21">
                            <button
                                className={`pb-2 focus:outline-none ${activeTab === "interested" ? "border-b-5 border-blue-700 text-blue-700 cursor-pointer" : "text-gray-500"}`}
                                onClick={() => handleTabChange("interested")}
                            >
                                Interested
                            </button>
                            <button
                                className={`pb-2 focus:outline-none ${activeTab === "sponsors" ? "border-b-5 border-blue-700 text-blue-700 cursor-pointer" : "text-gray-500"}`}
                                onClick={() => handleTabChange("sponsors")}
                            >
                                Sponsors
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="mt-4">
                            {activeTab === "interested" && (
                                <div className="space-y-2">
                                    {interestedUsers.map((user, index) => (
                                        <div key={index}>
                                            <div className="flex items-center">
                                                <div className="avatar mr-2">
                                                    <div className="w-8 h-8 rounded-full">
                                                        <img src={`data:image/jpeg;base64,${user.displaypic}`} alt="User Avatar" />
                                                    </div>
                                                </div>
                                                <span className="">{user.firstname} {user.lastname}</span>
                                            </div>
                                            <hr className="my-2 border-gray-300" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-2">
                                {sponsors.map((sponsor, index) => (
                                    <div key={index}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="avatar mr-2">
                                                    <div className="w-8 h-8 rounded-full">
                                                        <img src={`data:image/jpeg;base64,${sponsor.displaypic}`} alt="User Avatar" />
                                                    </div>
                                                </div>
                                                <span className="">{sponsor.firstname} {sponsor.lastname}</span>
                                            </div>
                                            <div className="">
                                                <span className="mr-25">₱{sponsor.amount.toFixed(2)}</span> {sponsor.type}
                                            </div>
                                        </div>
                                        <hr className="my-2 border-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Close button */}
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn bg-gray-300 text-gray-800 hover:bg-gray-400">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        );
    };
    
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
                            <div
                                key={event.eventid}
                                className="bg-white shadow-lg rounded-lg overflow-hidden relative transition-transform transform hover:scale-105 cursor-pointer"
                                onClick={() => handleEventCardClick(event)}
                            >
                                <img
                                    src={event.eventphoto ? `data:image/jpeg;base64,${event.eventphoto}` : "/default-event.jpg"}
                                    alt={event.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <div className="min-h-[3.25rem] flex items-center justify-center">
                                        <h2 className="text-lg font-bold text-center">{event.title}</h2>
                                    </div>
                                    <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-900 mt-2">
                                        <div className="text-left">
                                            <p className="font-medium">{event.eventdate}</p>
                                            <p className="text-sm text-gray-600">{event.eventloc}</p>
                                            <div className="flex flex-row items-center">
                                                <div className="text-yellow-400"><PiStarFill /></div>
                                                <p className="text-sm text-gray-600 ml-1">{event.interested_count} interested</p>
                                            </div>
                                        </div>
                                        <p className="font-medium whitespace-nowrap">{event.eventtime}</p>
                                    </div>
                                </div>

                                <div className="h-16"></div>

                                <div className="absolute bottom-4 right-4 flex gap-2">
                                    <button
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openModal(event);
                                        }}
                                    >
                                        <PiPencilSimple className="w-5 h-5 text-gray-900" />
                                    </button>

                                    <button
                                        className="p-2 rounded-full bg-red-400 hover:bg-red-600 transition cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEventToDelete(event);
                                            document.getElementById("deleteModal").showModal();
                                        }}
                                    >
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
                {renderEventDetailsModal()}
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