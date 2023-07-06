// load .env data into process.env
require("dotenv").config();

// Web server config
const usersDB = require("./db/queries/users");
const mapsDB = require("./db/queries/maps");

const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const cookieSession = require("cookie-session");

const PORT = process.env.PORT || 8080;
const app = express();

app.set("view engine", "ejs");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key1"],
  })
);

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require("./routes/users-api");
const mapApiROutes = require("./routes/maps-api");
const pointApiRoutes = require("./routes/points-api");
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use("/api/users", userApiRoutes);
app.use("/api/maps", mapApiROutes);
app.use("/api/points", pointApiRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/points/:id", (req, res) => {
  const tempVars = { id: req.params.id };

  res.render("mapView", tempVars);
});

app.get("/my-map", (req, res) => {
  res.render("myMap");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
