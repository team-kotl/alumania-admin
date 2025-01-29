import { useState } from "react";
import Banner from "./BrandBanner";
import axios from "axios";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:5000/auth/login`, {
                username: username,
                password: password,
            })
            .then(() => {
                setError("Good Job!");
            })
            .catch((error) => {
                setError(error.response.data.error);
            });
    };

    return (
        <>
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
        </>
    );
}
