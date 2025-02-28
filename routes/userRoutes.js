const express = require("express");
const User = require("../models/User");
const logger = require("../logger"); // Update this line

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    logger.info(`User created: ${user}`);
    res.status(201).send(user);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    logger.info("Fetched all users");
    res.status(200).send(users);
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(500).send(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      logger.warn(`User not found with id: ${req.params.id}`);
      return res.status(404).send();
    }
    logger.info(`User updated: ${user}`);
    res.status(200).send(user);
  } catch (error) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(400).send(error);
  }
});

module.exports = router;
