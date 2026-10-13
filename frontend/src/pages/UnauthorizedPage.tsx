import { Link } from "react-router-dom";

function UnauthorizedPage() {
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Inter', sans-serif",
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      <div style={{ fontSize: "64px", marginBottom: "16px" }}>🚫</div>
      <h1
        style={{
          fontSize: "32px",
          fontWeight: 700,
          color: "#111827",
          marginBottom: "10px",
        }}
      >
        Access Denied
      </h1>
      <p
        style={{
          fontSize: "16px",
          color: "#6b7280",
          maxWidth: "400px",
          marginBottom: "28px",
          lineHeight: 1.6,
        }}
      >
        You don't have permission to access this page. Please contact support if
        you believe this is an error.
      </p>
      <Link
        to="/dashboard"
        style={{
          padding: "12px 28px",
          fontSize: "15px",
          fontWeight: 600,
          color: "white",
          background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
          borderRadius: "10px",
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default UnauthorizedPage;
