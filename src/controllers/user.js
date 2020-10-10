const User = require('../models/user').Users
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Sign up and Save a new User

exports.signup = async (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send({ msg: "Please pass username and password." });
  } else {
    try {
      const { name, email, password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      if (!user) {
        return res.status(400).json({
          status: "fail",
          message: "user already exist",
        });
      }
      return res.status(201).json({
        message: "User successfully created!",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "something went wrong",
        data: error,
      });
    }
  }
};

// Sign in an existing User
exports.signin = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ msg: "Please pass username and password." });
  } else {
    const { email, password } = req.body;
    try {
      let user = User.find({
        where: {
          email: email,
        },
      });
      if (!user)
        return res.status(400).json({
          message: "Authentication failed. User not found.",
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Login Credentials!",
        });
      let token = jwt.sign(JSON.parse(JSON.stringify(user)), "ridwan", {
        expiresIn: 86400 * 30,
      });

      return res.status(200).json({
        token: token,
        data: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Server Error",
        data: error,
      });
    }
  }
};
