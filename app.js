import express from "express";
import http from 'http';
import getData from './getData.js';


const app = express();

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.get("/api/v1/distance/:from/:to", (req, res) => {
  const result = getData(req.params.from, req.params.to)
  if (result) {
    res.json(result);
  } else {
    res.send("Station(en) nicht gefunden.")
  }
});

app.use((req, res) => {
  res.status(404).end("404");
});

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, () => {
  console.log(`Server listening to port ${port}`);
});