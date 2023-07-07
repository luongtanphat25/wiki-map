const db = require("../connection");

const getFavMapsByUserID = (id) => {
  const quey = `SELECT maps.*
  FROM maps
  JOIN FavoriteMapping ON maps.id = FavoriteMapping.map_id
  JOIN users ON users.id = FavoriteMapping.user_id
  WHERE users.id= $1;`;
  return db.query(quey, [id]).then((data) => {
    return data.rows;
  });
};

const addFavMap = (data) => {
  const queryString = `INSERT INTO FavoriteMapping(user_id, map_id) VALUES ($1, $2) RETURNING *;`;
  const values = [data.user_id, data.map_id];
  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((e) => console.log(e));
};

const deleteFavMap = (data) => {
  const queryString = `DELETE FROM FavoriteMapping WHERE user_id = $1;`;
  const values = [data.user_id];
  return db
    .query(queryString, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((e) => console.log(e));
}
module.exports = { getFavMapsByUserID , addFavMap , deleteFavMap};
