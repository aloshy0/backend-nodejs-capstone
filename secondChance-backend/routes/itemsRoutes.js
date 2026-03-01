const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");
const { ObjectId } = require("mongodb");

// SEED items
router.get("/seed", async (req, res) => {
  try {
    const db = await connectToDatabase();

    await db.collection("items").deleteMany({});

    const result = await db.collection("items").insertMany([
      { title: "Laptop", description: "Gaming laptop in good condition" },
      { title: "iPhone", description: "Used iPhone 13 with excellent battery" },
      { title: "Headphones", description: "Noise cancelling headphones" }
    ]);

    res.json({ inserted: result.insertedCount });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET all items
router.get("/", async (req, res) => {
  const db = await connectToDatabase();
  const items = await db.collection("items").find().toArray();
  res.json(items);
});

// GET item by ID
router.get("/:id", async (req, res) => {
  const db = await connectToDatabase();
  const item = await db.collection("items").findOne({
    _id: new ObjectId(req.params.id)
  });
  res.json(item);
});

module.exports = router;
