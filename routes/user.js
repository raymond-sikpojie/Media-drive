const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

// create new user
router.post("/", async (req, res) => {
  let { name, userName, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).send("Please fill in all required fields");
    } else if (!userName) {
      userName = name;
    }

    // check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send({ msg: "User already exits" });
    }

    // Hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create a user
    user = new User({ name, userName, email, password: encryptedPassword });

    await user.save();

    res.status(200).send({ msg: "New user created!", user });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).send("Insert email and password");
    }

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send("Invalid Credentials");
    }

    // check password
    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(400).send("Invalid Credentials");
    }

    // Create token
    const token = await jwt.sign({ id: user.id }, process.env.tokenSecretKey, {
      expiresIn: "24h",
    });

    res.status(200).send({ msg: "User logged in", user, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// find all users
router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(400).send({ msg: "No users available" });
    }
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
