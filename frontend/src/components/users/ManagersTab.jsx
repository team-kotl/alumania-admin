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
  const [setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

useEffect(() => {
  const fetchManagers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/users/managers", {
        params: {
          search: searchQuery.trim() !== "" ? searchQuery : undefined,
        },
      });
      setManagers(response.data);
    } catch (err) {
      console.error("Error fetching managers:", err);
      setError(err.message || "Failed to fetch managers.");
    }
    setLoading(false);
  };

  fetchManagers();
}, [searchQuery]); 

  const editManager = (manager) => {
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
    document.getElementById("add_manager_modal").close();
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

//  const deleteManager = () => {
//    if (!selectedManager) return;
//
//   axios
//      .delete(`http://localhost:5000/users/managers/${selectedManager.userid}`)
//      .then(() => {
//        setManagers(
//          managers.filter(
//            (manager) => manager.userid !== selectedManager.userid
//          )
//        );
//        closeDeleteModal();
//      })
//      .catch((error) => {
//        console.error("Error deleting manager:", error);
//      });
//  };

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
            placeholder="Name, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button
          className="flex items-center space-x-2 p-3 bg-blue-500 rounded-lg hover:bg-blue-300 h-10"
          onClick={() => {
            openAddModal();
            document.getElementById("add_manager_modal").showModal();
          }}
        >
          <PiPlusCircle className="w-5 h-5 text-white" />
          <span className="text-white">Add Manager</span>
        </button>
      </div>
      
      <div
        className="overflow-y-auto max-h-[500px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
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
            {loading ? (
              <tr>
                <td colSpan="4">
                  <div className="flex flex-row h-[30rem] w-full items-center justify-center">
                    <span className="loading loading-spinner w-12"></span>
                  </div>
                </td>
              </tr>
            ) : (
              managers.map((manager) => (
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
                      onClick={() =>
                        document.getElementById("edit_manager_modal").showModal()
                      }
                    >
                      <PiPencilSimple className="w-5 h-5 mr-1" />
                    </button>
                    <button
                      className="px-4 py-2 rounded-lg hover:opacity-80 transition duration-150 ease-in-out mr-2"
                      onClick={() => openDeleteModal(manager)}
                      disabled
                    >
                      <PiArchive className="w-5 h-6 mr-1 text-red-600" />
                    </button>
                  </td>
                  <td className="w-1/2 px-30 py-4 text-left text-sm text-gray-600"></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>      
      
      {editManager && (
        <dialog
          id="edit_manager_modal"
          className="modal"
          onClick={(e) => {
            const modal = document.getElementById("edit_manager_modal");
            if (e.target === modal) modal.close();
          }}
        >
          <div className="modal-box bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-semibold text-xl text-gray-900 mb-4">
              Edit Manager
            </h3>
            {/* Username Input */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Username:
              </label>
              <div className="flex items-center border border-gray-200 rounded-md p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  className="w-full bg-gray-50 text-gray-700 placeholder-gray-500 border-none outline-none ml-2 focus:ring-0 focus:outline-none"
                  placeholder="Enter username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password:
              </label>
              <div className="flex items-center border border-gray-200 rounded-md p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-50 text-gray-700 placeholder-gray-500 border-none outline-none ml-2 focus:ring-0 focus:outline-none"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                className="text-blue-600 text-sm mt-1 hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>

            <div className="mt-4">
              <button
                className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
                onClick={saveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button>Close</button>
          </form>
        </dialog>
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

      <dialog
        id="add_manager_modal"
        className="modal"
        onClose={() => setIsAddModalOpen(false)}
      >
        {isAddModalOpen && (
          <div className="modal-box bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="font-semibold text-xl text-gray-900 mb-4">
              Add Manager
            </h3>

            {/* Username Input */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Username:
              </label>
              <div className="flex items-center border border-gray-200 rounded-md p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  className="w-full bg-gray-50 text-gray-700 placeholder-gray-500 border-none outline-none ml-2 focus:ring-0 focus:outline-none"
                  placeholder="Enter username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-3">
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password:
              </label>
              <div className="flex items-center border border-gray-200 rounded-md p-2 bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400">
                <svg
                  className="h-5 w-5 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                  <circle
                    cx="16.5"
                    cy="7.5"
                    r=".5"
                    fill="currentColor"
                  ></circle>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-50 text-gray-700 placeholder-gray-500 border-none outline-none ml-2 focus:ring-0 focus:outline-none"
                  placeholder="Enter password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <button
                className="text-blue-600 text-sm mt-1 hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </button>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                className="w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition"
                onClick={() => {
                  closeAddModal();
                  document.getElementById("add_manager_modal").close();
                }}
              >
                Cancel
              </button>
              <button
                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
                onClick={addManager}
              >
                Add Manager
              </button>
            </div>
          </div>
        )}
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
};
export default ManagersTab;
