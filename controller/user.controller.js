const jwt = require("jsonwebtoken");
const User = require("../models/user.models");
// const user = require("../services/user.service");

const signup = async (req, res) => {
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(404).json({ message: "User already registered" });
    } else if (!validateEmail(req.body.email)) {
      return res.status(404).json({ message: "Please enter valid email" });
    } else {
      User.create(req.body)
        .then((data) => {
          res.status(201).json({ message: "Created", data });
        })
        .catch((e) => res.status(500).json({ error: e }));
    }
  });
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const filter = { email: email };
  User.find(filter).then((result) => {
    if (result.length == 0) {
      return res
        .status(404)
        .json({ status: "error", message: "Incorrect email" });
    } else {
      const user = result[0];
      const user_data = {
        user_id: result[0]._id,
      };
      if (email !== user.email) {
        return res.status(404).json({ message: "Incorrect email" });
      }
      if (password !== user.password) {
        return res.status(404).json({ message: "Incorrect password" });
      }

      let accessToken = jwt.sign({ user_data }, "access-key-secrete", {
        expiresIn: "2d",
      });
      // let refreshToken = jwt.sign({ user }, "refresh-key-secrete", {
      //   expiresIn: "7d",
      // });

      const update = {
        access_token: accessToken,
        //refresh_token: refreshToken,
      };

      User.findOneAndUpdate(filter, update, { new: true }).then((result) => {});

      const tokens = {
        accessToken,
        // refreshToken,
      };
      return res.status(200).json({
        status: "success",
        data: tokens,
        message: "Logged in successfully",
      });
    }
  });
};

const logout = async (req, res) => {
  const user_id = req.user.user_data.user_id;
  const email = req.body.email;
  const filter = { _id: user_id };
  User.find(filter).then((result) => {
    const user = result[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const update = {
      access_token: "",
      // refresh_token: "",
    };
    User.findOneAndUpdate(filter, update, { new: true }).then((result) => {});

    return res.status(200).json({ message: "User logged out successfully" });
  });
};

function getByUserId(req, res) {
  let user_id = req.user.user_data.user_id;
  User.findById(user_id).then((data) => {
    res.status(200).json({ status: "success", data: data });
  });
}

module.exports = {
  signup,
  login,
  logout,
  getByUserId,
};