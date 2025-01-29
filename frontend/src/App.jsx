import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import Login from "./components/Login";

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Login />} />
                </Routes>
        </Router>
    );
}

export default App;
