const express = require("express");
const app = express();
const path = require("path");

const router = require("./routes");
// connect mongoose
require("./model/connectMongoose")();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set public folder
app.use("/public", express.static(path.join(__dirname, "public")));

// config route
app.use("/", router);

app.listen(process.env.PORT, () => console.log(`connected !`));
