-- Create Database if not exists
CREATE DATABASE IF NOT EXISTS easypick;

USE easypick;

-- Create Users table (matching current database structure)
CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fullname VARCHAR(100) DEFAULT NULL,
  email VARCHAR(100) DEFAULT NULL UNIQUE,
  password VARCHAR(255) DEFAULT NULL,
  role ENUM('customer', 'owner') DEFAULT 'customer',
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);
