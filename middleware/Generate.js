import crypto from "crypto";

// Function to generate a random string of specified length
const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

// Generate a random string for ACCESS_TOKEN_SECRET
const accessTokenSecret = generateRandomString(32);

// Generate a random string for API_KEY
const apiKey = generateRandomString(32);

console.log(`ACCESS_TOKEN_SECRET=${accessTokenSecret}`);
console.log(`API_KEY=${apiKey}`);
