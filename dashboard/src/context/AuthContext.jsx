import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://zerodha-clone-backend-864o.onrender.com";
axios.defaults.withCredentials = true;

const parseJwt = (token) => {
  try {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Capture token if passed in URL query param (?token=...)
  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const tokenFromUrl = urlParams ? urlParams.get("token") : null;

  const [token, setToken] = useState(() => {
    if (tokenFromUrl) {
      localStorage.setItem("token", tokenFromUrl);
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
      return tokenFromUrl;
    }
    return localStorage.getItem("token") || "";
  });

  const [user, setUser] = useState(() => {
    // 1. Check if token from URL has user payload
    if (tokenFromUrl) {
      const decoded = parseJwt(tokenFromUrl);
      if (decoded && (decoded.userId || decoded.id)) {
        const u = {
          id: decoded.userId || decoded.id,
          username: decoded.username || "User",
          email: decoded.email,
          role: decoded.role || "user",
        };
        localStorage.setItem("user", JSON.stringify(u));
        return u;
      }
    }

    // 2. Check localStorage user
    try {
      const savedUser = localStorage.getItem("user");
      if (savedUser) return JSON.parse(savedUser);
    } catch {}

    // 3. Check localStorage token
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      const decoded = parseJwt(savedToken);
      if (decoded && (decoded.userId || decoded.id)) {
        return {
          id: decoded.userId || decoded.id,
          username: decoded.username || "User",
          email: decoded.email,
          role: decoded.role || "user",
        };
      }
    }

    return null;
  });

  const [loading, setLoading] = useState(() => {
    // If we already have a user or token, don't block the UI
    const activeToken = tokenFromUrl || localStorage.getItem("token");
    return !activeToken;
  });

  useEffect(() => {
    const activeToken = token || localStorage.getItem("token");
    if (activeToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${activeToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const checkAuth = async () => {
    const currentToken = token || localStorage.getItem("token");
    if (!currentToken) {
      setLoading(false);
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${currentToken}` };
      const response = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers,
        withCredentials: true,
      });

      if (response.data && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.warn("Session check fallback:", error.message);
      // Only clear if server explicitly says 401
      if (error.response && error.response.status === 401) {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setToken("");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [token]);

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setToken("");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      window.location.href = "https://zerodha-clone-frontend-ow9l.onrender.com/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
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
