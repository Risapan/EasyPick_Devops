import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function CustomerDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dash-welcome">
        <div className="dash-welcome-text">
          <span className="dash-greeting">Welcome back,</span>
          <h1>{user?.fullname || "Renter"} 👋</h1>
          <p>Find and reserve your perfect vehicle today</p>
        </div>
        <div className="dash-welcome-badge">
          <span className="badge-role customer">Customer</span>
        </div>
      </div>

      <div className="dash-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
            📋
          </div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-title">Active Bookings</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f0fdf4", color: "#16a34a" }}>
            ✅
          </div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-title">Completed Trips</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fefce8", color: "#ca8a04" }}>
            ⭐
          </div>
          <div className="stat-info">
            <span className="stat-value">—</span>
            <span className="stat-title">Rating</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fdf2f8", color: "#db2777" }}>
            💰
          </div>
          <div className="stat-info">
            <span className="stat-value">Rs. 0</span>
            <span className="stat-title">Total Spent</span>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/vehicles" className="action-card" id="action-browse">
              <span className="action-icon">🔍</span>
              <span className="action-label">Browse Vehicles</span>
              <span className="action-desc">Find your perfect ride</span>
            </Link>
            <Link to="/bookings" className="action-card" id="action-bookings">
              <span className="action-icon">📅</span>
              <span className="action-label">My Bookings</span>
              <span className="action-desc">View reservation history</span>
            </Link>
            <Link to="/profile" className="action-card" id="action-profile">
              <span className="action-icon">👤</span>
              <span className="action-label">My Profile</span>
              <span className="action-desc">Manage your account</span>
            </Link>
          </div>
        </div>

        <div className="dash-section">
          <h2>Recent Activity</h2>
          <div className="empty-state">
            <span className="empty-icon">🚗</span>
            <p>No recent activity yet</p>
            <span className="empty-hint">
              Start by browsing available vehicles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerDashboard;
