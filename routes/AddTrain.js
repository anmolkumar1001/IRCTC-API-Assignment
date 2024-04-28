const express = require("express");
const router = express.Router();
const { query } = require("../db/Connection");
const AuthenticateToken = require("../middleware/AuthenticateToken");
const AuthenticateAdminAPI = require("../middleware/AuthenticateAdminAPI");

router.post("", AuthenticateToken, AuthenticateAdminAPI, async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;

  const result = await query(
    "INSERT INTO trains (name, source, destination, total_seats) VALUES (?, ?, ?, ?)",
    [name, source, destination, totalSeats]
  );
  console.log(result);
  res.status(200).json({
    status: "Train added successfully",
    status_code: 200,
  });
});

module.exports = router;
