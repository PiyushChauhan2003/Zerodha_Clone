import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const response = await signup(username, email, password);
      const token = response?.token || localStorage.getItem("token");
      setMessage("Account created successfully! Redirecting to Dashboard...");

      setTimeout(() => {
        window.location.href = token
          ? `https://zerodha-dashboard-e74d.onrender.com?token=${token}`
          : "https://zerodha-dashboard-e74d.onrender.com";
      }, 800);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Signup failed. Please try again with different credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm border-0 p-4" style={{ borderRadius: "8px" }}>
            <h2 className="text-center mb-4 text-dark fw-bold">Create Account</h2>

            {error && (
              <div className="alert alert-danger p-2 text-center" role="alert">
                {error}
              </div>
            )}

            {message && (
              <div className="alert alert-success p-2 text-center" role="alert">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label text-muted">Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Create password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-100 py-2 mt-2"
                style={{ backgroundColor: "#387ed1", borderColor: "#387ed1" }}
              >
                {loading ? "Creating account..." : "Sign Up"}
              </button>
            </form>

            <div className="text-center mt-3">
              <p className="text-muted mb-0">
                Already have an account?{" "}
                <Link to="/login" className="text-primary text-decoration-none">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;