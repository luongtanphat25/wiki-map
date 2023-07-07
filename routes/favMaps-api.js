const express = require("express");
const router = express.Router();
const favMapsDB = require("../db/queries/favMaps");

router.get("/:id", (req, res) => {
  // favMapsDB
  //   .getFavMapsByUserID(req.params)
  //   .then((maps) => {
  //     res.json({ maps });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });
});

router.get("/favMap/:user_id/:map_id", (req, res) => {
  const data = { user_id: req.params.user_id, map_id: req.params.map_id };
  console.log(data);
  favMapsDB
    .getFavMapByUserAndMap(data)
    .then((favMap) => {
      res.json({favMap});
    })
    .catch((e) => console.log(e));
});

router.post("/", (req, res) => {
  const data = req.body;
  favMapsDB
    .addFavMap(data)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/", (req, res) => {
  favMapsDB
    .deleteFavMap(req.body)
    .then((result) => {
      res.send({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
