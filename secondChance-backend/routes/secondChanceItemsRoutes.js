const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");
const { ObjectId } = require("mongodb");
const multer = require("multer");

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// GET all items
router.get("/api/secondchance/items", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection("items").find().toArray();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch items" });
  }
});

// DELETE item by ID
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const result = await db.collection("items").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

// POST with file upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const db = await connectToDatabase();

    const newItem = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      image: req.file ? req.file.filename : null,
    };

    await db.collection("items").insertOne(newItem);

    res.status(201).json({ message: "Item created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
