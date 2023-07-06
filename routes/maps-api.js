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
  console.log(data);
  mapsDB
    .addMap(data)
    .then(() => {
      res.send({ message: "success" });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
