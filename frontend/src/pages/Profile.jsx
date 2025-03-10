import { PiAddressBookLight } from "react-icons/pi";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Profile = () => {
    const [loading, setLoading] = useState(true);

    const [profile, setProfile] = useState({
        username: localStorage.getItem("user") || null,
        type: localStorage.getItem("type") || null,
        userid: null,
        joined: null,
    });

    const [logs, setLogs] = useState([]);

    const { logout } = useAuth();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userDetailsResponse = await axios.get(
                    `http://localhost:5000/auth/user-details?username=${profile.username}`
                );
                const { userid, joined } = userDetailsResponse.data;
                setProfile((values) => ({
                    ...values,
                    userid: userid,
                    joined: joined,
                }));
            } catch (_) {
                /* empty */
            }

            try {
                const logsResponse = await axios.get(
                    `http://localhost:5000/auth/logs?username=${profile.username}`
                );
                const { logs } = logsResponse.data;
                setLogs(logs);
            } catch (_) {
                /* empty */
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [profile.username]);

    function formatDate(dateString) {
        if (!dateString) return null;
        const date = new Date(dateString);
        const dateOptions = { year: "numeric", month: "long", day: "numeric" };
        const formattedDate = new Intl.DateTimeFormat(
            "en-US",
            dateOptions
        ).format(date);
        const timeOptions = {
            hour: "numeric",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        };
        const formattedTime = new Intl.DateTimeFormat(
            "en-US",
            timeOptions
        ).format(date);
        return `${formattedDate} - ${formattedTime}`;
    }

    const handleGenerateKey = () => {
        const postNewKey = async () => {
            await axios
                .post("http://localhost:5000/auth/new-key", { username: profile.username })
                .then((res) => {
                    const { message } = res.data;

                    navigator.clipboard.writeText(message);

                    document.getElementById("key_modal").showModal();
                });
        };

        postNewKey();
    };

    const handleLogout = () => {
        logout();
    };

    if (loading) {
        return (
            <>
                <div className="flex flex-row h-screen w-full items-center justify-center">
                    <span className="loading loading-spinner w-12"></span>
                </div>
            </>
        );
    }

    return (
        <>
            <InitialKeyModal handleGenerateKey={handleGenerateKey} />
            <KeyModal />
            <LogoutModal handleLogout={handleLogout}/>
            <div className="flex flex-row h-[calc(100vh-2.5rem)] my-5 text-gray-700">
                <div className="flex flex-col w-[50%] pt-15 pl-15 border-r">
                    <div className="flex flex-row items-center gap-5">
                        <div className="avatar">
                            <div className="w-32 h-32 rounded-full">
                                <img
                                    src={
                                        profile.type === "admin"
                                            ? "../src/assets/admin.svg"
                                            : "../src/assets/manager.svg"
                                    }
                                    alt="Profile Picture"
                                />
                            </div>
                        </div>
                        <div className="flex-col">
                            <p className="text-3xl">
                                {profile.username || "N/A"}
                            </p>
                            <p className="text-xl">{profile.userid || "N/A"}</p>
                        </div>
                    </div>

                    <div className="flex flex-col pl-10 pr-25 pt-20">
                        <div className="flex flex-row items-center">
                            <PiAddressBookLight size="42px" />
                            <p className="text-xl">Admin Information</p>
                        </div>
                        <table className="table mt-3">
                            <tbody>
                                <tr className="hover:bg-base-300">
                                    <td className="text-right">User Name:</td>
                                    <td style={{ width: "80%" }}>
                                        {profile.username || "N/A"}
                                    </td>
                                </tr>
                                <tr className="hover:bg-base-300">
                                    <td className="text-right">Joined:</td>
                                    <td style={{ width: "80%" }}>
                                        {formatDate(profile.joined) || "N/A"}
                                    </td>
                                </tr>
                                <tr className="hover:bg-base-300">
                                    <td className="text-right">User Type:</td>
                                    <td style={{ width: "80%" }}>
                                        {profile.type || "N/A"}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-row gap-2 justify-end pr-25 pt-12">
                        <button
                            type="button"
                            className="btn btn-outline btn-primary"
                            onClick={() =>
                                document
                                    .getElementById("initial_key_modal")
                                    .showModal()
                            }
                        >
                            Generate Key
                        </button>
                        <button
                            type="button"
                            className="btn btn-outline btn-error"
                            onClick={() =>
                                document
                                    .getElementById("logout_modal")
                                    .showModal()
                            }
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <div className="h-[calc(100vh-3.75rem)] w-[50%] pt-15 px-12">
                    <p className="text-xl">Activity Log</p>
                    <div className="mt-5 max-h-[700px] overflow-y-auto">
                        <table className="table table-pin-rows">
                            <thead>
                                <tr>
                                    <th>Log ID</th>
                                    <th>Activity</th>
                                    <th>Target</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length > 0 ? (
                                    logs.map((log) => (
                                        <tr
                                            key={log.id}
                                            className="hover:bg-gray-100"
                                        >
                                            <td>{log.id}</td>
                                            <td>{log.activity}</td>
                                            <td>{log.target}</td>
                                            <td>{formatDate(log.timestamp)}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="text-center">
                                            No Activities yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

const LogoutModal = ({ handleLogout }) => {
    return (
        <>
            <dialog id="logout_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Logout</h3>
                    <p className="py-4">
                        Are you sure you want to logout?
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn btn-outline btn-error"
                                onClick={() => handleLogout()}
                            >
                                Logout
                            </button>
                            <button className="btn btn-outline btn-primary ml-2">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

const InitialKeyModal = ({ handleGenerateKey }) => {
    return (
        <>
            <dialog id="initial_key_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Generate new login key</h3>
                    <p className="py-4">
                        Are you sure you want to generate a new login key?
                    </p>
                    <p className="text-error">This action is irreversible</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button
                                className="btn btn-outline btn-warning"
                                onClick={(event) => handleGenerateKey(event)}
                            >
                                Generate
                            </button>
                            <button className="btn btn-outline btn-primary ml-2">
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

const KeyModal = () => {
    return (
        <>
            <dialog id="key_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">New Login Key</h3>
                    <p className="py-4 text-[.9rem]">
                        We&apos;ve copied your new login key to your clipboard. Take care of it.
                    </p>
                    <p className="text-error text-center"> You will not be seeing it again 🙂</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-outline btn-primary">
                                Ok
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Profile;
