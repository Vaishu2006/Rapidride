-- Users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rides table
CREATE TABLE rides (
    ride_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    source VARCHAR(255),
    destination VARCHAR(255),
    passengers INT,
    driver_name VARCHAR(100),
    driver_phone VARCHAR(20),
    driver_gender VARCHAR(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments table
CREATE TABLE payments (
    payment_id SERIAL PRIMARY KEY,
    ride_id INT REFERENCES rides(ride_id),
    amount DECIMAL(10,2),
    payment_method VARCHAR(50),
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
