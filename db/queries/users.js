const db = require("../connection");

const getUsers = () => {
  return db.query("SELECT * FROM users;").then((data) => {
    return data.rows;
  });
};

const addUser = (user) => {
  const queryString = `INSERT INTO users(name, email, password) VALUES ($1, $2, $3) RETURNING *;`;
  const values = [user.name, user.email, user.password];
  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

const getUserByEmail = (email) => {
  return db
    .query(`SELECT * FROM users WHERE email = $1`, [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => console.log(err));
};

module.exports = { getUsers, addUser, getUserByEmail };
