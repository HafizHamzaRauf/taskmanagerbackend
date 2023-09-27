const express = require("express");
const db = require("./helper/db.js");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth.js");
const boardRoutes = require("./routes/board.js");
const app = express();

const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use(authRoutes);
app.use(boardRoutes);

app.use("/", (req, res, next) => {
  return res.status(210).json({ message: "app is running" });
});

const startServer = async () => {
  try {
    // Move the app.listen inside the makeConnection callback
    await app.listen(process.env.PORT || 4000);

    await db.makeConnection();
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

startServer();
