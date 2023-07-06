const express = require("express");
const router = express.Router();
const mapsDB = require("../db/queries/maps");

router.get("/", (req, res) => {
  mapsDB
    .getMaps()
    .then((maps) => {
      res.json({ maps });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/", (req, res) => {
  const data = { id: req.session.userID, name: req.body.mapName };
  mapsDB
    .addMap(data)
    .then(() => {
      res.send({ message: "success" });
    })
    .catch((err) => console.log(err));
});

router.get("/user/:id", (req, res) => {
  mapsDB
    .getMapByUserID(req.session.userID)
    .then((maps) => {
      res.json({ maps });
    })
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res) => {
  mapsDB
    .deleteMapByMapID(req.params.id)
    .then(() => {
      res.send({ message: "delete successful" });
    })
    .catch((err) => {
      console.log(err);
      res.send({ error: err.message });
    });
});

module.exports = router;
