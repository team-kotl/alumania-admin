import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PiFunnelSimpleLight } from "react-icons/pi";
import { FaUserGraduate } from "react-icons/fa";

const AlumniTab = () => {
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
  const inputRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/users", {
          params: {
            search: searchQuery.trim() !== "" ? searchQuery : undefined,
            status: selectedFilters.status || undefined,
            location: selectedFilters.location || undefined,
          },
        });
        setFilteredAlumni(response.data);
      } catch (error) {
        console.error("Error fetching alumni:", error);
      }
      setLoading(false);
    };

    fetchUsers();
  }, [searchQuery, selectedFilters]);

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

  const generateDefaultAvatar = (name) => {
    const canvas = document.createElement("canvas");
    canvas.width = 100;
    canvas.height = 100;
    const ctx = canvas.getContext("2d");

    const randomColor = `hsl(${Math.random() * 360}, 60%, 70%)`;
    ctx.fillStyle = randomColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
  
    const initials = name
      ? name
          .split(" ")
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      : "?";
  
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
  
    return canvas.toDataURL();
  };

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
            ref={inputRef}
            type="search"
            required
            placeholder="Name, ID, Email..."
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

      <div
        className="overflow-y-auto max-h-[650px] relative"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <table
        className="table w-370 border-collapse border border-gray-100 shadow-md mt-6 sticky top-0 z-1"
        style={{ tableLayout: "fixed"  }}
      >
          <thead className="bg-gray-100 sticky top-0 z-20">
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
                style={{ width: "100px" }}
              >
                Batch
              </th>
              <th
                className="px-4 py-3.5 text-gray-600"
                style={{ width: "170px" }}
              >
                Employment Status
              </th>
              <th className="px-4 py-3.5 text-gray-600" style={{ width: "90px" }}>
                Location
              </th>
            </tr>
          </thead>
          <tbody className="relative z-0">
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-10">
                    <span className="loading loading-spinner w-12"></span>
                  </td>
                </tr>
              ) : (
                filteredAlumni.map((user) => (
                  <tr
                    key={user.userid}
                    className="hover:bg-gray-100 cursor-pointer relative"
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
                    <td className="px-4 py-5 truncate" style={{ width: "100px" }}>
                      {user.batch}
                    </td>
                    <td className="px-4 py-5 truncate" style={{ width: "100px" }}>
                      {user.empstatus}
                    </td>
                    <td className="px-4 py-5 truncate" style={{ width: "90px" }}>
                      {user.location}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
        </table>
      </div>
      

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
        id="alumni_modal"
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
            <div className="flex items-center space-x-4">
              <img
                src={imageUrl || generateDefaultAvatar(selectedAlumni?.fullname)}
                alt="Profile"
                className="w-20 h-20 rounded-full"
              />
              <div>
                <h2 className="text-xl font-semibold">
                  {selectedAlumni.fullname}
                </h2>
                <p className="text-gray-500">
                  <span className="font-semibold mt-5">User ID:</span>{" "}
                  {selectedAlumni.userid}
                </p>
              </div>
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
                      Batch
                    </td>
                    <td className="px-3 py-2">
                      {selectedAlumni?.batch || "N/A"}
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
