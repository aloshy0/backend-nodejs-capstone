const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// Example GET route
router.get("/api/secondchance/items", async (req, res) => {
  try {
    const db = await connectToDatabase();   // 👈 THIS is what Task 4 wants
    const items = await db.collection("items").find().toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

module.exports = router;