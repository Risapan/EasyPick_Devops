import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function OwnerDashboard() {
  const { user } = useAuth();

  return (
    <div className="dashboard">
      <div className="dash-welcome owner-welcome">
        <div className="dash-welcome-text">
          <span className="dash-greeting">Welcome back,</span>
          <h1>{user?.fullname || "Owner"} 🏎️</h1>
          <p>Manage your vehicles and track your earnings</p>
        </div>
        <div className="dash-welcome-badge">
          <span className="badge-role owner">Vehicle Owner</span>
        </div>
      </div>

      <div className="dash-stats">
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
            🚗
          </div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-title">Listed Vehicles</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f0fdf4", color: "#16a34a" }}>
            📋
          </div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-title">Active Rentals</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#fefce8", color: "#ca8a04" }}>
            ⏳
          </div>
          <div className="stat-info">
            <span className="stat-value">0</span>
            <span className="stat-title">Pending Requests</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon" style={{ background: "#f0fdf4", color: "#059669" }}>
            💰
          </div>
          <div className="stat-info">
            <span className="stat-value">Rs. 0</span>
            <span className="stat-title">Total Earnings</span>
          </div>
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/vehicles/add" className="action-card action-primary" id="action-add-vehicle">
              <span className="action-icon">➕</span>
              <span className="action-label">Add Vehicle</span>
              <span className="action-desc">List a new vehicle for rent</span>
            </Link>
            <Link to="/my-vehicles" className="action-card" id="action-my-vehicles">
              <span className="action-icon">🚙</span>
              <span className="action-label">My Vehicles</span>
              <span className="action-desc">Manage your listings</span>
            </Link>
            <Link to="/bookings" className="action-card" id="action-owner-bookings">
              <span className="action-icon">📅</span>
              <span className="action-label">Booking Requests</span>
              <span className="action-desc">Review and approve</span>
            </Link>
          </div>
        </div>

        <div className="dash-section">
          <h2>Recent Activity</h2>
          <div className="empty-state">
            <span className="empty-icon">📝</span>
            <p>No activity yet</p>
            <span className="empty-hint">
              Start by adding your first vehicle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
