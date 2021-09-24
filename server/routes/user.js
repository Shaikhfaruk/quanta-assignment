const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const { requireLogin } = require("../middleware/auth");

//register user

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashed_password = await bcrypt.hash(password, 10);
    user = new User({
      name: name,
      email: email,
      password: hashed_password,
    });
    await user.save();
    return res.status(201).json({ message: "User created sucessfully" });
  } catch (error) {
    console.log(error.message);
  }
});

//Login router

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({ token });
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/", requireLogin, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(".password");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
