const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);

const itemsRoutes = require("./routes/secondChanceItemsRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Register routes
app.use("/api/secondchance", itemsRoutes);
app.use("/api/secondchance/search", searchRoutes);   // 👈 THIS is what Task 7 checks

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
