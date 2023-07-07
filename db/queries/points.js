const { query } = require("express");
const db = require("../connection");

const getPointsByMapID = (mapID) => {
  return db
    .query("SELECT * FROM points WHERE map_id = $1;", [mapID])
    .then((data) => {
      return data.rows;
    });
};

const addPoint = (data) => {
  const values = [
    data.map_id,
    data.title,
    data.description,
    data.image,
    data.long,
    data.lat,
  ];
  return db
    .query(
      `INSERT INTO points(map_id, title, description, image, long, lat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`,
      values
    )
    .then((result) => {
      console.log("point added");
      return result.rows[0];
    })
    .catch((e) => console.log(e.message));
};

const deletePointByMapID = (id) => {
  const queryString = `DELETE FROM points WHERE id = $1`;
  return db
    .query(queryString, [id])
    .then((result) => {
      console.log(result);
      return result.rows;
    })
    .catch((e) => console.log(`Error deletePointByMapID: ${e.message}`));
};

module.exports = { getPointsByMapID, addPoint, deletePointByMapID };
