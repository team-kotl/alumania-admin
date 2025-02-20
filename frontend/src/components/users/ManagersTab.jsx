import React, { useEffect, useState  } from "react";
import axios from "axios";
// TODO: Joyce at si Badang
const ManagersTab = () => {
    const [managers, setManagers] = useState([]);
    const [selectedManager, setSelectedManager] = useState(null);
    const [newUsername, setNewUsername] = useState("");
    const [newPassword, setNewPassword] = useState(""); // New state for password
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch managers
    useEffect(() => {
        axios.get("http://localhost:5000/users/managers")
            .then(response => {
                setManagers(response.data);
            })
            .catch(error => {
                console.error("Error fetching managers:", error);
            });
    }, []);

    // Open modal and set selected manager
    const openModal = (manager) => {
        setSelectedManager(manager);
        setNewUsername(manager.username);
        setNewPassword(""); // Clear password field when opening modal
        setIsModalOpen(true);
    };

    // Close modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedManager(null);
    };

    // Save updated manager info
    const saveChanges = () => {
        if (!selectedManager) return;

        const updatedData = {
            username: newUsername,
            password: newPassword, // Sending new password (if any)
        };

        axios.put(`http://localhost:5000/users/managers/${selectedManager.userid}`, updatedData)
            .then(response => {
                console.log("Manager updated:", response.data);
                setManagers(managers.map(manager => 
                    manager.userid === selectedManager.userid 
                        ? { ...manager, username: newUsername } 
                        : manager
                ));
                closeModal();
            })
            .catch(error => {
                console.error("Error updating manager:", error);
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Managers List</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border p-2">Username</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {managers.map(manager => (
                        <tr key={manager.userid} className="border">
                            <td className="border p-2">{manager.username}</td>
                            <td className="border p-2">
                                <button 
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                    onClick={() => openModal(manager)}
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Manager Modal */}
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
        </div>
    );
};

export default ManagersTab;
