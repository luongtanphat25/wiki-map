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

router.get("/", (req, res) => {
  usersDB
    .getUsers()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

//Sign-up
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
            req.session.userID = result.id;
            console.log(req.session.userID);
            res.send({
              user: {
                name: user.name,
                email: user.email,
                id: user.id,
              },
            });
          })
          .catch((err) => console.log(err));
      } else {
        res.send("Email already registered.");
      }
    })
    .catch((e) => res.send(e));
});

//Log-in
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  usersDB
    .getUserByEmail(email)
    .then((user) => {
      if (!bcrypt.compareSync(password, user.password)) {
        console.log("incorrect");
        return res.send({ error: "incorret email/password" });
      }

      req.session.userID = user.id;
      res.send({
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      });
    })
    .catch((e) => res.send({ error: e.message }));
});

//Log-out
router.post("/logout", (req, res) => {
  req.session.userID = null;
  res.send({});
});

//Get current user's info
router.get("/me", (req, res) => {
  const userID = req.session.userID;
  if (!userID) {
    return res.send({ message: "not logged in" });
  }
  usersDB
    .getUserByID(userID)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user found" });
      }

      res.send({
        user: {
          name: user.name,
          email: user.email,
          id: userID,
        },
      });
    })
    .catch((e) => res.send(e));
});

module.exports = router;
