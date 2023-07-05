const express = require("express");
const router = express.Router();
const mapsDB = require("../db/queries/maps");
const bcrypt = require("bcryptjs");

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

module.exports = router;
