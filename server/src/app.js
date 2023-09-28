const express = require("express");
const path = require("path");
const morgan = require("morgan");

const planetRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");

const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
); // allow cross origin requests from any domain (for testing only)

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(planetRouter);
app.use(launchesRouter);
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
