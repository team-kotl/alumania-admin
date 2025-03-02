import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PiFunnelSimpleLight } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";

const AlumniTab = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    status: "",
    location: "",
  });
  const [filterOpen, setIsOpen] = useState(false);
  const filterRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users");
        setAlumni(response.data);
        setFilteredAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    let filtered = alumni;

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((user) =>
        [user.userid, user.email, user.fullname]
          .join(" ")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    if (selectedFilters.status) {
      filtered = filtered.filter(
        (user) => user.empstatus === selectedFilters.status
      );
    }

    if (selectedFilters.location) {
      filtered = filtered.filter(
        (user) => user.location === selectedFilters.location
      );
    }

    setFilteredAlumni(filtered);
  }, [searchQuery, selectedFilters, alumni]);

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
    modalRef.current?.showModal();
  };

  const toggleFilter = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? "" : value,
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedAlumni(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-row h-[30rem] w-full items-center justify-center">
        <span className="loading loading-spinner w-12"></span>
      </div>
    );
  }

  return (
    <div className="overflow-auto ml-19 mt-3 pb-10">
      <div className="flex justify-end space-x-2 mb-3">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Name, ID, Email, School..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button
          className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          onClick={() => setIsOpen(!filterOpen)}
        >
          <PiFunnelSimpleLight className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      <table
        className="table w-370 border-collapse border border-gray-100 shadow-md mt-7"
        style={{ tableLayout: "fixed" }}
      >
        <thead className="bg-gray-100">
          <tr>
            <th
              className="px-10 py-3.5 text-gray-600"
              style={{ width: "100px" }}
            >
              UserID
            </th>
            <th
              className="px-4 py-3.5 text-gray-600"
              style={{ width: "180px" }}
            >
              Email
            </th>
            <th
              className="px-4 py-3.5 text-gray-600"
              style={{ width: "220px" }}
            >
              Full Name
            </th>
            <th
              className="px-4 py-3.5 text-gray-600"
              style={{ width: "120px" }}
            >
              School
            </th>
            <th
              className="px-4 py-3.5 text-gray-600"
              style={{ width: "120px" }}
            >
              Batch
            </th>
            <th
              className="px-4 py-3.5 text-gray-600"
              style={{ width: "150px" }}
            >
              Employment Status
            </th>
            <th
              className="px-4 py-3.5 text-gray-600"
              style={{ width: "90px" }}
            >
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAlumni.map((user) => (
            <tr
              key={user.userid}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectAlumni(user)}
            >
              <td className="px-10 py-5 truncate" style={{ width: "90px" }}>
                {user.userid}
              </td>
              <td className="px-4 py-5 truncate" style={{ width: "120px" }}>
                {user.email}
              </td>
              <td className="px-4 py-5 truncate" style={{ width: "120px" }}>
                {user.fullname}
              </td>
              <td className="px-4 py-5 truncate" style={{ width: "120px" }}>
                {user.school}
              </td>
              <td className="px-4 py-5 truncate" style={{ width: "90px" }}>
                {user.batch}
              </td>
              <td className="px-4 py-5 truncate" style={{ width: "120px" }}>
                {user.empstatus}
              </td>
              <td className="px-4 py-5 truncate" style={{ width: "90px" }}>
                {user.location}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filterOpen && (
        <dialog
          id="filter_modal"
          className="modal open"
          ref={filterRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              e.target.close();
              setIsOpen(false);
            }
          }}
          open
        >
          <div className="absolute top-62 right-25 bg-white shadow-lg rounded-lg p-6 w-90 border border-gray-200 z-50">
            <h3 className="text-l font-bold text-center text-gray-800">
              Search Filters
            </h3>
            <hr className="my-3 border-gray-300" />
            <div className="grid grid-cols-2 gap-6 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 ml-3 mb-2 border-b-2 border-blue-500 inline-block pb-1">
                  Status
                </h4>
                {["Employed", "Unemployed", "Underemployed"].map((status) => (
                  <button
                    key={status}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedFilters.status === status
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleFilter("status", status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 ml-3 mb-2 border-b-2 border-blue-500 inline-block pb-1">
                  Location
                </h4>
                {["Domestic", "Foreign"].map((location) => (
                  <button
                    key={location}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition ${
                      selectedFilters.location === location
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleFilter("location", location)}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </dialog>
      )}

      <dialog
        id="my_modal_2"
        ref={modalRef}
        className="modal"
        onClick={(e) => {
          if (e.target === modalRef.current) {
            setSelectedAlumni(null);
            modalRef.current.close();
          }
        }}
      >
        <div className="modal-box">
          {selectedAlumni && (
            <div className="text-center">
              <img
                src={imageUrl || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">
                {selectedAlumni.fullname}
              </h2>
            </div>
          )}

          {selectedAlumni && (
            <section className="mt-7 mb-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FaUserGraduate className="text-gray-600 ml-3" />
                Alumni Information
              </h3>

              <table className="w-full mt-3 border rounded-lg overflow-hidden">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 font-semibold bg-gray-100 w-32">
                      Email
                    </td>
                    <td className="px-3 py-2">
                      {selectedAlumni?.email || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 font-semibold bg-gray-100">
                      Course
                    </td>
                    <td className="px-3 py-2">
                      {selectedAlumni?.course || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 font-semibold bg-gray-100">
                      Status
                    </td>
                    <td className="px-3 py-2">
                      {selectedAlumni?.empstatus || "N/A"}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-3 py-2 font-semibold bg-gray-100">
                      Location
                    </td>
                    <td className="px-3 py-2">
                      {selectedAlumni?.location || "N/A"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-semibold bg-gray-100">
                      Company
                    </td>
                    <td className="px-3 py-2">
                      {selectedAlumni?.company || "N/A"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default AlumniTab;
