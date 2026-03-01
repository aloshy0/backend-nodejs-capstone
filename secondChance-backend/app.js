const express = require("express");
const cors = require("cors");
const path = require("path");

const itemsRoutes = require("./routes/itemsRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/search", require("./routes/searchRoutes"));

// 👇 THIS IS CRITICAL
app.use(express.static(path.join(__dirname, "public")));

// API routes
app.use("/api/items", itemsRoutes);
app.use("/api/auth", authRoutes);

// 👇 THIS IS CRITICAL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
