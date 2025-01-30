import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { AuthProvider } from "./context/AuthContext";
import AddPage from "./pages/AddPage";
import UsersPage from "./pages/UsersPage";
import PostsPage from "./pages/PostsPage";
import Profile from "./pages/Profile";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./util/ProtectedRoute";
import EventForm from "./components/EventForm";
import JobForm from "./components/JobForm";
import SessionModal from "./components/SessionModal";
import AlumniTab from "./components/AlumniTab";
import ApplicantsTab from "./components/ApplicantsTab";
import ManagersTab from "./components/ManagersTab";
import ExperiencesTab from "./components/ExperiencesTab";
import EventsTab from "./components/EventsTab";
import JobsTab from "./components/JobsTab";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";

function App() {
    useEffect(() => {
        themeChange(false);
    }, []);

    return (
        <AuthProvider>
            <SessionModal />
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* <Route path="/" element={<ProtectedRoute />}> */}
                    <Route path="/" element={<RootLayout />}>
                        <Route path="home" element={<HomePage />} />
                        <Route path="add" element={<AddPage />}>
                            <Route path="event" element={<EventForm />} />
                            <Route path="job" element={<JobForm />} />
                        </Route>
                        <Route path="users" element={<UsersPage />}>
                            <Route path="alumni" element={<AlumniTab />} />
                            <Route
                                path="managers"
                                element={<ApplicantsTab />}
                            />
                            <Route
                                path="applicants"
                                element={<ManagersTab />}
                            />
                        </Route>
                        <Route path="posts" element={<PostsPage />}>
                            <Route
                                path="experiences"
                                element={<ExperiencesTab />}
                            />
                            <Route path="events" element={<EventsTab />} />
                            <Route path="jobs" element={<JobsTab />} />
                        </Route>
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
