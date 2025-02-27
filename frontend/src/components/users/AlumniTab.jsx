import React, { useEffect, useState } from "react";
import axios from "axios";

const AlumniTab = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    status: "",
    location: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users", {
          responseType: "json",
        });
        setAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const handleSelectAlumni = (user) => {
    if (user.displaypic) {
      const blob = new Blob([new Uint8Array(user.displaypic.data)], {
        type: "image/jpeg",
      });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    } else {
      setImageUrl(null);
    }
    setSelectedAlumni(user);
  };

  const toggleFilter = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }));
  };

  if (loading) {
    return (
      <div className="flex flex-row h-[30rem] w-full items-center justify-center">
        <span className="loading loading-spinner w-12"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto ml-17 mt-5">
      <div className="flex justify-end space-x-2 mb-3">
        <input
          type="text"
          placeholder="Name, ID, Email"
          className="border border-gray-300 px-4 py-2 rounded-lg w-64 bg-[url('../src/assets/search.png')] bg-no-repeat bg-[length:22px] bg-[10px] pl-10"
        />
        <button 
         className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
         onClick={() => setIsOpen(!isOpen)} 
        >
          <img src="../src/assets/filter.png" alt="Filter" />
        </button>
      </div>

      <table className="table w-full border-collapse border border-gray-100 shadow-md mt-7">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-15 py-3.5 text-gray-600">UserID</th>
            <th className="px-15 py-3.5 text-gray-600">Email</th>
            <th className="px-15 py-3.5 text-gray-600">Full Name</th>
            <th className="px-15 py-3.5 text-gray-600">School</th>
            <th className="px-13 py-3.5 text-gray-600">Batch</th>
            <th className="px-15 py-3.5 text-gray-600">Employment Status</th>
            <th className="px-15 py-3.5 text-gray-600">Location</th>
          </tr>
        </thead>
        <tbody>
          {alumni.map((user) => (
            <tr
              key={user.userid}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectAlumni(user)}
            >
              <td className="px-15 py-5">{user.userid}</td>
              <td className="px-15 py-5">{user.email}</td>
              <td className="px-15 py-5">{user.fullname}</td>
              <td className="px-15 py-5">{user.school}</td>
              <td className="px-13 py-5">{user.batch}</td>
              <td className="px-15 py-5">{user.empstatus}</td>
              <td className="px-15 py-5">{user.location}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isOpen && (
        <div className="absolute top-12 right-2 bg-white shadow-lg rounded-lg p-4 w-72 border border-gray-200 z-50">
          <h3 className="text-lg font-semibold text-center">Search Filters</h3>
          <hr className="my-2" />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-1">Status</h4>
              {['Employed', 'Unemployed', 'Underemployed'].map((status) => (
                <button
                  key={status}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    selectedFilters.status === status ? "bg-blue-500 text-white" : "hover:text-blue-600"
                  }`}
                  onClick={() => toggleFilter("status", status)}
                >
                  {status}
                </button>
              ))}
            </div>
            <div>
              <h4 className="font-semibold mb-1">Location</h4>
              {['Domestic', 'Foreign'].map((location) => (
                <button
                  key={location}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    selectedFilters.location === location ? "bg-blue-500 text-white" : "hover:text-blue-600"
                  }`}
                  onClick={() => toggleFilter("location", location)}
                >
                  {location}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedAlumni && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedAlumni(null)}
            >
              ✕
            </button>
            <img
              src={imageUrl || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 mx-auto rounded-full mb-4"
            />
            <h2 className="text-xl font-semibold text-center mb-2">
              {selectedAlumni.fullname}
            </h2>
            <p className="text-gray-600 text-center">{selectedAlumni.email}</p>
            <p className="text-gray-600 text-center">
              School: {selectedAlumni.school}
            </p>
            <p className="text-gray-600 text-center">
              Batch: {selectedAlumni.batch}
            </p>
            <p className="text-gray-600 text-center">
              Employment: {selectedAlumni.empstatus}
            </p>
            <p className="text-gray-600 text-center">
              Location: {selectedAlumni.location}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlumniTab;
