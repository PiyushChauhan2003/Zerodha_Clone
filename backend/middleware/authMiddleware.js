const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    let token = req.cookies?.token;

    // Also support Bearer token from Authorization header or custom headers
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (!token && req.headers["x-access-token"]) {
      token = req.headers["x-access-token"];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first to access this resource",
      });
    }

    const secret = process.env.JWT_SECRET || "secret_key";
    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
};

module.exports = authenticateUser;