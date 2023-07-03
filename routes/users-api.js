/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const usersDB = require("../db/queries/users");
const bcrypt = require("bcryptjs");
const userQueries = require("../db/queries/users");

router.get("/", (req, res) => {
  userQueries
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const user = req.body;
  user.password = bcrypt.hashSync(user.password, 12);
  usersDB
    .getUserByEmail(user.email)
    .then((registerdEmail) => {
      if (!registerdEmail) {
        usersDB
          .addUser(user)
          .then((result) => {
            res.send("User created.");
          })
          .catch((err) => console.log(err));
      } else {
        res.send("Email already registered.");
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
