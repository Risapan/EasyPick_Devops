const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "easypick",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection and auto-initialize tables
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed!");
    console.error(`   Error Code: ${err.code} (${err.message})`);
    console.error("👉 Please verify your DB_HOST, DB_USER, DB_PASSWORD, and DB_NAME in Backend/.env");
    return;
  }

  console.log(`✅ MySQL Connected successfully to database "${process.env.DB_NAME || "easypick"}"`);

  // Ensure users table exists
  const createTableSql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  connection.query(createTableSql, (tableErr) => {
    if (tableErr) {
      console.error("❌ Error ensuring users table exists:", tableErr.message);
    } else {
      console.log("✅ 'users' table is ready in MySQL.");

      // Check if 'role' column exists in case an older table was created without it
      const checkRoleColSql = `
        SELECT COLUMN_NAME 
        FROM INFORMATION_SCHEMA.COLUMNS 
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role';
      `;
      connection.query(
        checkRoleColSql,
        [process.env.DB_NAME || "easypick"],
        (colErr, rows) => {
          if (!colErr && rows && rows.length === 0) {
            connection.query(
              "ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'customer'",
              (alterErr) => {
                if (alterErr) {
                  console.warn("⚠️ Could not add role column:", alterErr.message);
                } else {
                  console.log("✅ Added missing 'role' column to users table.");
                }
              }
            );
          }
        }
      );
    }

    // Release connection back to pool
    connection.release();
  });
});

module.exports = pool;