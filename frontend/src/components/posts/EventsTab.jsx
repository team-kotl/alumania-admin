import React, { useState }from "react";

const events = [
    {
        title: "SLU AWARDING NIGHT",
        date: "June 20, 2024",
        time: "8:00 PM",
        location: "Saint Louis University, Upper Bonifacio, Baguio City",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/07/IMG_0146-scaled-e1690512500464-650x407.jpg",
        interested: "100 interested - 70 going",
    },
    {
        title: "COMMUNITY SERVICE",
        date: "July 17, 2024",
        time: "8:00 AM",
        location: "Ucab Elementary School, Itogon, Benguet",
        image: "https://ubaguio.edu/wp-content/uploads/2023/03/ARBORETUM-3-scaled.jpg",
        interested: "200 interested - 50 going",
    },
    {
        title: "CHARITY EVENT",
        date: "August 14, 2024",
        time: "10:00 AM",
        location: "Ambassing Elementary School, Sagada, Mt. Province",
        image: "https://www.charity-event.info/wp-content/uploads/2014/08/PA140372.jpg",
        interested: "200 interested - 50 going",
    },
    {
        title: "SAMCIS REUNION",
        date: "September 10, 2024",
        time: "2:00 PM",
        location: "Saint Louis University, Upper Bonifacio, Baguio City",
        image: "https://erasmusplusfriends.eu/wp-content/uploads/2022/09/SLU_Reunions_IMG_4544-scaled.jpeg",
        interested: "500 interested - 200 going",
    },
    {
        title: "THANKSGIVING",
        date: "October 5, 2024",
        time: "7:00 PM",
        location: "SM City Baguio, Event Center",
        image: "https://media.gettyimages.com/id/1434507382/video/group-of-friends-celebrating-thanksgiving.jpg?s=640x640&k=20&c=_9S6xmrC0SUAFo4k3R4Tw_JPy5Irjt9KX9BASCQ_nDY=",
        interested: "300 interested - 100 going",
    },
    {
        title: "SEMINAR",
        date: "November 12, 2024",
        time: "9:00 AM",
        location: "Mount Costa, La Trinidad, Benguet",
        image: "https://www.millertanner.com/wp-content/uploads/2022/05/shutterstock_758264113.jpg",
        interested: "700 interested - 350 going",
    },
    {
        title: "CLEANUP DRIVE",
        date: "November 12, 2024",
        time: "9:00 AM",
        location: "Mount Costa, La Trinidad, Benguet",
        image: "https://baguiocityhigh.wordpress.com/wp-content/uploads/2016/01/g10-cleanup.jpg",
        interested: "700 interested - 350 going",
    },
    {
        title: "FESTIVAL",
        date: "November 12, 2024",
        time: "9:00 AM",
        location: "Session road, Baguio City",
        image: "https://elretirobaguio.com/wp-content/uploads/2022/08/panagbenga-festival-1024x683.jpg",
        interested: "700 interested - 350 going",
    },
    {
        title: "SAMCIS THANKSGIVING",
        date: "November 12, 2024",
        time: "9:00 AM",
        location: "Mount Costa, La Trinidad, Benguet",
        image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?cs=srgb&dl=pexels-fauxels-3184183.jpg&fm=jpg",
        interested: "700 interested - 350 going",
    },
    {
        title: "SLU DANCE PARTY",
        date: "November 12, 2024",
        time: "9:00 AM",
        location: "Mount Costa, La Trinidad, Benguet",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/07/SLUNAAI2-1005x628.jpg",
        interested: "700 interested - 350 going",
    },
   
];

const EventsTab = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="absolute right-4  top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"
                >
                    <path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
                </svg>
            </div>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {filteredEvents.length > 0 ? (
                    filteredEvents.map((event, index) => (
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
                                
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path fill="#0A0A0A" d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"></path>
                                    </svg>
                                </button>

                              
                                <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path fill="#C62828" d="M10,14h4a1,1,0,0,0,0-2H10a1,1,0,0,0,0,2ZM19,3H5A3,3,0,0,0,2,6V9a1,1,0,0,0,1,1H4v8a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V10h1a1,1,0,0,0,1-1V6A3,3,0,0,0,19,3ZM18,18a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V10H18ZM20,8H4V6A1,1,0,0,1,5,5H19a1,1,0,0,1,1,1Z"></path>
                                    </svg>
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
        </div>
    );
};

export default EventsTab;

