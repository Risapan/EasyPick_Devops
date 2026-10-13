import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./HomePage.css";

function HomePage() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section" id="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span>🇱🇰</span> Sri Lanka's #1 Vehicle Rental Platform
          </div>
          <h1>
            Find & Reserve<br />
            <span className="hero-gradient">Your Perfect Ride</span>
          </h1>
          <p className="hero-subtitle">
            Connect with verified vehicle owners across Sri Lanka. 
            Book instantly, travel confidently — whether you're a local or a tourist.
          </p>
          <div className="hero-actions">
            {user ? (
              <Link to="/dashboard" className="btn-primary" id="hero-dashboard">
                Go to Dashboard →
              </Link>
            ) : (
              <>
                <Link to="/signup" className="btn-primary" id="hero-signup">
                  Get Started — It's Free
                </Link>
                <Link to="/login" className="btn-secondary" id="hero-login">
                  Sign In
                </Link>
              </>
            )}
          </div>
          <div className="hero-trust">
            <div className="trust-item">
              <span className="trust-check">✓</span>
              Verified Owners
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              Secure Payments
            </div>
            <div className="trust-item">
              <span className="trust-check">✓</span>
              24/7 Support
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-header">
          <span className="section-badge">Features</span>
          <h2>Why Choose EasyPick?</h2>
          <p>Built to make vehicle rental simple, safe, and accessible for everyone</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "#eff6ff" }}>🔍</div>
            <h3>Smart Search</h3>
            <p>Find vehicles by location, type, price, and availability with powerful filters</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "#f0fdf4" }}>✅</div>
            <h3>Verified Vehicles</h3>
            <p>Every vehicle is verified with registration, insurance, and emission certificates</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "#fefce8" }}>🌍</div>
            <h3>Multilingual Translator</h3>
            <p>Break language barriers — communicate with vehicle owners in any language</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "#fdf2f8" }}>📍</div>
            <h3>GPS Tracking</h3>
            <p>Real-time vehicle tracking for enhanced security during your rental period</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "#f5f3ff" }}>📄</div>
            <h3>Digital Contracts</h3>
            <p>Automatically generated rental agreements — no paperwork needed</p>
          </div>
          <div className="feature-card">
            <div className="feature-card-icon" style={{ background: "#ecfdf5" }}>💰</div>
            <h3>Smart Deposits</h3>
            <p>Fair, risk-based deposit calculation depending on vehicle type and duration</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-section" id="how-it-works">
        <div className="features-header">
          <span className="section-badge">How It Works</span>
          <h2>Book a Vehicle in 3 Steps</h2>
        </div>

        <div className="steps-row">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Search & Browse</h3>
            <p>Find the perfect vehicle from our verified listings</p>
          </div>
          <div className="step-connector">→</div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Choose Dates & Pay</h3>
            <p>Pick your rental dates and complete secure payment</p>
          </div>
          <div className="step-connector">→</div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Pick Up & Drive</h3>
            <p>Collect your vehicle and enjoy your journey!</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" id="cta">
        <div className="cta-content">
          <h2>Ready to get started?</h2>
          <p>Join thousands of happy renters and vehicle owners across Sri Lanka</p>
          <div className="cta-actions">
            <Link to="/signup" className="btn-primary btn-large" id="cta-signup">
              Create Free Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="brand-icon">🚗</span>
            <span className="footer-brand-text">EasyPick</span>
          </div>
          <p className="footer-copy">
            © 2024 EasyPick. Vehicle Reservation & Rental Platform — Sri Lanka.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
