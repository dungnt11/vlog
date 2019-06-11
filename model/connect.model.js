const mongoose = require("mongoose");

const mongoURL = require("../config/URL").mongoURL;

module.exports = () => {
  mongoose
    .connect(mongoURL, { useNewUrlParser: true })
    .then(() => console.log("connect thanh cong"))
    .catch(err => console.log("connect that bai"));
};
