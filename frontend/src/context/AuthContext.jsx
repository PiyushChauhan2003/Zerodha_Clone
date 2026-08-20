import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://zerodha-clone-p79o.onrender.com";

// Configure axios defaults
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

  // Sync token to axios headers if present
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const checkAuth = async () => {
    try {
      const savedToken = localStorage.getItem("token");
      const headers = savedToken ? { Authorization: `Bearer ${savedToken}` } : {};

      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers,
        withCredentials: true,
      });

      if (response.data && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      // Clear user if session is invalid
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setToken("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      { email, password },
      { withCredentials: true }
    );

    const loggedInUser = response.data.user;
    const receivedToken = response.data.token;

    setUser(loggedInUser);
    setToken(receivedToken || "");

    if (loggedInUser) {
      localStorage.setItem("user", JSON.stringify(loggedInUser));
    }
    if (receivedToken) {
      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
    }

    return response.data;
  };

  const signup = async (username, email, password) => {
    const response = await axios.post(
      `${API_BASE_URL}/auth/signup`,
      { username, email, password },
      { withCredentials: true }
    );

    const registeredUser = response.data.user;
    const receivedToken = response.data.token;

    if (registeredUser) {
      setUser(registeredUser);
      localStorage.setItem("user", JSON.stringify(registeredUser));
    }
    if (receivedToken) {
      setToken(receivedToken);
      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${receivedToken}`;
    }

    return response.data;
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout request failed:", error);
    } finally {
      setUser(null);
      setToken("");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};