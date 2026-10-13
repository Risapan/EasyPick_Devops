require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS for frontend requests
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", "http://localhost:8000", "http://127.0.0.1:5173"],
  credentials: true,
}));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware in dev
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Authentication routes
app.use("/api/auth", authRoutes);

// Health check / root
app.get("/", (req, res) => {
  res.send("EasyPick Backend is Running");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "EasyPick Backend API is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 EasyPick Backend server running on http://localhost:${PORT}`);
});