import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiPlusCircle } from "react-icons/pi";
import { PiPencilSimple } from "react-icons/pi";
import { PiArchive } from "react-icons/pi";


// TODO: Joyce at si Badang
const ManagersTab = () => {
  const [managers, setManagers] = useState([]);
  const [selectedManager, setSelectedManager] = useState(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredManagers, setFilteredManagers] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);


  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/users/managers",
          {
            responseType: "json",
          }
        );
        setManagers(response.data);
        setFilteredManagers(response.data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchManagers();
  }, []);

  useEffect(() => {
    const filtered = managers.filter(
      (manager) =>
        manager.userid.toString().includes(searchQuery) ||
        manager.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredManagers(filtered);
  }, [searchQuery, managers]);

  if (loading) {
    return (
      <div className="flex flex-row h-[30rem] w-full items-center justify-center">
        <span className="loading loading-spinner w-12"></span>
      </div>
    );
  }

  const openModal = (manager) => {
    setSelectedManager(manager);
    setNewUsername(manager.username);
    setNewPassword("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedManager(null);
  };

  const openDeleteModal = (manager) => {
    setSelectedManager(manager);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedManager(null);
  };

  const saveChanges = () => {
    if (!selectedManager) return;

    const updatedData = { username: newUsername };
    if (newPassword) updatedData.password = newPassword;

    axios
      .put(
        `http://localhost:5000/users/managers/${selectedManager.userid}`,
        updatedData
      )
      .then((response) => {
        setManagers(
          managers.map((manager) =>
            manager.userid === selectedManager.userid
              ? { ...manager, username: newUsername }
              : manager
          )
        );
        closeModal();
      })
      .catch((error) => {
        console.error("Error updating manager:", error);
      });
  };

  const openAddModal = () => {
    setNewUsername("");
    setNewPassword("");
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const addManager = () => {
    if (!newUsername || !newPassword) return;

    axios
      .post("http://localhost:5000/users/addManager", {
        username: newUsername,
        password: newPassword,
      })
      .then((response) => {
        setManagers([...managers, response.data]);
        closeAddModal();
      })
      .catch((error) => {
        console.error("Error adding manager:", error);
      });
  };

  const deleteManager = () => {
    if (!selectedManager) return;

    axios
      .delete(`http://localhost:5000/users/managers/${selectedManager.userid}`)
      .then(() => {
        setManagers(
          managers.filter(
            (manager) => manager.userid !== selectedManager.userid
          )
        );
        closeDeleteModal();
      })
      .catch((error) => {
        console.error("Error deleting manager:", error);
      });
  };

  return (
    <div className="overflow-x-auto ml-35 mt-5">
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
        <button className="flex items-center space-x-2 p-3 bg-blue-500 rounded-lg hover:bg-blue-300 h-10" onClick={openAddModal}>
          <PiPlusCircle className="w-5 h-5 text-white" />
          <span className="text-white">Add Manager</span>
        </button>
      </div>

      <table className="table w-full max-w-none border-collapse border border-gray-100 shadow-lg rounded-lg mt-7">
        <thead className="bg-gray-100">
          <tr>
            <th className="w-1/2 px-37 py-4 text-left text-sm text-gray-600">
              Manager ID
            </th>
            <th className="w-1/2 px-37 py-4 text-left text-sm text-gray-600">
              Username
            </th>
            <th className="w-1/2 px-37 py-4 text-left text-sm text-gray-600">
              Actions
            </th>
            <th className="w-1/2 px-32 py-4 text-left text-sm text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {filteredManagers.map((manager) => (
            <tr
              key={manager.userid}
              className="hover:bg-gray-50 transition duration-150 ease-in-out"
            >
              <td className="w-1/2 px-42 py-4 whitespace-nowrap text-sm text-gray-900">
                {manager.userid}
              </td>
              <td className="w-1/2 px-38 py-4 whitespace-nowrap text-sm text-gray-900">
                {manager.username}
              </td>
              <td className="w-1/2 px-34 py-4 whitespace-nowrap text-sm text-gray-900">
                <button
                  className="px-4 py-2 rounded-lg hover:opacity-80 transition duration-150 ease-in-out mr-2"
                  onClick={() => openModal(manager)}
                >
                  <PiPencilSimple 
                    className="w-5 h-5 mr-1"
                  />
                </button>
                <button
                  className="px-4 py-2 rounded-lg hover:opacity-80 transition duration-150 ease-in-out mr-2"
                  onClick={() => openDeleteModal(manager)}
                >
                  <PiArchive className="w-5 h-6 mr-1 text-red-600"
                  />
                </button>
              </td>
              <td className="w-1/2 px-30 py-4 text-left text-sm text-gray-600"></td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Manager</h3>
            <label className="block mb-2">Username</label>
            <input
              type="text"
              className="border p-2 w-full rounded mb-4"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <label className="block mb-2">New Password</label>
            <input
              type="password"
              className="border p-2 w-full rounded mb-4"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password (optional)"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                onClick={saveChanges}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{selectedManager?.username}</strong>?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                onClick={closeDeleteModal}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={deleteManager}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isAddModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                  <h3 className="text-lg font-semibold mb-4">Add Manager</h3>
                  <label className="block mb-2">Username</label>
                  <input
                    type="text"
                    className="border p-2 w-full rounded mb-4"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                  />
                  <label className="block mb-2">Password</label>
                  <input
                    type="password"
                    className="border p-2 w-full rounded mb-4"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                      onClick={closeAddModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      onClick={addManager}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            )}
    </div>
  );
};

export default ManagersTab;
