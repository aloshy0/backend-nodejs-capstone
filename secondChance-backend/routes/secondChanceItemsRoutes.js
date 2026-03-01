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
const { ObjectId } = require("mongodb");

// DELETE item by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    const result = await db.collection("items").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

