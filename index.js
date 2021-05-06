const express = require("express");
var cors = require("cors");
const router = require("./routes");

const db = require("./db/mongoose");

const app = express();

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// app.use(cors());
app.use(cors(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Welcome to Satik API");
});

app.listen(port, () => {
  console.log(`express server is running at http://localhost:${port}`);
});