import { useState } from "react";
import Banner from "../components/core/BrandBanner.jsx";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    document.body.style.overflow = 'hidden';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const flag = await login({ username, password });
        if (flag === true) {
            navigate("/");
        } else {
            setError(flag);
        }
    };

    return (
        <>
            <div className="overflow-hidden">
                <Banner />
                <div className="flex flex-col max-w-sm p-3 m-auto -mt-6">
                    <p className="font-extralight text-xl text-center mb-8">
                        Login to your account
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1 mb-2">
                            <label>Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="input w-full"
                                placeholder="Enter your username"
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="input w-full"
                                placeholder="Enter your password"
                                autoComplete="new-password"
                            />
                        </div>
                        {error && <p className="text-error">{error}</p>}
                        <div className="flex flex-col mt-2">
                            <button
                                type="submit"
                                className="btn btn-primary w-28 self-center"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
