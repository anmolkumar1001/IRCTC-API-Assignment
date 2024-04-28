const express = require("express");
const router = express.Router();
const { query } = require("../db/Connection");
const AuthenticateToken = require("../middleware/AuthenticateToken");

router.post("", AuthenticateToken, async (req, res) => {
  const { trainId, seats } = req.body;
  // Extracting userId from the authenticated user in the request
  const userId = req.user.userId;

  try {
    // Start a database transaction
    await query("START TRANSACTION");
    const result = await query(
      "SELECT total_seats FROM trains WHERE id = ? FOR UPDATE",
      [trainId]
    );

    // If the train is not found, rollback the transaction and return a 404 response
    if (result.length === 0) {
      await query("ROLLBACK");
      return res
        .status(404)
        .json({ status: "Train not found", status_code: 404 });
    }

    // Check if there are enough available seats for booking
    const availableSeats = result[0].total_seats;
    if (availableSeats < seats) {
      await query("ROLLBACK");
      return res
        .status(400)
        .json({ status: "Not enough seats available", status_code: 400 });
    }
    await query(
      "UPDATE trains SET total_seats = total_seats - ? WHERE id = ?",
      [seats, trainId]
    );
    await query(
      "INSERT INTO bookings (user_id, train_id, seats_booked) VALUES (?, ?, ?)",
      [userId, trainId, seats]
    );

    await query("COMMIT");
    res
      .status(200)
      .json({ status: "Seat booked successfully", status_code: 200 });
  } catch (err) {
    await query("ROLLBACK");
    console.error(err);
    res.status(500).json({ status: "Internal Server Error", status_code: 500 });
  }
});

module.exports = router;
