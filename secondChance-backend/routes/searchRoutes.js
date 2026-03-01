const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// Search by category
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { category } = req.query;

    const filter = category ? { category } : {};

    const results = await db.collection("items").find(filter).toArray();
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;