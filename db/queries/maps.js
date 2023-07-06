const db = require("../connection");

const getMaps = () => {
  return db.query("SELECT * FROM maps;").then((data) => {
    return data.rows;
  });
};

const addMap = (data) => {
  const queryString = `INSERT INTO maps(user_id, name) VALUES ($1, $2) RETURNING *;`;
  const values = [data.id, data.name];
  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((e) => console.log(e));
};

module.exports = { getMaps, addMap };
