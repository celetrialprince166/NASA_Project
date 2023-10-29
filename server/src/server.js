const https = require("https");
const fs = require("fs");
require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

const { loadPlanetData } = require("./model/planets.model");
const { loadLaunchData } = require("./model/launches.model");

const server = https.createServer(
  {
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem"),
  },
  app
);

mongoose.connection.once("open", () => {
  console.log("MongoDB Connection Ready!");
});

mongoose.connection.on("error", () => {
  console.error("An Erron occured While connecting to the DB");
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await loadLaunchData();
  await loadPlanetData();

  server.listen(PORT, async () => {
    console.log(`Listening On ${PORT}`);
  });
}

startServer();
