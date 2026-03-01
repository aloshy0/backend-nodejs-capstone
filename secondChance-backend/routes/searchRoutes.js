const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { q } = req.query;

    const filter = q
      ? { title: { $regex: q, $options: "i" } }
      : {};

    const results = await db.collection("items").find(filter).toArray();
    res.json(results);

  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

module.exports = router;
