const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const habitablePlanet = [];
function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanetData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data);
        }
      })
      .on("error", (error) => {
        console.log(error);
        reject(error);
      })
      .on("end", () => {
        console.log(
          habitablePlanet.map((planet) => {
            return planet["kepler_name"];
          })
        );
        console.log(`${habitablePlanet.length} planets were found`);
        resolve(); // when done with the stream
      });
  });
}

// Create parser

module.exports = {
  loadPlanetData,
  planets: habitablePlanet,
};
