import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await api.post("/refresh-token", {
                    token: localStorage.getItem("token"),
                });
                localStorage.setItem("token", newToken.data.token);
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("token");
                window.location = "login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;