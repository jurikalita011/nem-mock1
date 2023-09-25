const express = require("express");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

userRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 6, async (err, hash) => {
      if (err) {
        res
          .status(201)
          .send({ msg: "unable to sign up new user", err: err.message });
      } else {
        const user = await UserModel.create({ ...req.body, password: hash });
        res.status(200).send({ msg: "new user has been created", user: user });
      }
    });
  } catch (error) {
    res
      .status(500)
      .send({ msg: "unable to create new user", error: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          res.send({ msg: "Wrong credentials" });
        } else {
          let token = jwt.sign(
            {
              userId: user[0]._id,
            },
            "secret03"
          );
          res
            .status(200)
            .send({ msg: "user logged in successfully", token: token });
        }
      });
    } else {
      res.status(400).send({ msg: "user not found" });
    }
  } catch (error) {
    res.status(500).send({ msg: "Invalid credentials", error: error.message });
  }
});
/*
{
    "email":"first@gmail.com",
     "password":"first"
}
*/
module.exports = userRoute;
