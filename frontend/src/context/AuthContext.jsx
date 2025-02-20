import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useRef
} from "react";
import api from "../util/JwtApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [type, setType] = useState(localStorage.getItem("type"));
    const [showWarning, setShowWarning] = useState(false);
    const timerRef = useRef({ warning: null, logout: null });

    const clearTimers = useCallback(() => {
        if (timerRef.current.warning) {
            clearTimeout(timerRef.current.warning);
            timerRef.current.warning = null;
        }
        if (timerRef.current.logout) {
            clearTimeout(timerRef.current.logout);
            timerRef.current.logout = null;
        }
    }, []);

    const startTimers = useCallback((expirationTime) => {
        const warningTime = expirationTime - 5 * 60 * 1000; // 5 minutes before
        const now = Date.now();

        if (warningTime > now) {
            timerRef.current.warning = setTimeout(() => {
              setShowWarning(true);
            }, warningTime - now);
          }
      
          timerRef.current.logout = setTimeout(() => {
            logout();
          }, expirationTime - now);
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", user);
        }
        if (type) {
            localStorage.setItem("type", type);
        }
        if (token) {
            localStorage.setItem("token", token);
            const decoded = JSON.parse(atob(token.split(".")[1]));
            const expirationTime = decoded.exp * 1000;

            clearTimers();
            startTimers(expirationTime);
        } else {
            clearTimers();
            setShowWarning(false);
        }

        return () => clearTimers();
    }, [token, clearTimers, startTimers, user, type]);

    const login = async (credentials) => {
        try {
            const { data } = await api.post("/auth/login", credentials);
            setToken(data.token);
            setUser(data.username);
            setType(data.usertype);
            setShowWarning(false);
            return true;
        } catch (err) {
            return "Invalid Credentials";
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setType(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("type");
    };

    const refreshToken = async () => {
        try {
            const { data } = await api.post("/auth/refresh-token", { token });
            setToken(data.token);
            return data.token;
        } catch (error) {
            logout();
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                token,
                user,
                type,
                login,
                logout,
                refreshToken,
                showWarning,
                setShowWarning,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
