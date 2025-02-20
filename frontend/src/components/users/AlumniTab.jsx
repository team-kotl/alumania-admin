import React, { useEffect, useState  } from "react";
import axios from "axios";
// TODO: Joyce at si Badang
const AlumniTab = () => {
    const [alumni, setAlumni] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/users") 
            .then(response => {
                setAlumni(response.data);
            })
            .catch(error => {
                console.error("Error fetching alumni:", error);
            });
    }, []);

    return (
        <div>
            <h2>Alumni List</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Email</th>
                        <th>Full Name</th>
                        <th>Employment Status</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {alumni.map(user => (
                        <tr key={user.userid}>
                            <td>{user.userid}</td>
                            <td>{user.email}</td>
                            <td>{user.fullname}</td>
                            <td>{user.employment_status}</td>
                            <td>{user.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AlumniTab;
