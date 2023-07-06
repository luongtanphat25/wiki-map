/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
const pointsDB = require("../db/queries/points");

router.get("/:id", (req, res) => {
  console.log(req.params.id);
  pointsDB
    .getPointsByMapID(req.params.id)
    .then((points) => {
      res.json({ points });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const { map_id, title, description, image, long, lat } = req.body;
  const data = { map_id, title, description, image, long, lat };

  pointsDB
    .addPoint(data)
    .then(() => {
      res.send({ message: "point added successfully" });
    })
    .catch((e) => console.log(e));
});

module.exports = router;
