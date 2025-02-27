import React, { useState }from "react";

const events = [
    {
        title: "SLU AWARDING NIGHT",
        date: "May 20, 2024",
        time: "6:00 PM",
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

    const sortEvents = (events) => {
        if (sortOrder === "A-Z") {
            return [...events].sort((a, b) => a.title.localeCompare(b.title));
        }
        return events;
        
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="absolute right-2 -mt-3  top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600"
                >
                    <path fill="currentColor" d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
                </svg>
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
  <summary className="btn m-1 -mt-17 ml-117"> <svg
      id="Mail_Filter_24"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
    >
      <rect width="24" height="24" fill="none" />
      <g transform="matrix(0.43 0 0 0.43 12 12)">
        <path
          fill="currentColor"
          transform="translate(-25, -25)"
          d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 12 17 C 11.63936408342243 16.994899710454515 11.303918635428394 17.184375296169332 11.122112278513482 17.49587284971433 C 10.940305921598572 17.80737040325933 10.940305921598572 18.192629596740673 11.122112278513484 18.50412715028567 C 11.303918635428394 18.815624703830668 11.639364083422432 19.005100289545485 12 19 L 38 19 C 38.36063591657757 19.005100289545485 38.696081364571604 18.815624703830668 38.877887721486516 18.50412715028567 C 39.05969407840143 18.19262959674067 39.05969407840143 17.80737040325933 38.877887721486516 17.49587284971433 C 38.696081364571604 17.184375296169332 38.36063591657757 16.994899710454515 38 17 L 12 17 z M 15 25 C 14.63936408342243 24.994899710454515 14.303918635428394 25.184375296169332 14.122112278513482 25.49587284971433 C 13.940305921598572 25.80737040325933 13.940305921598572 26.192629596740673 14.122112278513484 26.50412715028567 C 14.303918635428394 26.815624703830668 14.639364083422432 27.005100289545485 15 27 L 35 27 C 35.36063591657757 27.005100289545485 35.696081364571604 26.815624703830668 35.877887721486516 26.50412715028567 C 36.05969407840143 26.19262959674067 36.05969407840143 25.80737040325933 35.877887721486516 25.49587284971433 C 35.696081364571604 25.184375296169332 35.36063591657757 24.994899710454515 35 25 L 15 25 z M 17 33 C 16.639364083422432 32.99489971045452 16.303918635428392 33.184375296169335 16.122112278513484 33.49587284971433 C 15.940305921598572 33.80737040325933 15.940305921598572 34.19262959674067 16.122112278513484 34.50412715028567 C 16.303918635428396 34.81562470383067 16.639364083422432 35.00510028954548 17 35 L 33 35 C 33.36063591657757 35.00510028954548 33.696081364571604 34.81562470383067 33.877887721486516 34.50412715028567 C 34.05969407840143 34.19262959674067 34.05969407840143 33.80737040325933 33.877887721486516 33.49587284971433 C 33.696081364571604 33.184375296169335 33.36063591657757 32.99489971045452 33 33 L 17 33 z"
        />
      </g>
    </svg>
  </summary>
  <ul className="ml-117 menu dropdown-content top-[-1px]  bg-base-100 rounded-box z-[1] w-52 p-1 shadow">
  <li>
    <button onClick={() => { 
      setSortOrder("A-Z"); 
      document.querySelector(".dropdown").removeAttribute("open"); 
    }}>
      A-Z
    </button>
  </li>
  <li>
    <button onClick={() => { 
      setSortOrder(""); 
      document.querySelector(".dropdown").removeAttribute("open"); 
    }}>
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
                                
                                <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition cursor-pointer ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                                        <path fill="#0A0A0A" d="M22,7.24a1,1,0,0,0-.29-.71L17.47,2.29A1,1,0,0,0,16.76,2a1,1,0,0,0-.71.29L13.22,5.12h0L2.29,16.05a1,1,0,0,0-.29.71V21a1,1,0,0,0,1,1H7.24A1,1,0,0,0,8,21.71L18.87,10.78h0L21.71,8a1.19,1.19,0,0,0,.22-.33,1,1,0,0,0,0-.24.7.7,0,0,0,0-.14ZM6.83,20H4V17.17l9.93-9.93,2.83,2.83ZM18.17,8.66,15.34,5.83l1.42-1.41,2.82,2.82Z"></path>
                                    </svg>
                                </button>

                              
                                <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition cursor-pointer">
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

