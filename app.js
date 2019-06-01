const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const router = require("./routes");
// connect mongoose
require("./model/connectMongoose")();

app.use(express.json({ limit: "2mb", extended: true }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

// ghi lai log
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  {
    flags: "a"
  }
);
app.use(morgan("combined", { stream: accessLogStream }));

// set public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// config route
app.use("/", router);

app.listen(process.env.PORT, () => console.log(`connected !`));
