/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const userQueries = require('../db/queries/users');

router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.post('/sigin' ,(req, res) => {
  const { name, email, password } = req.body;
  const hashedPasword = bcrypt.hashSync(password, 30);

  const queryString = `SELECT email FROM users WHERE email = $1`;
  const findEmailInDB = db.query(queryString, [email]).then(result => {
    return result.rows;
  }).catch(err => console.log(err.message));

  if (findEmailInDB.length > 0) {
    console.log('Email already registed.');
    return;
  }

  const insertQuery = `INSERT INTO users(name, email, password) VALUES ($1, $2, $3); RETURNING *;`;

  return db.query(insertQuery, [name, email, hashedPasword]).then(result => {
    console.log(result);
    return result.rows;
  }).catch(err => console.log(err.message));
});

module.exports = router;
