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

const getMapByUserID = (id) => {
  const queryString = `SELECT * FROM maps WHERE user_id = $1`;
  return db
    .query(queryString, [id])
    .then((result) => {
      return result.rows;
    })
    .catch((e) => console.log(`Error getMapByUserID: ${e.message}`));
};

const getUserIDByMapID = (mapID) => {
  return db.query(`SELECT user_id FROM maps WHERE id = $1`, [mapID]).then((result) => {
    return result.rows[0];
  });
};

const deleteMapByMapID = (id) => {
  const queryString = `DELETE FROM maps WHERE id = $1`;
  return db
    .query(queryString, [id])
    .then((result) => {
      console.log(result);
      return result.rows;
    })
    .catch((e) => console.log(`Error deleteMapByMapID: ${e.message}`));
};

module.exports = { getMaps, addMap, getMapByUserID, deleteMapByMapID, getUserIDByMapID };
