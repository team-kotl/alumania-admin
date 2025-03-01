import React, { useState }from "react";
import { PiFunnelSimple } from "react-icons/pi";
import { PiPencilSimple } from "react-icons/pi";
import { PiTrashSimpleBold } from "react-icons/pi";
import { PiMagnifyingGlassThin } from "react-icons/pi";
const events = [
    {
        title: "SLU AWARDING NIGHT",
        date: "May 20, 2024",
        time: "5:00 PM",
        location: "Saint Louis University, Upper Bonifacio, Baguio City",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/07/IMG_0146-scaled-e1690512500464-650x407.jpg",
        interested: "100 interested - 70 going",
        category: "Reunion",
    },
    {
        title: "COMMUNITY SERVICE",
        date: "April 4, 2024",
        time: "8:00 AM",
        location: "Ucab Elementary School, Itogon, Benguet",
        image: "https://ubaguio.edu/wp-content/uploads/2023/03/ARBORETUM-3-scaled.jpg",
        interested: "200 interested - 50 going",
        category: "Seminar",
    },
    {
        title: "CHARITY EVENT",
        date: "December 28, 2024",
        time: "10:00 AM",
        location: "Ambassing Elementary School, Sagada, Mt. Province",
        image: "https://www.charity-event.info/wp-content/uploads/2014/08/PA140372.jpg",
        interested: "200 interested - 50 going",
        category: "Seminar",
    },
    {
        title: "SAMCIS REUNION",
        date: "July 31, 2024",
        time: "2:00 PM",
        location: "Saint Louis University, Bakakeng, Baguio City",
        image: "https://erasmusplusfriends.eu/wp-content/uploads/2022/09/SLU_Reunions_IMG_4544-scaled.jpeg",
        interested: "500 interested - 200 going",
        category: "Reunion",
    },
    {
        title: "THANKSGIVING",
        date: "January 19, 2024",
        time: "5:00 PM",
        location: "General Luna, Baguio City",
        image: "https://media.gettyimages.com/id/1434507382/video/group-of-friends-celebrating-thanksgiving.jpg?s=640x640&k=20&c=_9S6xmrC0SUAFo4k3R4Tw_JPy5Irjt9KX9BASCQ_nDY=",
        interested: "300 interested - 100 going",
        category: "Thanksgiving",
    },
    {
        title: "SEMINAR",
        date: "September 12, 2024",
        time: "9:00 AM",
        location: "Mount Costa, La Trinidad, Benguet",
        image: "https://www.millertanner.com/wp-content/uploads/2022/05/shutterstock_758264113.jpg",
        interested: "700 interested - 350 going",
        category: "Seminar",
    },
    {
        title: "CLEANUP DRIVE",
        date: "March 10, 2024",
        time: "9:00 AM",
        location: "Ambiong, La Trinidad, Benguet",
        image: "https://baguiocityhigh.wordpress.com/wp-content/uploads/2016/01/g10-cleanup.jpg",
        interested: "700 interested - 350 going",
        category: "Seminar",
    },
    {
        title: "PANAGBENGA FESTIVAL",
        date: "February 1, 2024",
        time: "9:00 AM",
        location: "Session road, Baguio City",
        image: "https://elretirobaguio.com/wp-content/uploads/2022/08/panagbenga-festival-1024x683.jpg",
        interested: "700 interested - 350 going",
        category: "Festival",
    },
    {
        title: "SAMCIS THANKSGIVING",
        date: "November 23, 2024",
        time: "10:00 AM",
        location: "Saint Louis University, Bakakeng, Baguio City",
        image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?cs=srgb&dl=pexels-fauxels-3184183.jpg&fm=jpg",
        interested: "700 interested - 350 going",
        category: "Thanksgiving",
    },
    {
        title: "SLU DANCE PARTY",
        date: "August 16, 2024",
        time: "11:00 AM",
        location: "Saint Louis University, Upper Bonifacio, Baguio City",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/07/SLUNAAI2-1005x628.jpg",
        interested: "700 interested - 350 going",
        category: "Reunion",
    },
   
];

const EventsTab = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    const [sortOrder, setSortOrder] = useState("");
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [eventsList, setEventsList] = useState([...events]);
    const [eventToDelete, setEventToDelete] = useState(null);

    const sortEvents = (events) => {
        if (sortOrder === "A-Z") {
            return [...events].sort((a, b) => a.title.localeCompare(b.title));
        }
        return events;
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleDeleteEvent = () => {
        if (!eventToDelete) return;
        setEventsList(prevEvents => prevEvents.filter(event => event.title !== eventToDelete.title));
        setEventToDelete(null);
        document.getElementById("deleteModal").close();
    };
    const handleSaveEdit = () => {
        if (!selectedEvent) return;
    
        setEventsList(prevEvents =>
            prevEvents.map(event =>
                event.title === selectedEvent.title ? { ...event, ...selectedEvent } : event
            )
        );
    
        setSelectedEvent(null);
        document.getElementById("editModal").close();
    };

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (category === "" || event.category === category)
    );

    const sortedEvents = sortEvents(filteredEvents);
    return (
       
        <div className="px-8 sm:px-8 md:px-16 lg:px-20 mb-20 relative">
            
            <div className="relative w-full sm:w-80 md:w-96 lg:w-[250px] mx-auto -mt-12 mb-6 ml-170">
                <input
                    type="text"
                    placeholder="Event Name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-2 border border-gray-400 rounded-lg shadow-md focus:outline-none pr-12"
                />
                <PiMagnifyingGlassThin 
                    className="absolute right-2 -mt-3  top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"/>
                    
        
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
                    sortedEvents.map((event, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                            <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-bold text-center">{event.title}</h2>
                                <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-900 mt-2">
                                    <div className="text-left">
                                        <p className="font-medium">{event.date}</p>
                                        <p className="text-sm text-gray-600">{event.location}</p>
                                    </div>
                                    <p className="font-medium whitespace-nowrap">{event.time}</p>
                                </div>
                                <p className="text-sm text-gray-600 mt-2 text-left">{event.interested} interested</p>
                            </div>

        
                            <div className="h-16"></div>

                            
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button 
                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                                    onClick={() => {
                                        setSelectedEvent(event);
                                        document.getElementById("editModal").showModal();
                                    }}
                                >
                                    <PiPencilSimple className="w-5 h-5 text-gray-900" />
                                </button>

                              
                                <button 
                                    className="p-2 rounded-full bg-red-400 hover:bg-red-600 transition cursor-pointer"
                                    onClick={() => {
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
    value={new Date(selectedEvent.date).toISOString().split("T")[0]} 
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
        className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        onClick={() => document.getElementById("editModal").close()}
    >
        Cancel
    </button>
    <button 
        className="w-1/2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={handleSaveEdit}
        disabled={!selectedEvent?.title || !selectedEvent?.date || !selectedEvent?.time || !selectedEvent?.location}
    >
        Save
    </button>
</div>
</dialog>
<dialog id="deleteModal" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg p-6 w-96">
                <h2 className="text-lg font-bold text-center mb-4">Confirm Archive</h2>
                <p className="text-center">Are you sure you want to Archive"{eventToDelete?.title}"?</p>
                <div className="flex justify-between mt-4 gap-3">
                    <button 
                        className="w-1/2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                        onClick={() => document.getElementById("deleteModal").close()}
                    >
                        Cancel
                    </button>
                    <button 
                        className="w-1/2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        onClick={handleDeleteEvent}
                    >
                        Archive
                    </button>
                </div>
            </dialog>
        </div>
        
    );

};

export default EventsTab;