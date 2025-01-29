import { useEffect, useState } from "react";
import api from "../util/JwtApi";
import { useAuth } from "../context/AuthContext";

const Home = () => {
    const [message, setMessage] = useState("");
    const { refreshToken } = useAuth();
    const { logout } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await api.get("/protected");
                setMessage(data.message);
            } catch (error) {
                setMessage("Internal Server Error");
            }
        };
    }, []);

    return (
        <>
            <h1 className="text-5xl text-primary">Home Page</h1>
            <p className="text-sm font-thin text-secondary">{message}</p>
            <button className="btn btn-primary btn-wide" onClick={logout}>
                Logout
            </button>
        </>
    );
};

export default Home;
