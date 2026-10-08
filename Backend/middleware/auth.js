const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "easypick_jwt_secret_key_2024";

/**
 * Middleware: verifies the JWT from the Authorization header.
 * Attaches decoded user payload to req.user on success.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
}

/**
 * Middleware: restricts access to specific roles.
 * Usage: authorizeRoles("admin", "owner")
 */
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resource.",
      });
    }
    next();
  };
}

module.exports = { verifyToken, authorizeRoles, JWT_SECRET };
