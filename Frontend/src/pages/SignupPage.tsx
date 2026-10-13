import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./SignupPage.css";

import carlogo from "../assets/car.png";
import personlogo from "../assets/man.png";

function SignupPage() {
  const [role, setRole] = useState<"customer" | "owner">("customer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      await signup({ name, email, password, role });
      setFeedback({
        type: "success",
        text: "Account created successfully! Redirecting to login...",
      });

      // Redirect to login after brief delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      const serverMessage = error.response?.data?.message;
      const errorText =
        serverMessage ||
        (error.message === "Network Error"
          ? "Cannot connect to backend server. Make sure the backend is running on http://localhost:8000."
          : error.message || "Registration failed. Please try again.");

      setFeedback({ type: "error", text: errorText });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-visual">
        <div className="signup-visual-content">
          <div className="visual-badge">🚗 EasyPick</div>
          <h1>Start your journey</h1>
          <p>
            Join thousands of users renting and listing vehicles across Sri Lanka. 
            Create your free account in seconds.
          </p>
          <div className="visual-stats">
            <div className="stat-item">
              <span className="stat-number">2,500+</span>
              <span className="stat-label">Vehicles Listed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Happy Renters</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Cities</span>
            </div>
          </div>
        </div>
      </div>

      <div className="signup-form-section">
        <div className="signup-form-container">
          <div className="signup-form-header">
            <h2>Create your account</h2>
            <p>Fill in the details to get started</p>
          </div>

          <p className="label-top">I want to</p>
          <div className="role-selector">
            <div
              className={`role-card ${role === "customer" ? "active" : ""}`}
              onClick={() => setRole("customer")}
              id="role-customer"
            >
              <div className="role-icon">
                <img src={personlogo} alt="Customer" />
              </div>
              <span>Rent A Vehicle</span>
            </div>

            <div
              className={`role-card ${role === "owner" ? "active" : ""}`}
              onClick={() => setRole("owner")}
              id="role-owner"
            >
              <div className="role-icon">
                <img src={carlogo} alt="Owner" />
              </div>
              <span>List My Vehicle</span>
            </div>
          </div>

          {feedback && (
            <div className={`alert-box alert-${feedback.type}`} id="signup-feedback">
              {feedback.type === "error" ? "⚠ " : "✓ "}
              {feedback.text}
            </div>
          )}

          <form onSubmit={handleSubmit} id="signup-form">
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                type="text"
                placeholder="Maria Santos"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                placeholder="Min. 6 characters"
                value={password}
                minLength={6}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
              <small>Must include uppercase, number, and special character</small>
            </div>

            <button type="submit" className="signup-submit-btn" disabled={isSubmitting} id="signup-submit">
              {isSubmitting ? (
                <span className="btn-loading">
                  <span className="spinner" /> Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="signup-terms">
            By signing up you agree to our{" "}
            <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
          </div>

          <div className="signup-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" id="signup-to-login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
