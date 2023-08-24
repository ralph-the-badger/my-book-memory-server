// import User from "../models/User.js";
// import express from "express";
// // import {
// //   getAllUsers,
// //   postCreateUser,
// // } from "../../controllers/userControllers.js";

// export const userRouter = express.Router();

// // get all users
// userRouter.get("/users", async (req, res) => {
//   res.send("Bubu, Bubu2, Bubu3");
// });

// // create user
// userRouter.post("/user", async (req, res) => {
//   let user = await new User({
//     name: req.body.name,
//     password: req.body.password,
//   });
//   try {
//     user = await user.save();
//   } catch (e) {
//     console.log(e);
//   }
// });

const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.get("/users", userControllers.getAllUsers);
router.get("/user/:id", userControllers.getUserById);
router.post("/users", userControllers.postCreateUser);

module.exports = router;
