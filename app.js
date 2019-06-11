const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const morgan = require("morgan");

const router = require("./routes");
// connect mongoose
require("./model/connect.model")();

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

// router err
app.use("*", function(req, res) {
  res.status(404).json({ error: "404 - not found !" });
});

// cau hinh moi truong product
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production") {
    return res.json({
      msg: "maintenance in process please try retry again later"
    });
  }

  return res.json(JSON.stringify(err, null, 2));
});

app.listen(process.env.PORT, () => console.log(`connected !`));
