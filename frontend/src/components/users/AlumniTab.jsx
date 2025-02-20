import React, { useEffect, useState  } from "react";
import axios from "axios";
// TODO: Joyce at si Badang
const AlumniTab = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users") // Fetch users
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, []);

    return (
        <div>
            <h2>Alumni List</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Username</th>
                        <th>User Type</th>
                        <th>Joined</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.userid}>
                            <td>{user.userid}</td>
                            <td>{user.username}</td>
                            <td>{user.usertype}</td>
                            <td>{new Date(user.jointimestamp).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlumniTab;
