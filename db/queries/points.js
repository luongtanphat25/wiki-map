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

const getPointByID = (id) => {
  return db.query("SELECT * FROM points WHERE id = $1;", [id]).then((data) => {
    return data.rows[0];
  });
};

const updatePointByID = (data) => {
  const values = [
    data.title,
    data.description,
    data.image,
    data.long,
    data.lat,
    data.id,
  ];
  return db
    .query(
      `UPDATE points SET title = $1, description = $2, image = $3, long = $4, lat = $5 WHERE id = $6;`,
      values
    )
    .then((result) => {
      console.log("point updated result: ", result);
      return result.rows[0];
    })
    .catch((e) => console.log(e.message));
};

module.exports = {
  getPointsByMapID,
  addPoint,
  deletePointByMapID,
  getPointByID,
  updatePointByID,
};
