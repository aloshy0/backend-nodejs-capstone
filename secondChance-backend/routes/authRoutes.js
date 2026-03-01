const express = require("express");
const router = express.Router();
const { connectToDatabase } = require("../models/db");

// Register (Task 14)
router.post("/register", async (req, res) => {
  const db = await connectToDatabase();
  await db.collection("users").insertOne(req.body);
  res.json({ message: "User registered successfully" });
});

// Login (Task 15)
router.post("/login", async (req, res) => {
  const db = await connectToDatabase();
  const user = await db.collection("users").findOne({
    email: req.body.email,
    password: req.body.password
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", username: user.name });
});

module.exports = router;
