const multer = require("multer");

const MAXSIZE = 4 * 1024 * 1024;

module.exports = multer({
  limits: {
    fileSize: MAXSIZE
  }
});
