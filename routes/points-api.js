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

module.exports = router;
