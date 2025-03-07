import React, { useEffect, useState } from "react";
import axios from "axios";
import { FcCheckmark } from "react-icons/fc";
import { PiX } from "react-icons/pi";

const ApplicantsTab = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplicants = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/users/applicant", {
          params: {
            search: searchQuery.trim() !== "" ? searchQuery : undefined,
          },
        });
        setApplicants(response.data);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError(err.message || "Failed to fetch applicants.");
      }
      setLoading(false);
    };

    fetchApplicants();
  }, [searchQuery]);

  const handleAccept = async (applicantid) => {
    try {
      await axios.post(`http://localhost:5000/users/accept/${applicantid}`);
      setApplicants((prev) =>
        prev.filter((applicant) => applicant.applicantid !== applicantid)
      );
      setNotification("Applicant accepted successfully!");
    } catch (err) {
      console.error("Error accepting applicant:", err);
      setNotification("Error accepting applicant");
    }
  };

  const handleDecline = async (applicantid) => {
    try {
      await axios.delete(`http://localhost:5000/users/decline/${applicantid}`);
      setApplicants((prev) =>
        prev.filter((applicant) => applicant.applicantid !== applicantid)
      );
      setNotification("Applicant declined successfully!");
    } catch (err) {
      console.error("Error declining applicant:", err);
      setNotification("Error declining applicant");
    }
  };

  return (
    <div className="overflow-x-auto ml-40 mt-4">
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
            placeholder="Name, Course, School, Batch"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
      </div>

      <table className="table w-full mt-7">
        <thead className="bg-gray-100 border-b-2 border-gray-100 rounded-tl-lg rounded-tr-lg">
          <tr>
            <th className="px-17 py-3 text-gray-600 text-left rounded-tl-lg">
              Full Name
            </th>
            <th className="px-23 py-3 text-gray-600 text-left">Course</th>
            <th className="px-17 py-3 text-gray-600 text-left">School</th>
            <th className="px-19 py-3 text-gray-600 text-left">Batch</th>
            <th className="px-19 py-3 text-gray-600 text-left">Location</th>
            <th></th>
            <th className="px-19 py-3 text-gray-600 text-left rounded-tr-lg"></th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7" className="text-center py-4">
                <div className="flex flex-row h-[30rem] w-full items-center justify-center">
                  <span className="loading loading-spinner w-12"></span>
                </div>
              </td>
            </tr>
          ) : (
            applicants.map((applicant) => (
              <tr key={applicant.applicantid}>
                <td className="px-17 py-4">{applicant.fullname}</td>
                <td className="px-23 py-4">{applicant.course}</td>
                <td className="px-17 py-4">{applicant.school}</td>
                <td className="px-19 py-4">{applicant.batch}</td>
                <td className="px-19 py-4">{applicant.location}</td>
                <td>
                  <button onClick={() => handleAccept(applicant.applicantid)}>
                    <FcCheckmark className="w-5 h-5 mr-1" />
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDecline(applicant.applicantid)}>
                    <PiX className="w-5 h-5 mr-1 text-red-500" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicantsTab;
