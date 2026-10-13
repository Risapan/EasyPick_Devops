import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar" id="main-navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🚗</span>
          <span className="brand-text">EasyPick</span>
        </Link>

        <div className="navbar-links">
          {!user ? (
            <>
              <Link to="/login" className="nav-link" id="nav-login">
                Sign In
              </Link>
              <Link to="/signup" className="nav-btn" id="nav-signup">
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link" id="nav-dashboard">
                Dashboard
              </Link>
              <div className="nav-user">
                <span className="nav-avatar">
                  {user.fullname.charAt(0).toUpperCase()}
                </span>
                <span className="nav-username">{user.fullname}</span>
                <button onClick={logout} className="nav-logout" id="nav-logout">
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
