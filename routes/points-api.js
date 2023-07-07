/* eslint-disable camelcase */
const express = require("express");
const router = express.Router();
const pointsDB = require("../db/queries/points");

router.get("/:id", (req, res) => {
  pointsDB
    .getPointsByMapID(req.params.id)
    .then((points) => {
      res.json({ points });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/point/:id", (req, res) => {
  pointsDB.getPointByID(req.params.id).then((point) => {
    res.json({ point });
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

router.post("/:id", (req, res) => {
  const { id, title, description, image, long, lat } = req.body;
  const data = { title, description, image, long, lat, id };
  pointsDB
    .updatePointByID(data)
    .then(() => {
      res.send({ message: "updated" });
    })
    .catch((e) => console.log(e));
});

router.delete("/:id", (req, res) => {
  pointsDB
    .deletePointByMapID(req.params.id)
    .then(() => {
      res.send({ message: "delete successful" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

module.exports = router;
