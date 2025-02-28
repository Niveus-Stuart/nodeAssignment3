const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("./logger");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose
  .connect("mongodb://localhost:27017/userDB")
  .then(() => logger.info("Connected to MongoDB"))
  .catch((err) => logger.error("Failed to connect to MongoDB", err));

app.use("/api/users", userRoutes);

const server = app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

module.exports = server;
