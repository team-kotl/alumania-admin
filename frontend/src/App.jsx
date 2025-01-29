import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./util/ProtectedRoute";
import SessionModal from "./components/SessionModal";
import Login from "./pages/Login";
import Home from "./pages/Home";

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <AuthProvider>
            <SessionModal />
            <Router>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
