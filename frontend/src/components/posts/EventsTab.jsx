import React from "react";

const events = [
    {
        title: "SLU AWARDING NIGHT",
        date: "June 20, 2024",
        time: "8:00 PM",
        location: "Saint Louis University, Upper Bonifacio, Baguio City",
        image: "https://www.slu.edu.ph/wp-content/uploads/2023/07/IMG_0146-scaled-e1690512500464-650x407.jpg",
        interested: "1,257",
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
        interested: "1,257",
    },
];

const EventsTab = () => {
    return (
        <div className="flex justify-center items-center mt-6 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7 max-w-6xl w-full ml-auto mr-auto translate-x-16">
                {events.map((event, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden h-96">
                        <img src={event.image} alt={event.title} className="w-full h-50 object-cover" />
                        <div className="p-4">
                            <h2 className="text-lg font-bold text-center">{event.title}</h2>
                            <div className="flex justify-between text-sm text-gray-900 mt-2">
                                <div className="text-left">
                                    <p className="font-medium">{event.date}</p>
                                    <p className="text-sm text-gray-600">{event.location}</p>
                                </div>
                                <p className="font-medium whitespace-nowrap">{event.time}</p>
                            </div>
                            <p className="text-sm text-gray-600 mt-2 text-left">{event.interested} interested</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EventsTab;
