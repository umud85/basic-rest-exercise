import {fileURLToPath} from "url";
import path, {dirname} from "path";
import fs from "fs";
import {parse} from "csv-parse/sync";
import getDistance from "./getDistance.js";
import binaryIndexOf from "./binaryIndexOf.js";
import express from "express";
import http from 'http';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, "data.csv");

const input = fs.readFileSync(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    return data;
  }
});

const records = parse(input, {
  delimiter: ";",
  columns: true,
  skip_empty_lines: true,
});

const filteredRecords = records.filter((el) => el.Verkehr === "FV");
const sortedRecords = filteredRecords.sort((a, b) => {
  if (a["DS100"] < b["DS100"]) {
    return -1;
  } else {
    return 1;
  }
});

// console.log(sortedRecords.map((el) => el["DS100"]));
function getData(departureString, destinationString) {
  const searchProp = "DS100";
  // get Index of departure station
  const depIndex = binaryIndexOf(sortedRecords, departureString, searchProp);
  if (depIndex === -1) return "Station(en) nicht gefunden";

  //getIndex of destination station
  const destIndex = binaryIndexOf(sortedRecords, destinationString, searchProp);
  if (destIndex === -1) return "Statione(en) nicht gefunden";

  const fromLongitude = sortedRecords[depIndex]["Laenge"].replace(",", ".");
  const fromLatitude = sortedRecords[depIndex]["Breite"].replace(",", ".");
  const toLongitude = sortedRecords[destIndex]["Laenge"].replace(",", ".");
  const toLatitude = sortedRecords[destIndex]["Breite"].replace(",", ".");
  const from = sortedRecords[depIndex]["NAME"];
  const to = sortedRecords[destIndex]["NAME"];
  const distance = getDistance(
    fromLongitude,
    fromLatitude,
    toLongitude,
    toLatitude
  );
  const unit = "km";

  const result = {
    from,
    to,
    distance,
    unit,
  };
  return result;
}

const app = express();

app.get("/", (req, res) => {
  res.end("Homepage");
});

app.get("/api/v1/distance/:from/:to", (req, res) => {
  const result = getData(req.params.from, req.params.to)
  res.json(result);
});

app.use((req, res) => {
  res.status(404).end("404");
});

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, () => {
  console.log(`Server listening to port ${port}`);
});