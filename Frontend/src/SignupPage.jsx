import { useState } from "react";
import "./SignupPage.css";
import easyLogo from "./easy.png";
import carlogo from "./car.png";
import personlogo from "./man.png";

function SignupPage() {
  const [role, setRole] = useState("customer");

  return (
    <div className="signup-page">
      <div className="signup-header">
        <img src={easyLogo} alt="EasyPick" className="logo" />
        <h1>EasyPick</h1>
      </div>

      <h2>Create your account</h2>
      <p className="subtitle">Join thousands of happy renters</p>

      <div className="signup-card">
        <p className="label-top">I want to</p>

        <div className="role-selector">

          {/* Customer */}
          <div
            className={`role-card ${role === "customer" ? "active" : ""}`}
            onClick={() => setRole("customer")}
          >
            <div className="role-icon">
              <img src={personlogo} alt="Renter" />
            </div>
            <span>Rent A Vehicle</span>
          </div>

          {/* Owner */}
          <div
            className={`role-card ${role === "owner" ? "active" : ""}`}
            onClick={() => setRole("owner")}
          >
            <div className="role-icon">
              <img src={carlogo} alt="Owner" />
            </div>
            <span>List My Vehicle</span>
          </div>

        </div>

        <form>
          <label>Full name *</label>
          <input type="text" placeholder="Maria Santos" />

          <label>Email address *</label>
          <input type="email" placeholder="you@example.com" />

          <label>Password *</label>
          <input type="password" placeholder="Min. 8 characters" />

          <small>
            Must include uppercase, number, and special character
          </small>

          <button type="submit">
            Create account
          </button>
        </form>

        <div className="terms">
          By signing up you agree to our
          <a href="#"> Terms </a>
          and
          <a href="#"> Privacy Policy</a>
        </div>
      </div>

      <div className="signin-link">
        Already have an account?
        <a href="/login"> Sign in</a>
      </div>
    </div>
  );
}

export default SignupPage;