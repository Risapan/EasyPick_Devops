/**
 * Seed Script: Adds 20 Sri Lankan vehicle owners and their vehicles to the database.
 *
 * Usage:  node seed.js
 *
 * This script will:
 *   1. Create the vehicles table if it doesn't exist
 *   2. Insert 20 vehicle owner accounts (password: Owner@123)
 *   3. Insert 20 vehicles linked to those owners
 */

require("dotenv").config();
const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");

const DB_CONFIG = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "easypick",
};

// ─── 20 Sri Lankan Vehicle Owners ────────────────────────────────────────────
const owners = [
  { fullname: "Kamal Perera",          email: "kamal.perera@easypick.lk" },
  { fullname: "Nimal Fernando",        email: "nimal.fernando@easypick.lk" },
  { fullname: "Sunil Jayawardena",     email: "sunil.jayawardena@easypick.lk" },
  { fullname: "Ruwan Silva",           email: "ruwan.silva@easypick.lk" },
  { fullname: "Chaminda Rathnayake",   email: "chaminda.rathnayake@easypick.lk" },
  { fullname: "Amila Bandara",         email: "amila.bandara@easypick.lk" },
  { fullname: "Dilshan Wickramasinghe",email: "dilshan.wickramasinghe@easypick.lk" },
  { fullname: "Saman Kumara",          email: "saman.kumara@easypick.lk" },
  { fullname: "Priyantha De Silva",    email: "priyantha.desilva@easypick.lk" },
  { fullname: "Lakshman Gunasekara",   email: "lakshman.gunasekara@easypick.lk" },
  { fullname: "Nimali Herath",         email: "nimali.herath@easypick.lk" },
  { fullname: "Sanduni Rajapaksa",     email: "sanduni.rajapaksa@easypick.lk" },
  { fullname: "Tharushi Wijesinghe",   email: "tharushi.wijesinghe@easypick.lk" },
  { fullname: "Kasun Dissanayake",     email: "kasun.dissanayake@easypick.lk" },
  { fullname: "Roshan Abeysekera",     email: "roshan.abeysekera@easypick.lk" },
  { fullname: "Manjula Weerasinghe",   email: "manjula.weerasinghe@easypick.lk" },
  { fullname: "Dinesh Samarawickrama", email: "dinesh.samarawickrama@easypick.lk" },
  { fullname: "Ishan Senanayake",      email: "ishan.senanayake@easypick.lk" },
  { fullname: "Nadeesha Kumaratunga",  email: "nadeesha.kumaratunga@easypick.lk" },
  { fullname: "Thisara Mendis",        email: "thisara.mendis@easypick.lk" },
];

// ─── 20 Sri Lankan Vehicles (real brands popular in Sri Lanka) ───────────────
const vehicles = [
  {
    vehicle_name: "Toyota Prius 2020",
    brand: "Toyota",
    model: "Prius",
    year: 2020,
    vehicle_type: "car",
    fuel_type: "hybrid",
    transmission: "automatic",
    seats: 5,
    price_per_day: 8500.00,
    location: "Colombo",
    description: "Fuel-efficient Toyota Prius hybrid. Perfect for city driving and airport transfers in Colombo. Well-maintained with full service history.",
    image_url: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
  },
  {
    vehicle_name: "Suzuki Alto 800",
    brand: "Suzuki",
    model: "Alto 800",
    year: 2022,
    vehicle_type: "car",
    fuel_type: "petrol",
    transmission: "manual",
    seats: 4,
    price_per_day: 4500.00,
    location: "Kandy",
    description: "Budget-friendly Suzuki Alto, ideal for hill country driving around Kandy. Easy to park and excellent mileage on winding roads.",
    image_url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0afa?w=800",
  },
  {
    vehicle_name: "Toyota Land Cruiser Prado",
    brand: "Toyota",
    model: "Land Cruiser Prado",
    year: 2019,
    vehicle_type: "suv",
    fuel_type: "diesel",
    transmission: "automatic",
    seats: 7,
    price_per_day: 18000.00,
    location: "Negombo",
    description: "Powerful Toyota Prado SUV with 4WD. Great for safari trips to Yala or Wilpattu national parks. Spacious and comfortable for long journeys.",
    image_url: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
  },
  {
    vehicle_name: "Honda Vezel 2021",
    brand: "Honda",
    model: "Vezel",
    year: 2021,
    vehicle_type: "suv",
    fuel_type: "hybrid",
    transmission: "automatic",
    seats: 5,
    price_per_day: 9500.00,
    location: "Galle",
    description: "Stylish Honda Vezel hybrid SUV. Comfortable for coastal road trips along the southern expressway from Galle to Colombo.",
    image_url: "https://images.unsplash.com/photo-1568844293986-8d0400f95e1c?w=800",
  },
  {
    vehicle_name: "Toyota KDH Van",
    brand: "Toyota",
    model: "KDH 201",
    year: 2018,
    vehicle_type: "van",
    fuel_type: "diesel",
    transmission: "manual",
    seats: 14,
    price_per_day: 12000.00,
    location: "Colombo",
    description: "Spacious Toyota KDH van for group tours. Perfect for tourist groups exploring cultural triangle sites — Sigiriya, Dambulla, and Polonnaruwa.",
    image_url: "https://images.unsplash.com/photo-1609520778163-a16fb3862581?w=800",
  },
  {
    vehicle_name: "Nissan X-Trail 2020",
    brand: "Nissan",
    model: "X-Trail",
    year: 2020,
    vehicle_type: "suv",
    fuel_type: "hybrid",
    transmission: "automatic",
    seats: 5,
    price_per_day: 11000.00,
    location: "Nuwara Eliya",
    description: "Comfortable Nissan X-Trail for exploring the hill country. Ideal for trips to Horton Plains, tea estates, and waterfalls around Nuwara Eliya.",
    image_url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800",
  },
  {
    vehicle_name: "Bajaj Three Wheeler",
    brand: "Bajaj",
    model: "RE 4S",
    year: 2023,
    vehicle_type: "three-wheeler",
    fuel_type: "petrol",
    transmission: "manual",
    seats: 3,
    price_per_day: 2500.00,
    location: "Hikkaduwa",
    description: "Classic Sri Lankan tuk-tuk experience! Navigate through beach towns and local markets in Hikkaduwa. A must-try for adventurous tourists.",
    image_url: "https://images.unsplash.com/photo-1612810436378-06a53839cddc?w=800",
  },
  {
    vehicle_name: "Toyota Aqua 2021",
    brand: "Toyota",
    model: "Aqua",
    year: 2021,
    vehicle_type: "car",
    fuel_type: "hybrid",
    transmission: "automatic",
    seats: 5,
    price_per_day: 7000.00,
    location: "Matara",
    description: "Economical Toyota Aqua hybrid hatchback. Excellent fuel economy for southern coastal drives. Clean, air-conditioned, and well-maintained.",
    image_url: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
  },
  {
    vehicle_name: "Mitsubishi Montero Sport",
    brand: "Mitsubishi",
    model: "Montero Sport",
    year: 2019,
    vehicle_type: "suv",
    fuel_type: "diesel",
    transmission: "automatic",
    seats: 7,
    price_per_day: 16000.00,
    location: "Anuradhapura",
    description: "Rugged Mitsubishi Montero Sport with 4WD. Perfect for exploring ancient cities and off-road adventures in the north-central dry zone.",
    image_url: "https://images.unsplash.com/photo-1551830820-330a71b99659?w=800",
  },
  {
    vehicle_name: "Honda Fit 2022",
    brand: "Honda",
    model: "Fit",
    year: 2022,
    vehicle_type: "car",
    fuel_type: "hybrid",
    transmission: "automatic",
    seats: 5,
    price_per_day: 7500.00,
    location: "Trincomalee",
    description: "Compact Honda Fit hybrid. Great mileage and easy to drive. Ideal for exploring Trincomalee's beautiful beaches and whale-watching points.",
    image_url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800",
  },
  {
    vehicle_name: "Toyota HiAce Bus",
    brand: "Toyota",
    model: "HiAce Commuter",
    year: 2020,
    vehicle_type: "bus",
    fuel_type: "diesel",
    transmission: "manual",
    seats: 18,
    price_per_day: 15000.00,
    location: "Colombo",
    description: "Toyota HiAce commuter bus for large group tours. Air-conditioned with comfortable seating. Ideal for wedding transport or corporate events.",
    image_url: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=800",
  },
  {
    vehicle_name: "Suzuki Wagon R 2023",
    brand: "Suzuki",
    model: "Wagon R",
    year: 2023,
    vehicle_type: "car",
    fuel_type: "hybrid",
    transmission: "automatic",
    seats: 5,
    price_per_day: 5500.00,
    location: "Kurunegala",
    description: "Popular Suzuki Wagon R hybrid. Sri Lanka's most common car — affordable, reliable, and easy to maintain. Perfect for everyday use.",
    image_url: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800",
  },
  {
    vehicle_name: "Yamaha FZ-S V3",
    brand: "Yamaha",
    model: "FZ-S V3",
    year: 2023,
    vehicle_type: "bike",
    fuel_type: "petrol",
    transmission: "manual",
    seats: 2,
    price_per_day: 3000.00,
    location: "Ella",
    description: "Sporty Yamaha FZ-S motorbike. Experience the thrill of riding through Ella's Nine Arches Bridge route and scenic mountain passes.",
    image_url: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800",
  },
  {
    vehicle_name: "Toyota Corolla 2021",
    brand: "Toyota",
    model: "Corolla Axio",
    year: 2021,
    vehicle_type: "car",
    fuel_type: "hybrid",
    transmission: "automatic",
    seats: 5,
    price_per_day: 8000.00,
    location: "Jaffna",
    description: "Reliable Toyota Corolla Axio. Comfortable sedan for exploring Jaffna's cultural heritage sites, temples, and the beautiful northern coast.",
    image_url: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800",
  },
  {
    vehicle_name: "Hyundai Tucson 2020",
    brand: "Hyundai",
    model: "Tucson",
    year: 2020,
    vehicle_type: "suv",
    fuel_type: "diesel",
    transmission: "automatic",
    seats: 5,
    price_per_day: 13000.00,
    location: "Bentota",
    description: "Spacious Hyundai Tucson SUV. Great for family beach holidays in Bentota. Comfortable ride with premium interior and safety features.",
    image_url: "https://images.unsplash.com/photo-1606611013016-969c19ba27ea?w=800",
  },
  {
    vehicle_name: "Micro Panda 2022",
    brand: "Micro",
    model: "Panda",
    year: 2022,
    vehicle_type: "car",
    fuel_type: "electric",
    transmission: "automatic",
    seats: 4,
    price_per_day: 4000.00,
    location: "Colombo",
    description: "100% electric Micro Panda — Sri Lanka's own EV. Zero emissions, perfect for eco-conscious city driving in Colombo. Charges at home overnight.",
    image_url: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800",
  },
  {
    vehicle_name: "Toyota Hilux Double Cab",
    brand: "Toyota",
    model: "Hilux Revo",
    year: 2021,
    vehicle_type: "truck",
    fuel_type: "diesel",
    transmission: "automatic",
    seats: 5,
    price_per_day: 14000.00,
    location: "Dambulla",
    description: "Tough Toyota Hilux double cab pickup. Perfect for Sigiriya rock fortress trips and off-road safaris to Minneriya elephant gathering.",
    image_url: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=800",
  },
  {
    vehicle_name: "Nissan Leaf 2021",
    brand: "Nissan",
    model: "Leaf",
    year: 2021,
    vehicle_type: "car",
    fuel_type: "electric",
    transmission: "automatic",
    seats: 5,
    price_per_day: 9000.00,
    location: "Colombo",
    description: "Fully electric Nissan Leaf. Premium EV experience with zero fuel costs. Ideal for environmentally-conscious travelers in and around Colombo.",
    image_url: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800",
  },
  {
    vehicle_name: "Toyota Dolphin Van",
    brand: "Toyota",
    model: "Dolphin LH113",
    year: 2017,
    vehicle_type: "van",
    fuel_type: "diesel",
    transmission: "manual",
    seats: 10,
    price_per_day: 10000.00,
    location: "Sigiriya",
    description: "Classic Toyota Dolphin mini-van. The iconic Sri Lankan tour vehicle. Air-conditioned and spacious for cultural triangle sightseeing tours.",
    image_url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800",
  },
  {
    vehicle_name: "Honda CB Hornet 2023",
    brand: "Honda",
    model: "CB Hornet 160R",
    year: 2023,
    vehicle_type: "bike",
    fuel_type: "petrol",
    transmission: "manual",
    seats: 2,
    price_per_day: 3500.00,
    location: "Unawatuna",
    description: "Sporty Honda CB Hornet motorbike. Cruise the southern coastal roads from Unawatuna to Mirissa. Helmets and locks included in the rental.",
    image_url: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800",
  },
];

async function seed() {
  let connection;

  try {
    connection = await mysql.createConnection(DB_CONFIG);
    console.log("✅ Connected to MySQL database");

    // 1. Create vehicles table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS vehicles (
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        owner_id INT NOT NULL,
        vehicle_name VARCHAR(150) NOT NULL,
        brand VARCHAR(80) NOT NULL,
        model VARCHAR(80) NOT NULL,
        year INT NOT NULL,
        vehicle_type ENUM('car','suv','van','bus','bike','three-wheeler','truck') DEFAULT 'car',
        fuel_type ENUM('petrol','diesel','hybrid','electric') DEFAULT 'petrol',
        transmission ENUM('manual','automatic') DEFAULT 'manual',
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
      )
    `);
    console.log("✅ Vehicles table ready");

    // 2. Hash a shared password for all seed owners
    const hashedPassword = await bcrypt.hash("Owner@123", 10);
    console.log("🔐 Password hashed (all owners use: Owner@123)");

    // 3. Insert owners and collect their IDs
    const ownerIds = [];

    for (const owner of owners) {
      // Check if owner already exists
      const [existing] = await connection.execute(
        "SELECT id FROM users WHERE email = ?",
        [owner.email]
      );

      if (existing.length > 0) {
        ownerIds.push(existing[0].id);
        console.log(`   ⏩ Owner "${owner.fullname}" already exists (ID: ${existing[0].id})`);
      } else {
        const [result] = await connection.execute(
          "INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, 'owner')",
          [owner.fullname, owner.email, hashedPassword]
        );
        ownerIds.push(result.insertId);
        console.log(`   ✅ Added owner: ${owner.fullname} (ID: ${result.insertId})`);
      }
    }

    console.log(`\n📋 ${ownerIds.length} owners ready\n`);

    // 4. Insert vehicles linked to owners (1 vehicle per owner)
    let vehiclesAdded = 0;

    for (let i = 0; i < vehicles.length; i++) {
      const v = vehicles[i];
      const ownerId = ownerIds[i];

      // Check if vehicle already exists for this owner
      const [existing] = await connection.execute(
        "SELECT id FROM vehicles WHERE owner_id = ? AND vehicle_name = ?",
        [ownerId, v.vehicle_name]
      );

      if (existing.length > 0) {
        console.log(`   ⏩ Vehicle "${v.vehicle_name}" already exists`);
        continue;
      }

      await connection.execute(
        `INSERT INTO vehicles 
          (owner_id, vehicle_name, brand, model, year, vehicle_type, fuel_type, transmission, seats, price_per_day, location, description, image_url, is_available, is_verified)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, 1)`,
        [
          ownerId,
          v.vehicle_name,
          v.brand,
          v.model,
          v.year,
          v.vehicle_type,
          v.fuel_type,
          v.transmission,
          v.seats,
          v.price_per_day,
          v.location,
          v.description,
          v.image_url,
        ]
      );

      vehiclesAdded++;
      console.log(`   🚗 Added: ${v.vehicle_name} (${v.location}) — Rs. ${v.price_per_day}/day — Owner: ${owners[i].fullname}`);
    }

    console.log(`\n═══════════════════════════════════════════`);
    console.log(`  ✅ Seeding complete!`);
    console.log(`  👤 Owners:   ${ownerIds.length}`);
    console.log(`  🚗 Vehicles: ${vehiclesAdded} added`);
    console.log(`  🔑 Login:    any owner email + password "Owner@123"`);
    console.log(`═══════════════════════════════════════════\n`);

  } catch (err) {
    console.error("❌ Seed error:", err.message);
  } finally {
    if (connection) await connection.end();
    process.exit(0);
  }
}

seed();
