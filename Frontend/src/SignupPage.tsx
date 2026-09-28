import { useState, type FormEvent } from "react";
import axios from "axios";
import "./SignupPage.css";

import easyLogo from "./easy.png";
import carlogo from "./car.png";
import personlogo from "./man.png";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback(null);
    setIsSubmitting(true);

    try {
      // Direct call to port 8000 or relative /api if Vite proxy is used
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8000";
      const res = await axios.post(
        `${apiUrl}/api/auth/register`,
        {
          name: name.trim(),
          fullname: name.trim(),
          email: email.trim(),
          password,
          role,
        }
      );

      setFeedback({
        type: "success",
        text: res.data.message || "Account created successfully! Saved to MySQL.",
      });

      // Clear form inputs
      setName("");
      setEmail("");
      setPassword("");
      setRole("customer");
    } catch (error: any) {
      console.error("Registration error:", error);
      const serverMessage = error.response?.data?.message;
      const errorText =
        serverMessage ||
        (error.message === "Network Error"
          ? "Cannot connect to backend server. Make sure the backend is running on http://localhost:8000."
          : "Registration failed. Please try again.");

      setFeedback({
        type: "error",
        text: errorText,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">
        <img src={easyLogo} alt="EasyPick" className="logo" />
        <h1>EasyPick</h1>
      </div>

      <h2>Create your account</h2>
      <p className="subtitle">
        Join thousands of happy renters
      </p>

      <div className="signup-card">
        <p className="label-top">I want to</p>

        <div className="role-selector">
          <div
            className={`role-card ${
              role === "customer" ? "active" : ""
            }`}
            onClick={() => setRole("customer")}
          >
            <div className="role-icon">
              <img src={personlogo} alt="Customer" />
            </div>
            <span>Rent A Vehicle</span>
          </div>

          <div
            className={`role-card ${
              role === "owner" ? "active" : ""
            }`}
            onClick={() => setRole("owner")}
          >
            <div className="role-icon">
              <img src={carlogo} alt="Owner" />
            </div>
            <span>List My Vehicle</span>
          </div>
        </div>

        {feedback && (
          <div className={`alert-box alert-${feedback.type}`}>
            {feedback.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>Full Name *</label>
          <input
            type="text"
            placeholder="Maria Santos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={isSubmitting}
          />

          <label>Email Address *</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />

          <label>Password *</label>
          <input
            type="password"
            placeholder="Min. 6 characters"
            value={password}
            minLength={6}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
          />

          <small>
            Must include uppercase, number, and special character
          </small>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating Account..." : "Create Account"}
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