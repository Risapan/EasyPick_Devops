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

-- Create Vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  owner_id INT NOT NULL,
  vehicle_name VARCHAR(150) NOT NULL,
  brand VARCHAR(80) NOT NULL,
  model VARCHAR(80) NOT NULL,
  year INT NOT NULL,
  vehicle_type ENUM('car', 'suv', 'van', 'bus', 'bike', 'three-wheeler', 'truck') DEFAULT 'car',
  fuel_type ENUM('petrol', 'diesel', 'hybrid', 'electric') DEFAULT 'petrol',
  transmission ENUM('manual', 'automatic') DEFAULT 'manual',
  seats INT DEFAULT 5,
  price_per_day DECIMAL(10,2) NOT NULL,
  location VARCHAR(150) DEFAULT NULL,
  description TEXT DEFAULT NULL,
  image_url VARCHAR(500) DEFAULT NULL,
  is_available TINYINT(1) DEFAULT 1,
  is_verified TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE CASCADE
);
