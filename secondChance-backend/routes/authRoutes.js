const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// Register
router.post("/register", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, email, password } = req.body;

    const newUser = { username, email, password };
    await db.collection("users").insertOne(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Update user info
router.put("/update/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { id } = req.params;

    await db.collection("users").updateOne(
      { _id: new require("mongodb").ObjectId(id) },
      { $set: req.body }
    );

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
