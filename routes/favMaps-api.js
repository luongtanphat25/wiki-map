const express = require("express");
const router = express.Router();
const favMapsDB = require("../db/queries/favMaps");

router.get("/:id", (req, res) => {
  favMapsDB
    .getFavMapsByUserID(req.params)
    .then((maps) => {
      res.json({ maps });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.get("/favMap/", (req, res) => {
  console.log(req);
  favMapsDB
    .getFavMapsByUserID(req.body)
    .then((favMap) => {
      console.log(favMap);
      res.json(favMap);
    })
    .catch((e) => console.log(e));
});

router.post("/", (req, res) => {
  const data = req.body;
  favMapsDB
    .addFavMap(data)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  favMapsDB
    .deleteFavMap(req.params)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
