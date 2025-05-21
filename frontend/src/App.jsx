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
import EventForm from "./components/add/EventForm.jsx";
import JobForm from "./components/add/JobForm.jsx";
import SessionModal from "./components/core/SessionModal.jsx";
import AlumniTab from "./components/users/AlumniTab.jsx";
import ApplicantsTab from "./components/users/ApplicantsTab.jsx";
import ManagersTab from "./components/users/ManagersTab.jsx";
import ExperiencesTab from "./components/posts/ExperiencesTab.jsx";
import EventsTab from "./components/posts/EventsTab.jsx";
import JobsTab from "./components/posts/JobsTab.jsx";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import RootLayout from "./layouts/RootLayout";
import Fields from "./pages/Fields.jsx";

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
                    <Route path="/" element={<ProtectedRoute />}>
                    {/* <Route path="/" element={<RootLayout />}> */}
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
                        <Route path="fields" element={<Fields />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
