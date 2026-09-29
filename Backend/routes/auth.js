const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require("../config/db");

router.post("/register", async (req, res) => {
  const { name, fullname, email, password, role } = req.body;
  const displayName = (fullname || name || "").trim();


  if (!displayName) {
    return res.status(400).json({
      success: false,
      message: "Full name is required.",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      success: false,
      message: "Email address is required.",
    });
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email address.",
    });
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters long.",
    });
  }

  const cleanEmail = email.trim().toLowerCase();
  const userRole = role === "owner" ? "owner" : "customer";

  try {
    const checkSql = "SELECT id, email FROM users WHERE email = ?";
    db.query(checkSql, [cleanEmail], async (checkErr, results) => {
      if (checkErr) {
        console.error("Database query error:", checkErr);
        return res.status(500).json({
          success: false,
          message: "Database error occurred while checking existing user.",
          error: checkErr.message,
        });
      }

      if (results && results.length > 0) {
        return res.status(409).json({
          success: false,
          message: "An account with this email address already exists. Please sign in or use another email.",
        });
      }

      try {
        // 3. Hash password with bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // 4. Insert into database using the 'fullname' column
        const insertSql =
          "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)";

        db.query(
          insertSql,
          [displayName, cleanEmail, hashedPassword, userRole],
          (insertErr, result) => {
            if (insertErr) {
              console.error("Database insert error:", insertErr);
              return res.status(500).json({
                success: false,
                message: "Failed to save profile to database.",
                error: insertErr.message,
              });
            }

            console.log(`✅ Registered user ID ${result.insertId} (${cleanEmail}) as ${userRole}`);

            return res.status(201).json({
              success: true,
              message: "Account created successfully! Your profile has been saved to MySQL.",
              user: {
                id: result.insertId,
                fullname: displayName,
                name: displayName,
                email: cleanEmail,
                role: userRole,
              },
            });
          }
        );
      } catch (hashErr) {
        console.error("Password hashing error:", hashErr);
        return res.status(500).json({
          success: false,
          message: "Error processing password security.",
        });
      }
    });
  } catch (error) {
    console.error("Unexpected error in /register:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
});

// GET /api/auth/users - Retrieve registered users (for verification, omitting password)
router.get("/users", (req, res) => {
  const sql = "SELECT id, fullname, fullname AS name, email, role, created_at FROM users ORDER BY created_at DESC";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve users from database",
        error: err.message,
      });
    }
    res.json({
      success: true,
      count: results.length,
      users: results,
    });
  });
});

module.exports = router;