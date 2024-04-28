const express = require("express");
const router = express.Router();
const { query } = require("../db/Connection");
const bcrypt = require("bcrypt");

router.post("", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(10);
    // Hash the password with gen. salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Default role if not provided
    const defaultRole = "user";

    // Insert user data
    const result = await query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, role || defaultRole]
    );
    res.status(200).json({
      status: "Account created successfully",
      status_code: 200,
      user_id: result.InsertId,
    });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already registered" });
    }

    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
