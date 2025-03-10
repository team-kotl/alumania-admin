import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const SessionModal = () => {
    const { setShowWarning, showWarning, refreshToken } = useAuth();

    useEffect(() => {
        if (showWarning) {
            document.getElementById("session_modal").showModal();
        } else {
            document.getElementById("session_modal").close();
        }
    }, [showWarning]);

    // if (!showWarning) return null;

    return (
        <>
            <dialog id="session_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">System</h3>
                    <p className="py-4">
                        Your session is about to expire and you will be logged
                        out in 5 minutes.
                    </p>
                    <div className="modal-action">
                        <button
                            className="btn btn-primary"
                            onClick={refreshToken}
                        >
                            Extend Session
                        </button>
                        <form method="dialog">
                            <button
                                className="btn"
                                onClick={() => setShowWarning(false)}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default SessionModal;
