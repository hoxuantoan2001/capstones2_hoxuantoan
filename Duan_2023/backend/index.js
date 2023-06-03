const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { default: mongoose } = require("mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
// var sql = require("mssql");
const port = 5000;
app.use(morgan("common"));
dotenv.config();

require("./models/index.js");
const authorRoute = require("./routes/user");
require("./database/mongodb");
//process.env.MONGODB_URL
// mongoose
//   .connect(process.env.MONGODB_URL)
//   .then(() => {
//     console.log("connect DB");
//   })
//   .catch(() => {
//     console.log("error");
//   });

app.use("", authorRoute);
app.get("/img/:id", function (req, res) {
  const file = __dirname + "/uploads/" + req.params.id;

  res.sendFile(__dirname + "/uploads/" + req.params.id);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
