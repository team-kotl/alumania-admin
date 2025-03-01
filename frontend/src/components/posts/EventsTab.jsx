import React, { useState }from "react";
import { PiFunnelSimple } from "react-icons/pi";
import { PiPencilSimple } from "react-icons/pi";
import { PiTrashSimpleBold } from "react-icons/pi";
import { PiMagnifyingGlassThin } from "react-icons/pi";
const events = [
    {
        eventid:"E011",
        title: "Thanksgiving Alumni Gala",
        date: "October 18, 2025",
        time: "8:00 PM",
        location: "Makati Shangri-La",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/07/IMG_0146-scaled-e1690512500464-650x407.jpg",
        interested: "100 interested - 70 going",
        category: "Seminar",
    },
    {
        eventid:"E008",
        title: "Financial Freedom 101",
        date: "April 20, 2025",
        time: "6:00 PM",
        location: "Baguio Country Club, Baguio City",
        image: "https://ubaguio.edu/wp-content/uploads/2023/03/ARBORETUM-3-scaled.jpg",
        interested: "200 interested - 50 going",
        category: "Seminar",
    },
    {
        eventid:"E013",
        title: "Navigating Life After Graduation",
        date: "July 10, 2025",
        time: "3:00 PM",
        location: "Convention Center, Baguio City",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/09/Mental-health-Awareness-lecture2-837x628.jpg",
        interested: "200 interested - 50 going",
        category: "Seminar",
    },
    {
        eventid:"E015",
        title: "Reunion Photo Booth and Memory Wall",
        date: "December 1, 2025",
        time: "5:00 PM",
        location: "Admiral Hotel Manila",
        image: "https://erasmusplusfriends.eu/wp-content/uploads/2022/09/SLU_Reunions_IMG_4544-scaled.jpeg",
        interested: "500 interested - 200 going",
        category: "Reunion",
    },
    {
        eventid:"E012",
        title: "Alumni Awards Ceremony",
        date: "September 24, 2025",
        time: "4:00 PM",
        location: "SLU Prince Bernard Gym",
        image: "https://media.gettyimages.com/id/1434507382/video/group-of-friends-celebrating-thanksgiving.jpg?s=640x640&k=20&c=_9S6xmrC0SUAFo4k3R4Tw_JPy5Irjt9KX9BASCQ_nDY=",
        interested: "300 interested - 100 going",
        category: "Thanksgiving",
    },
    {
        eventid:"E014",
        title: "Creative Entrepreneurship",
        date: "January 30, 2025",
        time: "9:00 AM",
        location: "The Manor, Camp John Hay",
        image: "https://www.millertanner.com/wp-content/uploads/2022/05/shutterstock_758264113.jpg",
        interested: "700 interested - 350 going",
        category: "Seminar",
    },
    {
        eventid:"E007",
        title: "Mastering Soft Skills for Success",
        date: "May 12, 2025",
        time: "4:00 PM",
        location: "The Mind Museum, BGC",
        image: "https://pbs.twimg.com/media/FWi8QgBWYAAvaGh.jpg:large",
        interested: "700 interested - 350 going",
        category: "Seminar",
    },
    {
        eventid:"E010",
        title: "Arts & Crafts Fair",
        date: "June 3, 2025",
        time: "2:15 PM",
        location: "Convention Center, Baguio City",
        image: "https://elretirobaguio.com/wp-content/uploads/2022/08/panagbenga-festival-1024x683.jpg",
        interested: "700 interested - 350 going",
        category: "Festival",
    },
    {
        eventid:"E002",
        title: "Thanksgiving Celebration",
        date: "March 8, 2025",
        time: "10:00 AM",
        location: "SLU Chapel, Saint Louis University",
        image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?cs=srgb&dl=pexels-fauxels-3184183.jpg&fm=jpg",
        interested: "700 interested - 350 going",
        category: "Thanksgiving",
    },
    {
        eventid:"E001",
        title: "Alumni Grand Reunion",
        date: "March 25, 2025",
        time: "1:00 PM",
        location: "Prince Bernhard Gym, Saint Louis University",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/07/SLUNAAI2-1005x628.jpg",
        interested: "700 interested - 350 going",
        category: "Reunion",
    },
    {
        eventid:"E006",
        title: "Victory and Unity: Sports Festival",
        date: "March 25, 2025",
        time: "2:00 PM",
        location: "Rizal Memorial Sports Complex",
        image: "https://dtusciencepark.com/wp-content/uploads/2024/06/Kaempe-mikado.jpg ",
        interested: "400 interested - 200 going",
        category: "Festival",
    },
    {
        eventid:"E003",
        title: "Leadership in the Digital Age",
        date: "April 3, 2025",
        time: "9:00 AM",
        location: "The Bellevue Hotel, Alabang, Muntinlupa City",
        image: "https://www.pugpig.com/wp-content/uploads/sites/3/2023/03/News-in-Digital-Age-e1679658861461.jpeg",
        interested: "150 interested - 90 going",
        category: "Seminar",
    },
    {
        eventid:"E009",
        title: "Thanksgiving Potluck Feast",
        date: "June 10, 2025",
        time: "3:00 PM",
        location: "SLU Maryheights Campus",
        image: "https://cdn.prod.website-files.com/64f838493ecbf1360b1c8008/6698a422b24b747cf916200c_potluck-2024-09.webp   ",
        interested: "250 interested - 180 going",
        category: "Thanksgiving",
    },
    {
        eventid:"E005",
        title: "Summer Fun Festival",
        date: "April 15, 2025",
        time: "10:00 AM",
        location: "Bolinao, Pangasinan",
        image: "https://cdn.tatlerasia.com/tatlerasia/i/2023/05/09155009-gettyimages-960606016_cover_1600x1067.jpg",
        interested: "500 interested - 300 going",
        category: "Festival",
    },
    {
        eventid:"E004",
        title: "Hearts &amp; Memories",
        date: "February 14, 2025",
        time: "6:00 PM",
        location: "Okada Manila",
        image: "https://hospitalitynews.ph/wp-content/uploads/2024/03/IMG_0409.jpg",
        interested: "120 interested - 60 going",
        category: "Reunion",
    }
   
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
    const handleDeleteEvent = async () => {
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
    };
    
    
    const handleSaveEdit = async () => {
        if (!selectedEvent) return;
    
        try {
            const response = await fetch(`http://localhost:5000/events`, { 
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(selectedEvent),
            });
    
            if (response.ok) {
                alert("Event updated successfully!");
                setEventsList(prevEvents =>
                    prevEvents.map(event =>
                        event.eventid === selectedEvent.eventid ? { ...event, ...selectedEvent } : event
                    )
                );
                setSelectedEvent(null);
                document.getElementById("editModal").close();
            } else {
                alert("Failed to update event.");
            }
        } catch (error) {
            console.error("Error updating event:", error);
            alert("An error occurred while updating the event.");
        }
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
        onClick={() => document.getElementById("editModal").close()}
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